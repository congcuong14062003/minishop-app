import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';

type IconName = React.ComponentProps<typeof Feather>['name'];

interface Props {
  icon: IconName;
  label: string;
  onPress: () => void;
  value?: string;
  danger?: boolean;
}

export function MenuRow({ icon, label, onPress, value, danger = false }: Props) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable style={styles.row} onPress={onPress} accessibilityRole="button">
      <View style={[styles.iconBox, danger && styles.dangerBox]}>
        <Feather name={icon} size={19} color={danger ? theme.colors.error : theme.colors.primary} />
      </View>
      <Text style={[styles.label, danger && styles.dangerText]}>{label}</Text>
      {value && <Text style={styles.value}>{value}</Text>}
      <Feather name="chevron-right" size={18} color={theme.colors.muted} />
    </Pressable>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    row: {
      minHeight: 60,
      paddingHorizontal: theme.spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    iconBox: {
      width: 36,
      height: 36,
      borderRadius: theme.radius.md,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primarySoft,
    },
    dangerBox: { backgroundColor: theme.colors.background },
    label: { ...theme.typography.body, color: theme.colors.text, flex: 1 },
    dangerText: { color: theme.colors.error },
    value: { ...theme.typography.caption, color: theme.colors.textSecondary },
  });
