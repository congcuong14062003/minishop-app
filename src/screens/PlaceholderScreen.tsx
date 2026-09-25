import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import type { ComponentProps } from 'react';
import { Screen } from '@/components/common/Screen';
import { theme } from '@/theme';

interface Props {
  title: string;
  icon: ComponentProps<typeof Feather>['name'];
  headline: string;
  description: string;
}
export function PlaceholderScreen({ title, icon, headline, description }: Props) {
  return (
    <Screen>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.body}>
        <View style={styles.orbit}>
          <Feather name={icon} color={theme.colors.primary} size={42} />
        </View>
        <Text style={styles.headline}>{headline}</Text>
        <Text style={styles.description}>{description}</Text>
        <Link href="/(tabs)" style={styles.link}>
          Khám phá MiniShop <Feather name="arrow-right" size={16} />
        </Link>
      </View>
      <Text style={styles.footer}>NHỎ XINH MỖI NGÀY · MINISHOP</Text>
    </Screen>
  );
}
const styles = StyleSheet.create({
  title: {
    ...theme.typography.title,
    color: theme.colors.text,
    padding: theme.layout.pageGutter,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xxxl,
    gap: theme.spacing.lg,
  },
  orbit: {
    width: 104,
    height: 104,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  headline: { ...theme.typography.heading, textAlign: 'center', color: theme.colors.text },
  description: {
    ...theme.typography.body,
    textAlign: 'center',
    color: theme.colors.textSecondary,
    maxWidth: 300,
  },
  link: {
    ...theme.typography.label,
    color: theme.colors.primary,
    padding: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  footer: {
    ...theme.typography.eyebrow,
    color: theme.colors.muted,
    textAlign: 'center',
    padding: theme.spacing.xxl,
  },
});
