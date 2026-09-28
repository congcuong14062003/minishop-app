import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ReviewCard } from '@/components/product/ReviewCard';
import { products } from '@/data/products';
import { getProductReviews } from '@/data/reviews';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { useShopStore } from '@/store/useShopStore';
import { formatPrice } from '@/utils/format';
import { getAddressCity } from '@/utils/address';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const product = products.find((item) => item.id === id);
  const reviews = useMemo(() => getProductReviews(id, product?.images), [id, product]);
  const related = useMemo(
    () =>
      products.filter((item) => item.category === product?.category && item.id !== id).slice(0, 6),
    [id, product],
  );
  const [selection, setSelection] = useState<{ productId: string; values: Record<string, string> }>(
    {
      productId: '',
      values: {},
    },
  );
  const selected = selection.productId === id ? selection.values : {};
  const [toast, setToast] = useState('');
  const wishlist = useShopStore((state) => state.wishlist);
  const toggleWishlist = useShopStore((state) => state.toggleWishlist);
  const addToCart = useShopStore((state) => state.addToCart);
  const selectAllCart = useShopStore((state) => state.selectAllCart);
  const deliveryAddress = useShopStore((state) =>
    state.addresses.find((item) => item.id === state.selectedAddressId),
  );

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(''), 2500);
    return () => clearTimeout(timeout);
  }, [toast]);

  if (!product) {
    return (
      <Screen>
        <PageHeader title="Sản phẩm" />
        <Text style={styles.missing}>Không tìm thấy sản phẩm này.</Text>
      </Screen>
    );
  }

  const favorite = wishlist.includes(product.id);
  const addCurrentItem = () => {
    const variants = Object.fromEntries(
      product.variants.map((variant) => [
        variant.name,
        selected[variant.name] ?? variant.options[0] ?? '',
      ]),
    );
    addToCart({
      id: `${product.id}:${JSON.stringify(variants)}`,
      productId: product.id,
      quantity: 1,
      selected: true,
      variants,
    });
    setToast('Đã thêm sản phẩm vào giỏ hàng');
  };

  return (
    <Screen>
      <PageHeader
        title="Chi tiết sản phẩm"
        right={
          <Pressable onPress={() => router.push('/(tabs)/cart')} accessibilityLabel="Mở giỏ hàng">
            <Feather name="shopping-bag" size={21} color={theme.colors.text} />
          </Pressable>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ProductGallery
          images={product.images}
          name={product.name}
          favorite={favorite}
          onFavorite={() => toggleWishlist(product.id)}
        />
        <View style={styles.section}>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.metaRow}>
            <Feather name="star" size={15} color={theme.colors.warning} />
            <Text style={styles.rating}>{product.rating}</Text>
            <Text style={styles.muted}>· {reviews.length} đánh giá</Text>
            <Text style={styles.muted}>· Đã bán {product.sold.toLocaleString('vi-VN')}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            {product.discount > 0 && <Text style={styles.discount}>-{product.discount}%</Text>}
          </View>
          {product.originalPrice > product.price && (
            <Text style={styles.oldPrice}>{formatPrice(product.originalPrice)}</Text>
          )}
        </View>

        {product.variants.length > 0 && (
          <View style={styles.section}>
            {product.variants.map((variant) => (
              <View key={variant.name} style={styles.variantGroup}>
                <Text style={styles.sectionTitle}>{variant.name}</Text>
                <View style={styles.options}>
                  {variant.options.map((option) => {
                    const active = (selected[variant.name] ?? variant.options[0]) === option;
                    return (
                      <Pressable
                        key={option}
                        style={[styles.option, active && styles.selectedOption]}
                        onPress={() =>
                          setSelection({
                            productId: id,
                            values: { ...selected, [variant.name]: option },
                          })
                        }
                        accessibilityRole="radio"
                        accessibilityState={{ checked: active }}
                      >
                        <Text style={[styles.optionText, active && styles.selectedOptionText]}>
                          {option}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.shippingRow}>
            <Feather name="truck" size={21} color={theme.colors.success} />
            <View>
              <Text style={styles.sectionTitle}>Miễn phí vận chuyển</Text>
              <Text style={styles.muted}>
                Dự kiến giao trong 2–4 ngày · {getAddressCity(deliveryAddress?.detail)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mô tả sản phẩm</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.stock}>Còn {product.stock} sản phẩm</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.headingRow}>
            <Text style={styles.sectionTitle}>Đánh giá sản phẩm</Text>
            <Pressable
              onPress={() => router.push({ pathname: '/product/[id]/reviews', params: { id } })}
            >
              <Text style={styles.link}>Xem tất cả</Text>
            </Pressable>
          </View>
          <View style={styles.reviewSummary}>
            <Feather name="star" size={20} color={theme.colors.warning} />
            <Text style={styles.score}>{product.rating} / 5</Text>
            <Text style={styles.muted}>· {reviews.length} đánh giá</Text>
          </View>
          {reviews.slice(0, 2).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </View>

        {related.length > 0 && (
          <View style={styles.relatedSection}>
            <Text style={styles.sectionTitle}>Sản phẩm liên quan</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedRow}
            >
              {related.map((item) => (
                <View key={item.id} style={styles.relatedCard}>
                  <ProductCard product={item} />
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>

      <View
        style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, theme.spacing.sm) }]}
      >
        <Pressable
          style={styles.iconAction}
          onPress={() => setToast('Chat với shop sẽ sớm có mặt')}
          accessibilityLabel="Chat với shop"
        >
          <Feather name="message-circle" size={22} color={theme.colors.text} />
        </Pressable>
        <Pressable
          style={styles.iconAction}
          onPress={() => router.push('/(tabs)/cart')}
          accessibilityLabel="Mở giỏ hàng"
        >
          <Feather name="shopping-cart" size={22} color={theme.colors.text} />
        </Pressable>
        <Pressable style={styles.addButton} onPress={addCurrentItem}>
          <Text style={styles.addText}>Thêm vào giỏ</Text>
        </Pressable>
        <Pressable
          style={styles.buyButton}
          onPress={() => {
            selectAllCart(false);
            addCurrentItem();
            router.push('/checkout');
          }}
        >
          <Text style={styles.buyText}>Mua ngay</Text>
        </Pressable>
      </View>
      {!!toast && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{toast}</Text>
        </View>
      )}
    </Screen>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    content: { paddingBottom: theme.spacing.xxl, backgroundColor: theme.colors.background },
    missing: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      padding: theme.spacing.xl,
    },
    section: {
      backgroundColor: theme.colors.surface,
      padding: theme.layout.pageGutter,
      marginBottom: theme.spacing.sm,
    },
    name: { ...theme.typography.heading, color: theme.colors.text, marginBottom: theme.spacing.sm },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: theme.spacing.xs,
    },
    rating: { ...theme.typography.label, color: theme.colors.text },
    muted: { ...theme.typography.caption, color: theme.colors.textSecondary },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
      marginTop: theme.spacing.lg,
    },
    price: { ...theme.typography.title, color: theme.colors.primary },
    discount: {
      ...theme.typography.caption,
      color: theme.colors.primary,
      backgroundColor: theme.colors.primarySoft,
      paddingHorizontal: theme.spacing.sm,
      borderRadius: theme.radius.sm,
    },
    oldPrice: {
      ...theme.typography.caption,
      color: theme.colors.muted,
      textDecorationLine: 'line-through',
    },
    variantGroup: { marginBottom: theme.spacing.lg },
    sectionTitle: { ...theme.typography.heading, color: theme.colors.text },
    options: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
      marginTop: theme.spacing.md,
    },
    option: {
      minHeight: 40,
      paddingHorizontal: theme.spacing.lg,
      justifyContent: 'center',
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    selectedOption: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primarySoft,
    },
    optionText: { ...theme.typography.caption, color: theme.colors.text },
    selectedOptionText: { color: theme.colors.primary, fontFamily: theme.fonts.semibold },
    shippingRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md },
    description: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.md,
    },
    stock: {
      ...theme.typography.caption,
      color: theme.colors.success,
      marginTop: theme.spacing.md,
    },
    headingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    link: {
      ...theme.typography.caption,
      color: theme.colors.primary,
      fontFamily: theme.fonts.semibold,
    },
    reviewSummary: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
      marginTop: theme.spacing.md,
    },
    score: { ...theme.typography.heading, color: theme.colors.text },
    relatedSection: {
      backgroundColor: theme.colors.surface,
      paddingVertical: theme.layout.pageGutter,
    },
    relatedRow: {
      gap: theme.spacing.md,
      paddingHorizontal: theme.layout.pageGutter,
      paddingTop: theme.spacing.md,
    },
    relatedCard: { width: 174 },
    bottomBar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      ...theme.shadows.subtle,
    },
    iconAction: { width: 34, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
    addButton: {
      flex: 1,
      minHeight: theme.layout.touchTarget,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderRadius: theme.radius.md,
    },
    addText: {
      ...theme.typography.caption,
      fontFamily: theme.fonts.semibold,
      color: theme.colors.primary,
    },
    buyButton: {
      flex: 1,
      minHeight: theme.layout.touchTarget,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.primary,
    },
    buyText: {
      ...theme.typography.caption,
      fontFamily: theme.fonts.semibold,
      color: theme.colors.onPrimary,
    },
    toast: {
      position: 'absolute',
      bottom: 92,
      alignSelf: 'center',
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.text,
    },
    toastText: { ...theme.typography.caption, color: theme.colors.surface },
  });
