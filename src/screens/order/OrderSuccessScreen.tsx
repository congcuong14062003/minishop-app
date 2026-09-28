import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/common/Screen';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';

export default function OrderSuccessScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <Screen>
      <View style={styles.content}>
        <View style={styles.icon}>
          <Feather name="check" size={48} color={theme.colors.onPrimary} />
        </View>
        <Text style={styles.heading}>Đặt hàng thành công</Text>
        <Text style={styles.muted}>Cảm ơn bạn đã mua hàng.</Text>
        <Text style={styles.orderId}>Mã đơn hàng: #{id}</Text>
        <Pressable
          style={styles.primary}
          onPress={() => router.replace({ pathname: '/order/[id]', params: { id } })}
        >
          <Text style={styles.primaryText}>Xem đơn hàng</Text>
        </Pressable>
        <Pressable style={styles.secondary} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.secondaryText}>Tiếp tục mua sắm</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.xl,
      gap: theme.spacing.md,
    },
    icon: {
      width: 88,
      height: 88,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.success,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing.lg,
    },
    heading: { ...theme.typography.title, color: theme.colors.text, textAlign: 'center' },
    muted: { ...theme.typography.body, color: theme.colors.textSecondary, textAlign: 'center' },
    orderId: {
      ...theme.typography.label,
      color: theme.colors.text,
      marginVertical: theme.spacing.xl,
    },
    primary: {
      width: '100%',
      minHeight: theme.layout.touchTarget,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.primary,
    },
    primaryText: { ...theme.typography.label, color: theme.colors.onPrimary },
    secondary: {
      width: '100%',
      minHeight: theme.layout.touchTarget,
      alignItems: 'center',
      justifyContent: 'center',
    },
    secondaryText: { ...theme.typography.label, color: theme.colors.primary },
  });
