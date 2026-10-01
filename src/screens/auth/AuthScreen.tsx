import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Brand } from '@/components/common/Brand';
import { FormField } from '@/components/common/FormField';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { login, requestRegistrationCode, verifyRegistration } from '@/services/auth';
import { useShopStore } from '@/store/useShopStore';

interface Props {
  mode: 'login' | 'register';
}

export default function AuthScreen({ mode }: Props) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const signIn = useShopStore((state) => state.signIn);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState('');
  const [codeStep, setCodeStep] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const registering = mode === 'register';
  const nameError = registering && !name.trim() ? 'Vui lòng nhập họ tên.' : undefined;
  const emailError = !/^\S+@\S+\.\S+$/.test(email.trim())
    ? 'Email chưa đúng định dạng.'
    : undefined;
  const passwordError = !password
    ? 'Vui lòng nhập mật khẩu.'
    : registering && password.length < 8
      ? 'Mật khẩu cần ít nhất 8 ký tự.'
      : undefined;
  const confirmError =
    registering && confirmPassword !== password ? 'Mật khẩu nhập lại chưa khớp.' : undefined;
  const codeError = !/^\d{6}$/.test(code) ? 'Nhập mã gồm 6 chữ số.' : undefined;

  const submit = async () => {
    if (busy) return;
    setSubmitted(true);
    setError('');
    if (codeStep ? codeError : nameError || emailError || passwordError || confirmError) return;
    setBusy(true);
    try {
      if (registering && !codeStep) {
        await requestRegistrationCode(email.trim(), name.trim(), password);
        setCodeStep(true);
        setSubmitted(false);
      } else {
        const user = registering
          ? await verifyRegistration(email.trim(), code)
          : await login(email.trim(), password);
        signIn(user);
        router.replace('/(tabs)/profile');
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setBusy(false);
    }
  };

  const resendCode = async () => {
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      await requestRegistrationCode(email.trim(), name.trim(), password);
      setError('Yêu cầu đã được xử lý. Nếu vừa xin mã, hãy đợi 60 giây trước khi gửi lại.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Không gửi lại được mã.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen>
      <PageHeader title={registering ? 'Đăng ký' : 'Đăng nhập'} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Brand />
        <Text style={styles.title}>
          {codeStep ? 'Xác minh email' : registering ? 'Hãy tạo tài khoản' : 'Chào mừng trở lại 👋'}
        </Text>
        <Text style={styles.subtitle}>
          {codeStep
            ? `Nhập mã 6 số đã gửi tới ${email.trim()}. Mã có hiệu lực 10 phút; gửi lại sau 60 giây.`
            : registering
              ? 'Đăng ký bằng email và xác minh mã để tạo tài khoản.'
              : 'Đăng nhập bằng email và mật khẩu MiniShop.'}
        </Text>
        {codeStep ? (
          <FormField
            label="Mã xác minh"
            value={code}
            onChangeText={setCode}
            placeholder="000000"
            keyboardType="number-pad"
            maxLength={6}
            error={submitted ? codeError : undefined}
          />
        ) : (
          <>
            {registering && (
              <FormField
                label="Họ và tên"
                value={name}
                onChangeText={setName}
                placeholder="Nguyễn Văn A"
                autoCapitalize="words"
                error={submitted ? nameError : undefined}
              />
            )}
            <FormField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="ban@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              error={submitted ? emailError : undefined}
            />
            <FormField
              label="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              placeholder={registering ? 'Ít nhất 8 ký tự' : 'Nhập mật khẩu'}
              secureTextEntry={!showPassword}
              autoComplete={registering ? 'new-password' : 'current-password'}
              error={submitted ? passwordError : undefined}
            />
            <Pressable
              style={styles.showPassword}
              onPress={() => setShowPassword((value) => !value)}
            >
              <Feather
                name={showPassword ? 'eye-off' : 'eye'}
                size={16}
                color={theme.colors.textSecondary}
              />
              <Text style={styles.muted}>{showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}</Text>
            </Pressable>
            {registering && (
              <FormField
                label="Nhập lại mật khẩu"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Nhập lại mật khẩu"
                secureTextEntry={!showPassword}
                error={submitted ? confirmError : undefined}
              />
            )}
          </>
        )}
        {!registering && (
          <Pressable onPress={() => router.push('/forgot-password')}>
            <Text style={styles.forgot}>Quên mật khẩu?</Text>
          </Pressable>
        )}
        {!!error && <Text style={styles.notice}>{error}</Text>}
        <Pressable
          style={[styles.primaryButton, busy && styles.disabled]}
          onPress={() => void submit()}
          disabled={busy}
          accessibilityRole="button"
        >
          {busy ? (
            <ActivityIndicator color={theme.colors.onPrimary} />
          ) : (
            <Text style={styles.primaryText}>
              {codeStep
                ? 'Xác minh và tạo tài khoản'
                : registering
                  ? 'Gửi mã đăng ký'
                  : 'Đăng nhập'}
            </Text>
          )}
        </Pressable>
        {codeStep ? (
          <>
            <Pressable onPress={() => void resendCode()} disabled={busy}>
              <Text style={styles.switchText}>Gửi lại mã</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setCodeStep(false);
                setSubmitted(false);
                setCode('');
              }}
            >
              <Text style={styles.switchText}>Đổi thông tin đăng ký</Text>
            </Pressable>
          </>
        ) : (
          <Pressable onPress={() => router.replace(registering ? '/login' : '/register')}>
            <Text style={styles.switchText}>
              {registering ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký'}
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </Screen>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    content: {
      padding: theme.layout.pageGutter,
      paddingBottom: theme.spacing.huge,
      gap: theme.spacing.md,
      backgroundColor: theme.colors.surface,
    },
    title: { ...theme.typography.title, color: theme.colors.text, marginTop: theme.spacing.lg },
    subtitle: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.lg,
    },
    showPassword: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
      alignSelf: 'flex-end',
    },
    muted: { ...theme.typography.caption, color: theme.colors.textSecondary },
    forgot: { ...theme.typography.label, color: theme.colors.primary, textAlign: 'right' },
    primaryButton: {
      minHeight: theme.layout.touchTarget,
      borderRadius: theme.radius.md,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
      marginTop: theme.spacing.md,
    },
    primaryText: { ...theme.typography.label, color: theme.colors.onPrimary },
    notice: { ...theme.typography.body, color: theme.colors.error },
    disabled: { opacity: 0.6 },
    switchText: {
      ...theme.typography.label,
      color: theme.colors.primary,
      textAlign: 'center',
      paddingVertical: theme.spacing.sm,
    },
  });
