import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { Brand } from '@/components/common/Brand';
import { Screen } from '@/components/common/Screen';
import { useMemo } from 'react';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { CategorySection } from '@/components/home/CategorySection';
import { BannerCarousel } from '@/components/home/BannerCarousel';
import { ProductSection } from '@/components/home/ProductSection';
import { banners } from '@/data/banners';
import { flashSaleProducts, popularProducts, recommendedProducts } from '@/data/homeCollections';
import { useShopStore } from '@/store/useShopStore';
import { getAddressCity } from '@/utils/address';
export default function HomeScreen() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const unreadNotifications = useShopStore(
    (state) => state.notifications.filter((item) => !item.read).length,
  );
  const deliveryAddress = useShopStore((state) =>
    state.addresses.find((item) => item.id === state.selectedAddressId),
  );
  return (
    <Screen>
      <View style={styles.header}>
        <Brand />
        <View style={styles.headerActions}>
          <Pressable
            style={styles.headerButton}
            onPress={() => router.push('/notifications')}
            accessibilityRole="button"
            accessibilityLabel={`Mở thông báo${unreadNotifications ? `, ${unreadNotifications} chưa đọc` : ''}`}
          >
            <Feather name="bell" size={21} color={theme.colors.text} />
            {unreadNotifications > 0 && <View style={styles.notificationDot} />}
          </Pressable>
          <Link href="/(tabs)/cart" accessibilityLabel="Mở giỏ hàng" style={styles.headerButton}>
            <Feather name="shopping-bag" size={22} color={theme.colors.text} />
          </Link>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Pressable
          style={styles.greeting}
          onPress={() => router.push('/addresses')}
          accessibilityRole="button"
        >
          <Feather name="map-pin" size={13} color={theme.colors.primary} />
          <Text style={styles.location}>
            Giao đến <Text style={styles.city}>{getAddressCity(deliveryAddress?.detail)}</Text>
          </Text>
          <Feather name="chevron-down" size={12} color={theme.colors.textSecondary} />
        </Pressable>
        <Pressable
          style={styles.search}
          onPress={() => router.push('/search')}
          accessibilityRole="button"
          accessibilityLabel="Tìm kiếm sản phẩm"
        >
          <Feather name="search" size={20} color={theme.colors.muted} />
          <Text style={styles.searchText}>Tìm kiếm sản phẩm...</Text>
        </Pressable>
        <BannerCarousel banners={banners} />
        <View style={styles.promise}>
          <Feather name="shield" size={14} color={theme.colors.success} />
          <Text style={styles.promiseText}>An tâm mua sắm</Text>
          <View style={styles.divider} />
          <Feather name="truck" size={14} color={theme.colors.success} />
          <Text style={styles.promiseText}>Giao hàng tận nơi</Text>
        </View>
        <CategorySection />

        <ProductSection
          title="Flash Sale"
          products={flashSaleProducts}
          horizontal
          flashSale
          collectionId="flashSale"
        />

        <ProductSection
          title="Được yêu thích"
          products={popularProducts}
          horizontal
          collectionId="popular"
        />

        <ProductSection
          title="Gợi ý hôm nay"
          products={recommendedProducts}
          collectionId="recommended"
        />
      </ScrollView>
    </Screen>
  );
}
const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    header: {
      paddingHorizontal: theme.layout.pageGutter,
      paddingVertical: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerActions: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
    headerButton: {
      padding: theme.spacing.md,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.background,
    },
    notificationDot: {
      position: 'absolute',
      right: 9,
      top: 8,
      width: 7,
      height: 7,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.primary,
    },
    content: {
      paddingHorizontal: theme.layout.pageGutter,
      paddingBottom: theme.spacing.xxl,
    },
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
