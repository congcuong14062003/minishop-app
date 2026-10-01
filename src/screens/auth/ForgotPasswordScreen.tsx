import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FormField } from '@/components/common/FormField';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { requestPasswordReset, resetPassword } from '@/services/auth';

export default function ForgotPasswordScreen() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [codeStep, setCodeStep] = useState(false);
  const [done, setDone] = useState(false);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const emailError = !/^\S+@\S+\.\S+$/.test(email.trim())
    ? 'Email chưa đúng định dạng.'
    : undefined;
  const codeError = !/^\d{6}$/.test(code) ? 'Nhập mã gồm 6 chữ số.' : undefined;
  const passwordError = password.length < 8 ? 'Mật khẩu cần ít nhất 8 ký tự.' : undefined;
  const confirmError = confirmPassword !== password ? 'Mật khẩu nhập lại chưa khớp.' : undefined;

  async function submit() {
    if (busy) return;
    setSubmitted(true);
    setNotice('');
    if (codeStep ? codeError || passwordError || confirmError : emailError) return;
    setBusy(true);
    try {
      if (codeStep) {
        await resetPassword(email.trim(), code, password);
        setDone(true);
        setNotice('Mật khẩu đã được đặt lại. Bạn có thể đăng nhập bằng mật khẩu mới.');
      } else {
        await requestPasswordReset(email.trim());
        setCodeStep(true);
        setSubmitted(false);
        setNotice('Nếu email đã có tài khoản, mã khôi phục đã được gửi. Hãy kiểm tra hộp thư.');
      }
    } catch (cause) {
      setNotice(cause instanceof Error ? cause.message : 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <Screen>
      <PageHeader title="Quên mật khẩu" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.iconBox}>
          <Feather name="lock" size={32} color={theme.colors.primary} />
        </View>
        <Text style={styles.heading}>Khôi phục tài khoản</Text>
        <Text style={styles.muted}>
          {done
            ? 'Tài khoản đã sẵn sàng để đăng nhập lại.'
            : codeStep
              ? `Nhập mã gửi tới ${email.trim()} và đặt mật khẩu mới.`
              : 'Nhập email tài khoản để nhận mã khôi phục mật khẩu.'}
        </Text>
        {!codeStep && !done && (
          <FormField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="ban@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={submitted ? emailError : undefined}
          />
        )}
        {codeStep && !done && (
          <>
            <FormField
              label="Mã khôi phục"
              value={code}
              onChangeText={setCode}
              placeholder="000000"
              keyboardType="number-pad"
              maxLength={6}
              error={submitted ? codeError : undefined}
            />
            <FormField
              label="Mật khẩu mới"
              value={password}
              onChangeText={setPassword}
              placeholder="Ít nhất 8 ký tự"
              secureTextEntry
              autoComplete="new-password"
              error={submitted ? passwordError : undefined}
            />
            <FormField
              label="Nhập lại mật khẩu"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              error={submitted ? confirmError : undefined}
            />
          </>
        )}
        {!!notice && <Text style={styles.notice}>{notice}</Text>}
        <Pressable
          style={[styles.button, busy && styles.disabled]}
          onPress={() => {
            if (done) router.replace('/login');
            else void submit();
          }}
          disabled={busy}
        >
          {busy ? (
            <ActivityIndicator color={theme.colors.onPrimary} />
          ) : (
            <Text style={styles.buttonText}>
              {done ? 'Đăng nhập' : codeStep ? 'Đặt lại mật khẩu' : 'Gửi mã khôi phục'}
            </Text>
          )}
        </Pressable>
        {codeStep && !done && (
          <Pressable
            disabled={busy}
            onPress={() => {
              setCodeStep(false);
              setSubmitted(false);
              setCode('');
              setNotice('');
            }}
          >
            <Text style={styles.link}>Gửi lại mã hoặc đổi email</Text>
          </Pressable>
        )}
        <Pressable onPress={() => router.replace('/login')}>
          <Text style={styles.link}>Quay lại đăng nhập</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    content: { padding: theme.layout.pageGutter, gap: theme.spacing.lg },
    iconBox: {
      width: 72,
      height: 72,
      borderRadius: theme.radius.pill,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primarySoft,
    },
    heading: { ...theme.typography.heading, color: theme.colors.text },
    muted: { ...theme.typography.body, color: theme.colors.textSecondary },
    notice: { ...theme.typography.body, color: theme.colors.success },
    button: {
      minHeight: theme.layout.touchTarget,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: { ...theme.typography.label, color: theme.colors.onPrimary },
    disabled: { opacity: 0.6 },
    link: { ...theme.typography.label, color: theme.colors.primary, textAlign: 'center' },
  });
