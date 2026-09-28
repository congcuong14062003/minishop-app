import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FormField } from '@/components/common/FormField';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';

export default function ForgotPasswordScreen() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);
  const error = !/^\S+@\S+\.\S+$/.test(email.trim()) ? 'Email chưa đúng định dạng.' : undefined;

  return (
    <Screen>
      <PageHeader title="Quên mật khẩu" />
      <View style={styles.content}>
        <View style={styles.iconBox}>
          <Feather name="lock" size={32} color={theme.colors.primary} />
        </View>
        <Text style={styles.heading}>Khôi phục tài khoản</Text>
        <Text style={styles.muted}>
          Nhập email của bạn để xem luồng khôi phục mật khẩu trong bản giao diện.
        </Text>
        <FormField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="ban@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          error={submitted ? error : undefined}
        />
        {done && (
          <Text style={styles.notice}>Đây là bản UI mô phỏng, chưa gửi email khôi phục thật.</Text>
        )}
        <Pressable
          style={styles.button}
          onPress={() => {
            setSubmitted(true);
            if (!error) setDone(true);
          }}
        >
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </Pressable>
        <Pressable onPress={() => router.replace('/login')}>
          <Text style={styles.link}>Quay lại đăng nhập</Text>
        </Pressable>
      </View>
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
    link: { ...theme.typography.label, color: theme.colors.primary, textAlign: 'center' },
  });
