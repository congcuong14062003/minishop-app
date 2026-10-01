import { create, isAxiosError, type AxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

type ApiResponse<T> = { status: number; code: number; message: string; data: T };

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
  }
}

export function getApiBaseUrl() {
  const configured = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/+$/, '');
  if (configured) return configured;
  if (Platform.OS === 'web') return 'http://localhost:8080';
  const host = Constants.expoConfig?.hostUri?.replace(/^\w+:\/\//, '').split(':')[0];
  if (host && /^\d{1,3}(\.\d{1,3}){3}$/.test(host)) return `http://${host}:8080`;
  if (Platform.OS === 'android') return 'http://10.0.2.2:8080';
  return 'http://localhost:8080';
}

export const apiClient = create({
  baseURL: `${getApiBaseUrl()}/api/v1`,
  timeout: 12000,
  headers: { 'Content-Type': 'application/json' },
});

export async function apiRequest<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response = await apiClient.request<ApiResponse<T>>(config);
    return response.data.data;
  } catch (error) {
    if (isAxiosError<ApiResponse<unknown>>(error)) {
      if (error.response) {
        throw new ApiError(
          error.response.data?.message || 'Yêu cầu thất bại.',
          error.response.status,
        );
      }
      throw new ApiError(
        `Không kết nối được API (${getApiBaseUrl()}). Kiểm tra backend, Wi-Fi và địa chỉ API.`,
      );
    }
    throw error;
  }
}
