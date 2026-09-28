import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';
import { products } from '@/data/products';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { useShopStore } from '@/store/useShopStore';
import { formatPrice } from '@/utils/format';
import type { OrderStatus } from '@/types';

const steps = ['Đặt hàng', 'Xác nhận', 'Đang chuẩn bị', 'Đang giao', 'Đã giao'];
const statusProgress: Record<Exclude<OrderStatus, 'cancelled'>, number> = {
  pending: 0,
  processing: 2,
  shipping: 3,
  delivered: 4,
};
const statusCopy: Record<OrderStatus, { title: string; description: string }> = {
  pending: {
    title: 'Chờ thanh toán',
    description: 'Hoàn tất thanh toán để MiniShop xử lý đơn hàng.',
  },
  processing: {
    title: 'Đang xử lý đơn hàng',
    description: 'MiniShop đang chuẩn bị sản phẩm của bạn.',
  },
  shipping: {
    title: 'Đang giao hàng',
    description: 'Sản phẩm đang trên đường đến địa chỉ của bạn.',
  },
  delivered: { title: 'Đã giao hàng', description: 'Cảm ơn bạn đã mua sắm tại MiniShop.' },
  cancelled: { title: 'Đơn hàng đã hủy', description: 'Đơn hàng này không còn được xử lý.' },
};

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const order = useShopStore((state) => state.orders.find((item) => item.id === id));
  const [contactOpen, setContactOpen] = useState(false);
  const subtotal =
    order?.items.reduce((sum, item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return sum + (product?.price ?? 0) * item.quantity;
    }, 0) ?? 0;
  const discount = order ? Math.max(0, subtotal - order.total) : 0;
  const progress = order && order.status !== 'cancelled' ? statusProgress[order.status] : -1;

  return (
    <Screen>
      <PageHeader title="Chi tiết đơn hàng" />
      {order ? (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.section}>
            <Text style={styles.heading}>{statusCopy[order.status].title}</Text>
            <Text style={styles.muted}>{statusCopy[order.status].description}</Text>
            {order.status === 'cancelled' ? (
              <View style={styles.timelineRow}>
                <Feather name="x-circle" size={18} color={theme.colors.error} />
                <Text style={styles.label}>Đã hủy</Text>
              </View>
            ) : (
              steps.map((step, index) => (
                <View key={step} style={styles.timelineRow}>
                  <Feather
                    name={index <= progress ? 'check-circle' : 'circle'}
                    size={18}
                    color={index <= progress ? theme.colors.success : theme.colors.muted}
                  />
                  <Text style={index <= progress ? styles.label : styles.muted}>{step}</Text>
                </View>
              ))
            )}
          </View>
          <View style={styles.section}>
            <Text style={styles.heading}>Thông tin đơn hàng</Text>
            <Text style={styles.label}>#{order.id}</Text>
            <Text style={styles.muted}>{new Date(order.createdAt).toLocaleString('vi-VN')}</Text>
            <Text style={styles.muted}>
              {order.address.name} · {order.address.phone}
            </Text>
            <Text style={styles.muted}>{order.address.detail}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.heading}>Sản phẩm</Text>
            {order.items.map((item) => {
              const product = products.find((entry) => entry.id === item.productId);
              return product ? (
                <View key={item.id} style={styles.productRow}>
                  <Text style={styles.label} numberOfLines={2}>
                    {product.name} × {item.quantity}
                  </Text>
                  <Text style={styles.muted}>{formatPrice(product.price * item.quantity)}</Text>
                </View>
              ) : null;
            })}
          </View>
          <View style={styles.section}>
            <Text style={styles.heading}>
              {order.paymentMethod === 'card'
                ? 'Visa / Mastercard'
                : order.paymentMethod === 'wallet'
                  ? 'Ví điện tử'
                  : 'Thanh toán khi nhận hàng'}
            </Text>
            <View style={styles.productRow}>
              <Text style={styles.label}>Tổng cộng</Text>
              <Text style={styles.total}>{formatPrice(order.total)}</Text>
            </View>
            {discount > 0 && (
              <Text style={styles.discount}>Đã giảm {formatPrice(discount)} bằng voucher</Text>
            )}
          </View>
          <Pressable style={styles.contactButton} onPress={() => setContactOpen(true)}>
            <Feather name="message-circle" size={17} color={theme.colors.primary} />
            <Text style={styles.contactText}>Liên hệ shop</Text>
          </Pressable>
          {contactOpen && (
            <Text style={styles.contactNote}>
              Chat với shop sẽ khả dụng khi ứng dụng kết nối dịch vụ thật.
            </Text>
          )}
        </ScrollView>
      ) : (
        <Text style={styles.missing}>Không tìm thấy đơn hàng này.</Text>
      )}
    </Screen>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    content: { backgroundColor: theme.colors.background, paddingBottom: theme.spacing.huge },
    section: {
      padding: theme.layout.pageGutter,
      marginBottom: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
      gap: theme.spacing.sm,
    },
    heading: {
      ...theme.typography.heading,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    label: { ...theme.typography.label, color: theme.colors.text, flex: 1 },
    muted: { ...theme.typography.caption, color: theme.colors.textSecondary },
    timelineRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      minHeight: 32,
    },
    productRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    total: { ...theme.typography.heading, color: theme.colors.primary },
    discount: { ...theme.typography.caption, color: theme.colors.success },
    contactButton: {
      minHeight: theme.layout.touchTarget,
      marginHorizontal: theme.layout.pageGutter,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    contactText: { ...theme.typography.label, color: theme.colors.primary },
    contactNote: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      padding: theme.spacing.lg,
    },
    missing: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      padding: theme.spacing.xl,
    },
  });
