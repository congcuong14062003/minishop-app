import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';
import { ReviewCard } from '@/components/product/ReviewCard';
import { products } from '@/data/products';
import { getProductReviews } from '@/data/reviews';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';

export default function ProductReviewsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const product = products.find((item) => item.id === id);
  const reviews = useMemo(() => getProductReviews(id, product?.images), [id, product]);
  const visibleReviews = reviews.filter(
    (review) => ratingFilter === 0 || review.rating === ratingFilter,
  );

  return (
    <Screen>
      <PageHeader title="Đánh giá sản phẩm" />
      {product ? (
        <FlatList
          data={visibleReviews}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            <View>
              <Text style={styles.productName} numberOfLines={2}>
                {product.name}
              </Text>
              <View style={styles.summary}>
                <Feather name="star" size={22} color={theme.colors.warning} />
                <Text style={styles.score}>{product.rating} / 5</Text>
                <Text style={styles.count}>· {reviews.length} đánh giá</Text>
              </View>
              <View style={styles.filters}>
                {[0, 5, 4].map((rating) => (
                  <Pressable
                    key={rating}
                    style={[styles.chip, ratingFilter === rating && styles.activeChip]}
                    onPress={() => setRatingFilter(rating)}
                  >
                    <Text style={[styles.chipText, ratingFilter === rating && styles.activeText]}>
                      {rating === 0 ? 'Tất cả' : `${rating} sao`}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          }
          renderItem={({ item }) => <ReviewCard review={item} />}
          ListEmptyComponent={<Text style={styles.empty}>Chưa có đánh giá ở mức sao này.</Text>}
        />
      ) : (
        <Text style={styles.empty}>Không tìm thấy sản phẩm.</Text>
      )}
    </Screen>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    content: { padding: theme.layout.pageGutter, paddingBottom: theme.spacing.huge },
    productName: { ...theme.typography.label, color: theme.colors.text },
    summary: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
      marginTop: theme.spacing.md,
    },
    score: { ...theme.typography.title, color: theme.colors.text },
    count: { ...theme.typography.caption, color: theme.colors.textSecondary },
    filters: { flexDirection: 'row', gap: theme.spacing.sm, marginTop: theme.spacing.xl },
    chip: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.background,
    },
    activeChip: { backgroundColor: theme.colors.primarySoft },
    chipText: { ...theme.typography.caption, color: theme.colors.textSecondary },
    activeText: { color: theme.colors.primary, fontFamily: theme.fonts.semibold },
    empty: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      padding: theme.spacing.xl,
    },
  });
