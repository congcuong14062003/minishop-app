import { useMemo } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export function FormField({ label, error, ...inputProps }: Props) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...inputProps}
        style={[styles.input, error && styles.inputError, inputProps.style]}
        placeholderTextColor={theme.colors.muted}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    group: { gap: theme.spacing.xs },
    label: { ...theme.typography.label, color: theme.colors.text },
    input: {
      ...theme.typography.body,
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: theme.radius.md,
      minHeight: theme.layout.touchTarget,
      paddingHorizontal: theme.spacing.md,
    },
    inputError: { borderColor: theme.colors.error },
    error: { ...theme.typography.caption, color: theme.colors.error },
  });
