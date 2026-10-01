import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { apiRequest, ApiError as AuthError } from '@/services/apiClient';
import type { User } from '@/types';

export { ApiError as AuthError } from '@/services/apiClient';

type Tokens = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresInSeconds: number;
};
type RemoteUser = { id: string; email: string; fullName: string };

const REFRESH_KEY = 'minishop.refreshToken';
let accessToken: string | null = null;
let accessExpiresAt = 0;
let webRefreshToken: string | null = null;
let refreshInFlight: Promise<string> | null = null;

async function request<T>(path: string, body?: object, bearer?: string): Promise<T> {
  return apiRequest<T>({
    url: `/auth${path}`,
    method: body ? 'POST' : 'GET',
    data: body,
    headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
  });
}

async function readRefreshToken() {
  return Platform.OS === 'web' ? webRefreshToken : SecureStore.getItemAsync(REFRESH_KEY);
}

async function saveTokens(tokens: Tokens) {
  if (Platform.OS === 'web') webRefreshToken = tokens.refreshToken;
  else await SecureStore.setItemAsync(REFRESH_KEY, tokens.refreshToken);
  accessToken = tokens.accessToken;
  accessExpiresAt = Date.now() + Math.max(0, tokens.expiresInSeconds - 30) * 1000;
}

async function clearTokens() {
  accessToken = null;
  accessExpiresAt = 0;
  webRefreshToken = null;
  if (Platform.OS !== 'web') await SecureStore.deleteItemAsync(REFRESH_KEY);
}

function toUser(remote: RemoteUser): User {
  return { id: remote.id, email: remote.email, name: remote.fullName };
}

async function finishLogin(tokens: Tokens): Promise<User> {
  await saveTokens(tokens);
  try {
    return toUser(await request<RemoteUser>('/me', undefined, tokens.accessToken));
  } catch (error) {
    await clearTokens();
    throw error;
  }
}

export async function login(email: string, password: string) {
  return finishLogin(await request<Tokens>('/login', { email, password }));
}

export async function requestRegistrationCode(email: string, fullName: string, password: string) {
  await request<null>('/register/request-code', { email, fullName, password });
}

export async function verifyRegistration(email: string, code: string) {
  return finishLogin(await request<Tokens>('/register/verify', { email, code }));
}

export async function requestPasswordReset(email: string) {
  await request<null>('/password/forgot', { email });
}

export async function resetPassword(email: string, code: string, newPassword: string) {
  await request<null>('/password/reset', { email, code, newPassword });
}

async function refreshAccessToken() {
  if (refreshInFlight) return refreshInFlight;
  refreshInFlight = (async () => {
    const token = await readRefreshToken();
    if (!token) throw new AuthError('Phiên đăng nhập đã hết hạn.', 401);
    try {
      const tokens = await request<Tokens>('/refresh', { refreshToken: token });
      await saveTokens(tokens);
      return tokens.accessToken;
    } catch (error) {
      if (error instanceof AuthError && error.status === 401) await clearTokens();
      throw error;
    }
  })();
  try {
    return await refreshInFlight;
  } finally {
    refreshInFlight = null;
  }
}

export async function restoreSession(): Promise<User | null> {
  if (!(await readRefreshToken())) return null;
  try {
    const token = await refreshAccessToken();
    return toUser(await request<RemoteUser>('/me', undefined, token));
  } catch (error) {
    if (error instanceof AuthError && (error.status === 401 || error.status === 403)) {
      await clearTokens();
    }
    return null;
  }
}

export async function logout() {
  const token = await readRefreshToken();
  await clearTokens();
  if (token) {
    try {
      await request<null>('/logout', { refreshToken: token });
    } catch {
      /* Local session has already been cleared. */
    }
  }
}

export async function getAccessToken() {
  return accessToken && Date.now() < accessExpiresAt ? accessToken : refreshAccessToken();
}
