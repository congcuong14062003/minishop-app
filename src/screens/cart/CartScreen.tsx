import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';
import { ProductImage } from '@/components/product/ProductImage';
import { products } from '@/data/products';
import { getVoucherDiscount, vouchers } from '@/data/vouchers';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { useShopStore } from '@/store/useShopStore';
import { formatPrice } from '@/utils/format';

export default function CartScreen() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const cart = useShopStore((state) => state.cart);
  const selectedVoucherId = useShopStore((state) => state.selectedVoucherId);
  const updateQuantity = useShopStore((state) => state.updateQuantity);
  const removeFromCart = useShopStore((state) => state.removeFromCart);
  const toggleCartSelection = useShopStore((state) => state.toggleCartSelection);
  const selectAllCart = useShopStore((state) => state.selectAllCart);
  const selectedCount = cart.filter((item) => item.selected).length;
  const allSelected = cart.length > 0 && selectedCount === cart.length;
  const subtotal = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return sum + (item.selected && product ? product.price * item.quantity : 0);
  }, 0);
  const voucher = vouchers.find((item) => item.id === selectedVoucherId);
  const discount = getVoucherDiscount(selectedVoucherId, subtotal);
  const total = subtotal - discount;

  return (
    <Screen>
      <PageHeader title={`Giỏ hàng (${cart.length})`} back={false} />
      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Feather name="shopping-cart" size={64} color={theme.colors.muted} />
          <Text style={styles.emptyTitle}>Giỏ hàng đang trống</Text>
          <Text style={styles.muted}>Khám phá sản phẩm và thêm vào giỏ hàng của bạn.</Text>
          <Pressable style={styles.shopButton} onPress={() => router.push('/(tabs)')}>
            <Text style={styles.shopText}>Mua sắm ngay</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.content}>
            <Pressable style={styles.selectAll} onPress={() => selectAllCart(!allSelected)}>
              <Feather
                name={allSelected ? 'check-square' : 'square'}
                size={20}
                color={theme.colors.primary}
              />
              <Text style={styles.label}>Chọn tất cả ({cart.length})</Text>
            </Pressable>
            <View style={styles.shopHeading}>
              <Feather name="shopping-cart" size={18} color={theme.colors.primary} />
              <Text style={styles.label}>MiniShop Official</Text>
            </View>
            {cart.map((item) => {
              const product = products.find((entry) => entry.id === item.productId);
              if (!product) return null;
              return (
                <View key={item.id} style={styles.item}>
                  <Pressable
                    onPress={() => toggleCartSelection(item.id)}
                    accessibilityLabel={item.selected ? 'Bỏ chọn sản phẩm' : 'Chọn sản phẩm'}
                  >
                    <Feather
                      name={item.selected ? 'check-square' : 'square'}
                      size={20}
                      color={theme.colors.primary}
                    />
                  </Pressable>
                  <Pressable
                    style={styles.imageBox}
                    onPress={() =>
                      router.push({ pathname: '/product/[id]', params: { id: product.id } })
                    }
                  >
                    <ProductImage uri={product.images[0]} label={product.name} />
                  </Pressable>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName} numberOfLines={2}>
                      {product.name}
                    </Text>
                    <Text style={styles.variant} numberOfLines={1}>
                      {Object.values(item.variants).join(' · ')}
                    </Text>
                    <Text style={styles.price}>{formatPrice(product.price)}</Text>
                    <View style={styles.itemFooter}>
                      <View style={styles.stepper}>
                        <Pressable
                          onPress={() => updateQuantity(item.id, item.quantity - 1)}
                          style={styles.step}
                          accessibilityLabel="Giảm số lượng"
                        >
                          <Feather name="minus" size={15} color={theme.colors.text} />
                        </Pressable>
                        <Text style={styles.quantity}>{item.quantity}</Text>
                        <Pressable
                          onPress={() => updateQuantity(item.id, item.quantity + 1)}
                          style={styles.step}
                          accessibilityLabel="Tăng số lượng"
                        >
                          <Feather name="plus" size={15} color={theme.colors.text} />
                        </Pressable>
                      </View>
                      <Pressable
                        onPress={() => removeFromCart(item.id)}
                        accessibilityLabel="Xóa sản phẩm"
                      >
                        <Feather name="trash-2" size={18} color={theme.colors.textSecondary} />
                      </Pressable>
                    </View>
                  </View>
                </View>
              );
            })}
            <Pressable
              style={styles.voucherRow}
              onPress={() => router.push({ pathname: '/vouchers', params: { from: 'cart' } })}
            >
              <Feather name="gift" size={19} color={theme.colors.primary} />
              <View style={styles.voucherInfo}>
                <Text style={styles.label}>MiniShop Voucher</Text>
                <Text style={styles.voucherHint}>
                  {voucher
                    ? `${voucher.code}${discount === 0 ? ' · chưa đủ điều kiện' : ''}`
                    : 'Chọn mã giảm giá'}
                </Text>
              </View>
              <Feather name="chevron-right" size={18} color={theme.colors.muted} />
            </Pressable>
          </ScrollView>
          <View style={styles.footer}>
            <View>
              <Text style={styles.muted}>Tạm tính {formatPrice(subtotal)}</Text>
              {discount > 0 && <Text style={styles.discount}>Giảm {formatPrice(discount)}</Text>}
              <Text style={styles.muted}>Tổng cộng</Text>
              <Text style={styles.total}>{formatPrice(total)}</Text>
            </View>
            <Pressable
              style={[styles.shopButton, selectedCount === 0 && styles.disabled]}
              disabled={selectedCount === 0}
              onPress={() => router.push('/checkout')}
            >
              <Text style={styles.shopText}>Thanh toán ({selectedCount})</Text>
            </Pressable>
          </View>
        </>
      )}
    </Screen>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    empty: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.md,
      padding: theme.spacing.xl,
    },
    emptyTitle: { ...theme.typography.heading, color: theme.colors.text },
    muted: { ...theme.typography.caption, color: theme.colors.textSecondary, textAlign: 'center' },
    shopButton: {
      minHeight: theme.layout.touchTarget,
      paddingHorizontal: theme.spacing.xl,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    shopText: { ...theme.typography.label, color: theme.colors.onPrimary },
    content: { paddingBottom: theme.spacing.huge },
    selectAll: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
      padding: theme.layout.pageGutter,
    },
    label: { ...theme.typography.label, color: theme.colors.text },
    shopHeading: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
      paddingHorizontal: theme.layout.pageGutter,
      paddingVertical: theme.spacing.md,
      backgroundColor: theme.colors.background,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing.sm,
      padding: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    imageBox: { width: 78, height: 78, borderRadius: theme.radius.sm, overflow: 'hidden' },
    itemInfo: { flex: 1, gap: theme.spacing.xs },
    itemName: { ...theme.typography.label, color: theme.colors.text },
    variant: { ...theme.typography.caption, color: theme.colors.textSecondary },
    price: { ...theme.typography.label, color: theme.colors.primary },
    itemFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    voucherRow: {
      minHeight: 72,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      paddingHorizontal: theme.layout.pageGutter,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    voucherInfo: { flex: 1 },
    voucherHint: { ...theme.typography.caption, color: theme.colors.textSecondary },
    discount: { ...theme.typography.caption, color: theme.colors.success },
    stepper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.sm,
    },
    step: { width: 30, height: 28, alignItems: 'center', justifyContent: 'center' },
    quantity: {
      ...theme.typography.caption,
      color: theme.colors.text,
      minWidth: 24,
      textAlign: 'center',
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing.lg,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    total: { ...theme.typography.heading, color: theme.colors.primary },
    disabled: { opacity: 0.5 },
  });
