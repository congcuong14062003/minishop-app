import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { useThemeStore, type ThemeMode } from '@/store/useThemeStore';

const modes: {
  value: ThemeMode;
  label: string;
  icon: React.ComponentProps<typeof Feather>['name'];
}[] = [
  { value: 'light', label: 'Sáng', icon: 'sun' },
  { value: 'dark', label: 'Tối', icon: 'moon' },
  { value: 'system', label: 'Theo hệ thống', icon: 'smartphone' },
];

export default function SettingsScreen() {
  const { theme, mode } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const setMode = useThemeStore((state) => state.setMode);

  return (
    <Screen>
      <PageHeader title="Cài đặt" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionLabel}>GIAO DIỆN</Text>
        <View style={styles.card}>
          {modes.map((item) => (
            <Pressable
              key={item.value}
              style={styles.row}
              onPress={() => setMode(item.value)}
              accessibilityRole="radio"
              accessibilityState={{ checked: mode === item.value }}
            >
              <Feather name={item.icon} size={20} color={theme.colors.primary} />
              <Text style={styles.label}>{item.label}</Text>
              <Feather
                name={mode === item.value ? 'check-circle' : 'circle'}
                size={19}
                color={mode === item.value ? theme.colors.primary : theme.colors.muted}
              />
            </Pressable>
          ))}
        </View>
        <Text style={styles.sectionLabel}>THÔNG TIN</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Feather name="info" size={20} color={theme.colors.primary} />
            <Text style={styles.label}>Phiên bản giao diện</Text>
            <Text style={styles.muted}>1.0.0</Text>
          </View>
        </View>
        <Text style={styles.note}>
          Đây là bản UI dùng dữ liệu mô phỏng. Tài khoản, đơn hàng và phương thức thanh toán chưa
          kết nối dịch vụ thật.
        </Text>
      </ScrollView>
    </Screen>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    content: {
      padding: theme.layout.pageGutter,
      gap: theme.spacing.sm,
      backgroundColor: theme.colors.background,
    },
    sectionLabel: {
      ...theme.typography.eyebrow,
      color: theme.colors.muted,
      marginTop: theme.spacing.lg,
    },
    card: {
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.surface,
      overflow: 'hidden',
    },
    row: {
      minHeight: 58,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    label: { ...theme.typography.body, color: theme.colors.text, flex: 1 },
    muted: { ...theme.typography.caption, color: theme.colors.textSecondary },
    note: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xl,
    },
  });
