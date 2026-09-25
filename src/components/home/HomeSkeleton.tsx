import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Skeleton } from '@/components/common/Skeleton';
import { theme } from '@/theme';

function ProductPlaceholder() {
  return (
    <View style={styles.product}>
      <Skeleton style={styles.image} />
      <View style={styles.info}>
        <Skeleton />
        <Skeleton style={styles.shortLine} />
        <Skeleton style={styles.price} />
      </View>
    </View>
  );
}
export function HomeSkeleton() {
  return (
    <View
      style={styles.container}
      accessibilityLabel="Đang tải sản phẩm"
      accessibilityState={{ busy: true }}
    >
      <View style={styles.sectionTitle}>
        <Text style={styles.heading}>Danh mục</Text>
        <Skeleton style={styles.link} />
      </View>
      <View style={styles.categories}>
        {Array.from({ length: 4 }, (_, index) => (
          <View key={index} style={styles.category}>
            <Skeleton style={styles.categoryIcon} />
            <Skeleton style={styles.categoryText} />
          </View>
        ))}
      </View>
      <View style={styles.sectionTitle}>
        <View style={styles.titleRow}>
          <Feather name="zap" color={theme.colors.primary} size={20} />
          <Text style={styles.heading}>Flash Sale</Text>
        </View>
        <View style={styles.timer}>
          {[0, 1, 2].map((key) => (
            <Skeleton key={key} style={styles.timerBlock} />
          ))}
        </View>
      </View>
      <View style={styles.grid}>
        <ProductPlaceholder />
        <ProductPlaceholder />
      </View>
      <View style={styles.sectionTitle}>
        <Text style={styles.heading}>Được yêu thích</Text>
        <Skeleton style={styles.link} />
      </View>
      <View style={styles.grid}>
        <ProductPlaceholder />
        <ProductPlaceholder />
      </View>
      <View style={styles.sectionTitle}>
        <Text style={styles.heading}>Gợi ý hôm nay</Text>
        <Feather name="sliders" size={18} color={theme.colors.muted} />
      </View>
      <View style={styles.grid}>
        <ProductPlaceholder />
        <ProductPlaceholder />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xxxl,
  },
  sectionTitle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heading: { ...theme.typography.heading, color: theme.colors.text },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs },
  link: { width: 60, height: 10 },
  categories: { flexDirection: 'row', justifyContent: 'space-between', gap: theme.spacing.md },
  category: { flex: 1, alignItems: 'center', gap: theme.spacing.md },
  categoryIcon: { width: '80%', aspectRatio: 1, height: undefined, borderRadius: theme.radius.lg },
  categoryText: { width: '85%', height: 10 },
  grid: { flexDirection: 'row', gap: theme.spacing.md },
  product: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    overflow: 'hidden',
  },
  image: { width: '100%', aspectRatio: 1.1, height: undefined, borderRadius: 0 },
  info: { padding: theme.spacing.md, gap: theme.spacing.sm },
  shortLine: { width: '64%', height: 10 },
  price: { width: '48%', marginTop: theme.spacing.sm, height: 18 },
  timer: { flexDirection: 'row', gap: theme.spacing.xs },
  timerBlock: { height: 24, width: 24, borderRadius: theme.radius.sm },
});
