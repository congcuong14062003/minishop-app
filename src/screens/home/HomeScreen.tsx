import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Brand } from '@/components/common/Brand';
import { Screen } from '@/components/common/Screen';
import { HomeSkeleton } from '@/components/home/HomeSkeleton';
import { theme } from '@/theme';

export default function HomeScreen() {
  return (
    <Screen>
      <View style={styles.header}>
        <Brand />
        <Link href="/(tabs)/cart" accessibilityLabel="Mở giỏ hàng" style={styles.cart}>
          <Feather name="shopping-bag" size={22} color={theme.colors.text} />
        </Link>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.greeting}>
          <Feather name="map-pin" size={13} color={theme.colors.primary} />
          <Text style={styles.location}>
            Giao đến <Text style={styles.city}>Hà Nội</Text>
          </Text>
          <Feather name="chevron-down" size={12} color={theme.colors.textSecondary} />
        </View>
        <View
          style={styles.search}
          accessibilityLabel="Tìm kiếm sản phẩm"
          accessibilityState={{ disabled: true }}
        >
          <Feather name="search" size={20} color={theme.colors.muted} />
          <Text style={styles.searchText}>Tìm kiếm sản phẩm...</Text>
        </View>
        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text style={styles.eyebrow}>LỰA CHỌN MỖI NGÀY</Text>
            <Text style={styles.heroTitle}>Điều nhỏ xinh.{'\n'}Niềm vui thật lớn.</Text>
            <Text style={styles.heroSubtitle}>Một chút mới mẻ cho ngày của bạn.</Text>
            <View style={styles.heroPill}>
              <Text style={styles.pillText}>Khám phá cùng MiniShop</Text>
              <Feather name="arrow-up-right" size={14} color={theme.colors.primary} />
            </View>
          </View>
          <View style={styles.decor} pointerEvents="none">
            <View style={styles.bag}>
              <Feather name="shopping-bag" size={60} color={theme.colors.onPrimary} />
            </View>
            <View style={styles.spark}>
              <Feather name="sun" size={24} color={theme.colors.primary} />
            </View>
          </View>
        </View>
        <View style={styles.promise}>
          <Feather name="shield" size={14} color={theme.colors.success} />
          <Text style={styles.promiseText}>An tâm mua sắm</Text>
          <View style={styles.divider} />
          <Feather name="truck" size={14} color={theme.colors.success} />
          <Text style={styles.promiseText}>Giao hàng tận nơi</Text>
        </View>
        <HomeSkeleton />
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.layout.pageGutter,
    paddingVertical: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  cart: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.background,
  },
  content: { paddingHorizontal: theme.layout.pageGutter },
  greeting: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  location: { ...theme.typography.caption, color: theme.colors.textSecondary },
  city: { fontFamily: theme.fonts.semibold, color: theme.colors.text },
  search: {
    minHeight: theme.layout.touchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.xl,
  },
  searchText: { ...theme.typography.body, color: theme.colors.muted },
  hero: {
    backgroundColor: theme.colors.cream,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    overflow: 'hidden',
    minHeight: 192,
  },
  heroCopy: { zIndex: 1, width: '80%' },
  eyebrow: {
    ...theme.typography.eyebrow,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  heroTitle: { ...theme.typography.title, fontSize: 22, lineHeight: 31, color: theme.colors.text },
  heroSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
    maxWidth: '80%',
  },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.lg,
  },
  pillText: {
    ...theme.typography.caption,
    fontFamily: theme.fonts.semibold,
    color: theme.colors.primary,
  },
  decor: {
    position: 'absolute',
    right: -20,
    bottom: -24,
    width: 126,
    height: 158,
    transform: [{ rotate: '-14deg' }],
  },
  bag: {
    width: 118,
    height: 140,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spark: { position: 'absolute', top: -32, right: 28 },
  promise: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  promiseText: { ...theme.typography.caption, fontSize: 10, color: theme.colors.textSecondary },
  divider: {
    width: 1,
    height: 12,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.sm,
  },
});
