import { useMemo, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';

interface Props {
  title: string;
  right?: ReactNode;
  back?: boolean;
}

export function PageHeader({ title, right, back = true }: Props) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.header}>
      {back && (
        <Pressable
          onPress={() => router.back()}
          style={styles.back}
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
        >
          <Feather name="arrow-left" size={22} color={theme.colors.text} />
        </Pressable>
      )}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      {right}
    </View>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    header: {
      minHeight: 56,
      paddingHorizontal: theme.layout.pageGutter,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    back: {
      width: 36,
      height: 44,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    title: { ...theme.typography.heading, color: theme.colors.text, flex: 1 },
  });
