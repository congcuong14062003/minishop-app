import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';

interface Props {
  icon: React.ComponentProps<typeof Feather>['name'];
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: Props) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Feather name={icon} size={36} color={theme.colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {actionLabel && onAction && (
        <Pressable onPress={onAction} style={styles.button} accessibilityRole="button">
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.md,
      padding: theme.spacing.xxl,
    },
    iconBox: {
      width: 80,
      height: 80,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing.sm,
    },
    title: { ...theme.typography.heading, color: theme.colors.text, textAlign: 'center' },
    description: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    button: {
      minHeight: theme.layout.touchTarget,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.primary,
      paddingHorizontal: theme.spacing.xl,
      justifyContent: 'center',
      marginTop: theme.spacing.sm,
    },
    buttonText: { ...theme.typography.label, color: theme.colors.onPrimary },
  });
