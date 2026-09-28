import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import type { Review } from '@/data/reviews';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';

export function ReviewCard({ review }: { review: Review }) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{review.name.charAt(0)}</Text>
        </View>
        <View style={styles.identity}>
          <Text style={styles.name}>{review.name}</Text>
          <Text style={styles.date}>{review.date}</Text>
        </View>
        <View style={styles.stars}>
          {Array.from({ length: 5 }, (_, index) => (
            <Feather
              key={index}
              name="star"
              size={12}
              color={index < review.rating ? theme.colors.warning : theme.colors.border}
            />
          ))}
        </View>
      </View>
      <Text style={styles.comment}>{review.comment}</Text>
      {review.images.length > 0 && (
        <View style={styles.images}>
          {review.images.map((uri) => (
            <Image key={uri} source={{ uri }} style={styles.image} contentFit="cover" />
          ))}
        </View>
      )}
    </View>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      paddingVertical: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      gap: theme.spacing.md,
    },
    top: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: { ...theme.typography.label, color: theme.colors.primary },
    identity: { flex: 1 },
    name: { ...theme.typography.label, color: theme.colors.text },
    date: { ...theme.typography.caption, color: theme.colors.textSecondary },
    stars: { flexDirection: 'row', gap: theme.spacing.xxs },
    comment: { ...theme.typography.body, color: theme.colors.text },
    images: { flexDirection: 'row', gap: theme.spacing.sm },
    image: { width: 70, height: 70, borderRadius: theme.radius.sm },
  });
