import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';
import { products } from '@/data/products';
import { vouchers } from '@/data/vouchers';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { useShopStore } from '@/store/useShopStore';

export default function VouchersScreen() {
  const { from } = useLocalSearchParams<{ from?: string }>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const cart = useShopStore((state) => state.cart);
  const selectedId = useShopStore((state) => state.selectedVoucherId);
  const selectVoucher = useShopStore((state) => state.selectVoucher);
  const subtotal = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return sum + (item.selected && product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <Screen>
      <PageHeader title="Kho voucher" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.hint}>
          Chọn một mã phù hợp với giỏ hàng. Ưu đãi chỉ áp dụng trong bản UI mô phỏng.
        </Text>
        {vouchers.map((voucher) => {
          const eligible = subtotal >= voucher.minimum;
          const selected = selectedId === voucher.id;
          return (
            <View key={voucher.id} style={[styles.card, !eligible && styles.disabled]}>
              <View style={styles.iconBox}>
                <Feather name="gift" size={24} color={theme.colors.primary} />
              </View>
              <View style={styles.info}>
                <Text style={styles.title}>{voucher.title}</Text>
                <Text style={styles.description}>{voucher.description}</Text>
                <Text style={styles.code}>{voucher.code}</Text>
              </View>
              <Pressable
                style={[styles.selectButton, selected && styles.selectedButton]}
                disabled={!eligible}
                onPress={() => {
                  selectVoucher(selected ? null : voucher.id);
                  if (from === 'cart' || from === 'checkout') router.back();
                }}
              >
                <Text style={[styles.selectText, selected && styles.selectedText]}>
                  {selected ? 'Bỏ chọn' : eligible ? 'Chọn' : 'Chưa đủ'}
                </Text>
              </Pressable>
            </View>
          );
        })}
        {subtotal === 0 && <Text style={styles.hint}>Thêm sản phẩm vào giỏ để dùng voucher.</Text>}
      </ScrollView>
    </Screen>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    content: {
      padding: theme.layout.pageGutter,
      paddingBottom: theme.spacing.huge,
      gap: theme.spacing.md,
      backgroundColor: theme.colors.background,
    },
    hint: { ...theme.typography.caption, color: theme.colors.textSecondary },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      padding: theme.spacing.md,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    disabled: { opacity: 0.55 },
    iconBox: {
      width: 44,
      height: 44,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    info: { flex: 1, gap: theme.spacing.xs },
    title: { ...theme.typography.label, color: theme.colors.text },
    description: { ...theme.typography.caption, color: theme.colors.textSecondary },
    code: { ...theme.typography.eyebrow, color: theme.colors.primary },
    selectButton: {
      minHeight: 36,
      paddingHorizontal: theme.spacing.sm,
      borderRadius: theme.radius.sm,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedButton: { backgroundColor: theme.colors.primarySoft },
    selectText: { ...theme.typography.caption, color: theme.colors.primary },
    selectedText: { color: theme.colors.primary },
  });
