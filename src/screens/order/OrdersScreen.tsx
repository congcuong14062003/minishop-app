import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';
import { ProductImage } from '@/components/product/ProductImage';
import { products } from '@/data/products';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { useShopStore } from '@/store/useShopStore';
import { formatPrice } from '@/utils/format';
import type { OrderStatus } from '@/types';

const tabs: { id: OrderStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'pending', label: 'Chờ thanh toán' },
  { id: 'processing', label: 'Đang xử lý' },
  { id: 'shipping', label: 'Đang giao' },
  { id: 'delivered', label: 'Đã giao' },
  { id: 'cancelled', label: 'Đã hủy' },
];

const statusDescriptions: Record<OrderStatus, string> = {
  pending: 'Chờ bạn hoàn tất thanh toán',
  processing: 'MiniShop đang chuẩn bị sản phẩm',
  shipping: 'Đang trên đường giao đến bạn',
  delivered: 'Đã giao thành công',
  cancelled: 'Đơn hàng đã hủy',
};

export default function OrdersScreen() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const orders = useShopStore((state) => state.orders);
  const [status, setStatus] = useState<OrderStatus | 'all'>('all');
  const visible = orders.filter((order) => status === 'all' || order.status === status);

  return (
    <Screen>
      <PageHeader title="Đơn hàng của tôi" />
      <View style={styles.tabViewport}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
        >
          {tabs.map((tab) => (
            <Pressable
              key={tab.id}
              style={[styles.tab, status === tab.id && styles.activeTab]}
              onPress={() => setStatus(tab.id)}
            >
              <Text style={[styles.tabText, status === tab.id && styles.activeText]}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {visible.length === 0 ? (
          <View style={styles.empty}>
            <Feather name="package" size={56} color={theme.colors.muted} />
            <Text style={styles.heading}>Chưa có đơn hàng</Text>
            <Text style={styles.muted}>Đơn hàng của bạn sẽ xuất hiện tại đây.</Text>
          </View>
        ) : (
          visible.map((order) => {
            const firstProduct = products.find((item) => item.id === order.items[0]?.productId);
            return (
              <Pressable
                key={order.id}
                style={styles.card}
                onPress={() => router.push({ pathname: '/order/[id]', params: { id: order.id } })}
              >
                <View style={styles.cardTop}>
                  <Text style={styles.heading}>MiniShop Official</Text>
                  <Text style={styles.status}>
                    {tabs.find((tab) => tab.id === order.status)?.label}
                  </Text>
                </View>
                <Text style={styles.muted}>#{order.id}</Text>
                <View style={styles.productRow}>
                  <View style={styles.productImage}>
                    <ProductImage
                      uri={firstProduct?.images[0]}
                      label={firstProduct?.name ?? 'Sản phẩm'}
                    />
                  </View>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={2}>
                      {firstProduct?.name ?? 'Sản phẩm'}
                    </Text>
                    <Text style={styles.muted}>{order.items.length} mặt hàng</Text>
                    <Text style={styles.statusDescription}>{statusDescriptions[order.status]}</Text>
                  </View>
                </View>
                <View style={styles.cardBottom}>
                  <Text style={styles.muted}>Tổng thanh toán</Text>
                  <Text style={styles.total}>{formatPrice(order.total)}</Text>
                </View>
                <Text style={styles.link}>Xem chi tiết →</Text>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </Screen>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    tabViewport: { borderBottomWidth: 1, borderBottomColor: theme.colors.border },
    tabs: { gap: theme.spacing.sm, paddingHorizontal: theme.layout.pageGutter },
    tab: {
      minHeight: theme.layout.touchTarget,
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.sm,
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    activeTab: { borderBottomColor: theme.colors.primary },
    tabText: { ...theme.typography.caption, color: theme.colors.textSecondary },
    activeText: { color: theme.colors.primary, fontFamily: theme.fonts.semibold },
    content: {
      padding: theme.layout.pageGutter,
      paddingBottom: theme.spacing.huge,
      gap: theme.spacing.md,
    },
    empty: { alignItems: 'center', paddingVertical: theme.spacing.huge, gap: theme.spacing.md },
    heading: { ...theme.typography.heading, color: theme.colors.text },
    muted: { ...theme.typography.caption, color: theme.colors.textSecondary },
    card: {
      padding: theme.spacing.lg,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      gap: theme.spacing.sm,
    },
    cardTop: { flexDirection: 'row', justifyContent: 'space-between', gap: theme.spacing.sm },
    status: { ...theme.typography.caption, color: theme.colors.primary },
    productName: { ...theme.typography.body, color: theme.colors.text },
    productRow: { flexDirection: 'row', gap: theme.spacing.md, alignItems: 'center' },
    productImage: { width: 64, height: 64, borderRadius: theme.radius.sm, overflow: 'hidden' },
    productInfo: { flex: 1, gap: theme.spacing.xs },
    statusDescription: { ...theme.typography.caption, color: theme.colors.textSecondary },
    cardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    total: { ...theme.typography.label, color: theme.colors.primary },
    link: { ...theme.typography.caption, color: theme.colors.primary, textAlign: 'right' },
  });
