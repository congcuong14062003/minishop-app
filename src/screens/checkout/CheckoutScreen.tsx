import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { Screen } from '@/components/common/Screen';
import { products } from '@/data/products';
import { getVoucherDiscount, vouchers } from '@/data/vouchers';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { useShopStore } from '@/store/useShopStore';
import { formatPrice } from '@/utils/format';

const paymentOptions = [
  { id: 'cod', label: 'Thanh toán khi nhận hàng' },
  { id: 'card', label: 'Visa / Mastercard (mô phỏng)' },
  { id: 'wallet', label: 'Ví điện tử (mô phỏng)' },
] as const;

export default function CheckoutScreen() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const cart = useShopStore((state) => state.cart);
  const addresses = useShopStore((state) => state.addresses);
  const selectedAddressId = useShopStore((state) => state.selectedAddressId);
  const selectedVoucherId = useShopStore((state) => state.selectedVoucherId);
  const placeOrder = useShopStore((state) => state.placeOrder);
  const [payment, setPayment] = useState<(typeof paymentOptions)[number]['id']>('cod');
  const items = cart.filter((item) => item.selected);
  const address = addresses.find((entry) => entry.id === selectedAddressId) ?? addresses[0];
  const subtotal = items.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);
  const discount = getVoucherDiscount(selectedVoucherId, subtotal);
  const total = subtotal - discount;
  const voucher = vouchers.find((item) => item.id === selectedVoucherId);

  return (
    <Screen>
      <PageHeader title="Thanh toán" />
      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.muted}>Chưa có sản phẩm được chọn.</Text>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.link}>Quay lại giỏ hàng</Text>
          </Pressable>
        </View>
      ) : !address ? (
        <EmptyState
          icon="map-pin"
          title="Cần địa chỉ nhận hàng"
          description="Thêm địa chỉ để tiếp tục thanh toán."
          actionLabel="Thêm địa chỉ"
          onAction={() => router.push('/addresses')}
        />
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.section}>
              <View style={styles.row}>
                <Feather name="map-pin" size={20} color={theme.colors.primary} />
                <Text style={styles.heading}>Địa chỉ nhận hàng</Text>
                <Pressable
                  onPress={() =>
                    router.push({ pathname: '/addresses', params: { from: 'checkout' } })
                  }
                >
                  <Text style={styles.link}>Thay đổi</Text>
                </Pressable>
              </View>
              <Text style={styles.label}>
                {address.name} · {address.phone}
              </Text>
              <Text style={styles.muted}>{address.detail}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.heading}>Sản phẩm</Text>
              {items.map((item) => {
                const product = products.find((entry) => entry.id === item.productId);
                if (!product) return null;
                return (
                  <View key={item.id} style={styles.productRow}>
                    <Text style={styles.productName} numberOfLines={2}>
                      {product.name} × {item.quantity}
                    </Text>
                    <Text style={styles.label}>{formatPrice(product.price * item.quantity)}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.section}>
              <Text style={styles.heading}>Vận chuyển</Text>
              <View style={styles.productRow}>
                <Text style={styles.muted}>Tiêu chuẩn · Dự kiến 2–4 ngày</Text>
                <Text style={styles.free}>Miễn phí</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.heading}>Phương thức thanh toán</Text>
              {paymentOptions.map((option) => (
                <Pressable
                  key={option.id}
                  style={styles.paymentRow}
                  onPress={() => setPayment(option.id)}
                >
                  <Feather
                    name={payment === option.id ? 'check-circle' : 'circle'}
                    size={20}
                    color={payment === option.id ? theme.colors.primary : theme.colors.muted}
                  />
                  <Text style={styles.label}>{option.label}</Text>
                </Pressable>
              ))}
            </View>
            <View style={styles.section}>
              <Text style={styles.heading}>Tổng kết đơn hàng</Text>
              <Pressable
                style={styles.productRow}
                onPress={() => router.push({ pathname: '/vouchers', params: { from: 'checkout' } })}
              >
                <Text style={styles.muted}>Voucher {voucher ? `· ${voucher.code}` : ''}</Text>
                <Text style={styles.link}>Chọn mã →</Text>
              </Pressable>
              <View style={styles.productRow}>
                <Text style={styles.muted}>Tạm tính</Text>
                <Text style={styles.label}>{formatPrice(subtotal)}</Text>
              </View>
              <View style={styles.productRow}>
                <Text style={styles.muted}>Phí vận chuyển</Text>
                <Text style={styles.free}>Miễn phí</Text>
              </View>
              <View style={styles.productRow}>
                <Text style={styles.muted}>Giảm giá</Text>
                <Text style={styles.label}>-{formatPrice(discount)}</Text>
              </View>
            </View>
          </ScrollView>
          <View
            style={[styles.footer, { paddingBottom: Math.max(insets.bottom, theme.spacing.lg) }]}
          >
            <View>
              <Text style={styles.muted}>Tổng thanh toán</Text>
              <Text style={styles.total}>{formatPrice(total)}</Text>
            </View>
            <Pressable
              style={styles.orderButton}
              onPress={() => {
                const orderId = placeOrder(address, total, payment);
                router.replace({ pathname: '/order-success', params: { id: orderId } });
              }}
            >
              <Text style={styles.orderText}>Đặt hàng</Text>
            </Pressable>
          </View>
        </>
      )}
    </Screen>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    content: { backgroundColor: theme.colors.background, paddingBottom: theme.spacing.xxl },
    section: {
      padding: theme.layout.pageGutter,
      marginBottom: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
      gap: theme.spacing.sm,
    },
    row: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
    heading: { ...theme.typography.heading, color: theme.colors.text },
    label: { ...theme.typography.label, color: theme.colors.text },
    muted: { ...theme.typography.caption, color: theme.colors.textSecondary },
    productRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: theme.spacing.md,
      marginTop: theme.spacing.sm,
    },
    productName: { ...theme.typography.body, color: theme.colors.text, flex: 1 },
    free: { ...theme.typography.caption, color: theme.colors.success },
    paymentRow: {
      minHeight: theme.layout.touchTarget,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing.lg,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    total: { ...theme.typography.heading, color: theme.colors.primary },
    orderButton: {
      minHeight: theme.layout.touchTarget,
      paddingHorizontal: theme.spacing.xl,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.primary,
    },
    orderText: { ...theme.typography.label, color: theme.colors.onPrimary },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: theme.spacing.md },
    link: { ...theme.typography.label, color: theme.colors.primary },
  });
