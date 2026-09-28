import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Brand } from '@/components/common/Brand';
import { FormField } from '@/components/common/FormField';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
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
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const registering = mode === 'register';
  const nameError = registering && !name.trim() ? 'Vui lòng nhập họ tên.' : undefined;
  const loginByPhone = !registering && /^\d{10,11}$/.test(email.trim());
  const emailError =
    !loginByPhone && !/^\S+@\S+\.\S+$/.test(email.trim())
      ? registering
        ? 'Email chưa đúng định dạng.'
        : 'Nhập email hoặc số điện thoại 10–11 chữ số.'
      : undefined;
  const phoneError =
    registering && !/^\d{10,11}$/.test(phone.trim())
      ? 'Số điện thoại cần có 10–11 chữ số.'
      : undefined;
  const passwordError = password.length < 6 ? 'Mật khẩu cần ít nhất 6 ký tự.' : undefined;
  const confirmError =
    registering && confirmPassword !== password ? 'Mật khẩu nhập lại chưa khớp.' : undefined;

  const submit = () => {
    setSubmitted(true);
    if (nameError || emailError || phoneError || passwordError || confirmError) return;
    signIn({
      id: `demo-${Date.now()}`,
      name: registering
        ? name.trim()
        : loginByPhone
          ? 'Khách hàng MiniShop'
          : (email.trim().split('@')[0] ?? email.trim()),
      email: loginByPhone ? '' : email.trim(),
      phone: registering ? phone.trim() : loginByPhone ? email.trim() : undefined,
    });
    router.replace('/(tabs)/profile');
  };

  return (
    <Screen>
      <PageHeader title={registering ? 'Đăng ký' : 'Đăng nhập'} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Brand />
        <Text style={styles.title}>
          {registering ? 'Hãy tạo tài khoản' : 'Chào mừng trở lại 👋'}
        </Text>
        <Text style={styles.subtitle}>
          {registering
            ? 'Bắt đầu hành trình mua sắm cùng MiniShop.'
            : 'Rất vui được gặp lại bạn tại MiniShop.'}
        </Text>
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
          label={registering ? 'Email' : 'Email / Số điện thoại'}
          value={email}
          onChangeText={setEmail}
          placeholder={registering ? 'ban@example.com' : 'Email hoặc số điện thoại'}
          keyboardType={registering ? 'email-address' : 'default'}
          autoCapitalize="none"
          autoComplete="email"
          error={submitted ? emailError : undefined}
        />
        {registering && (
          <FormField
            label="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
            placeholder="0123456789"
            keyboardType="phone-pad"
            error={submitted ? phoneError : undefined}
          />
        )}
        <FormField
          label="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          placeholder="Ít nhất 6 ký tự"
          secureTextEntry={!showPassword}
          autoComplete={registering ? 'new-password' : 'current-password'}
          error={submitted ? passwordError : undefined}
        />
        <Pressable style={styles.showPassword} onPress={() => setShowPassword((value) => !value)}>
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
        {!registering && (
          <Pressable onPress={() => router.push('/forgot-password')}>
            <Text style={styles.forgot}>Quên mật khẩu?</Text>
          </Pressable>
        )}
        <Pressable style={styles.primaryButton} onPress={submit} accessibilityRole="button">
          <Text style={styles.primaryText}>{registering ? 'Đăng ký' : 'Đăng nhập'}</Text>
        </Pressable>
        {!registering && (
          <>
            <Text style={styles.or}>hoặc</Text>
            <Pressable
              style={styles.googleButton}
              onPress={() => {
                signIn({ id: 'demo-google', name: 'Nguyễn Văn A', email: 'user@example.com' });
                router.replace('/(tabs)/profile');
              }}
            >
              <Text style={styles.googleText}>Tiếp tục với Google (demo)</Text>
            </Pressable>
          </>
        )}
        <Pressable onPress={() => router.replace(registering ? '/login' : '/register')}>
          <Text style={styles.switchText}>
            {registering ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký'}
          </Text>
        </Pressable>
        <Text style={styles.demoNote}>
          Bản UI mô phỏng: thông tin nhập chỉ dùng để trải nghiệm màn hình, không xác thực qua máy
          chủ.
        </Text>
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
    or: { ...theme.typography.caption, color: theme.colors.muted, textAlign: 'center' },
    googleButton: {
      minHeight: theme.layout.touchTarget,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    googleText: { ...theme.typography.label, color: theme.colors.text },
    switchText: {
      ...theme.typography.label,
      color: theme.colors.primary,
      textAlign: 'center',
      paddingVertical: theme.spacing.sm,
    },
    demoNote: {
      ...theme.typography.caption,
      color: theme.colors.muted,
      textAlign: 'center',
      marginTop: theme.spacing.lg,
    },
  });
