import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { Product } from '@/types';
import { formatPrice } from '@/utils/format';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { useShopStore } from '@/store/useShopStore';
import { ProductImage } from './ProductImage';

const FLASH_SALE_DISPLAY_TARGET = 10_000;

export function ProductCard({
  product,
  showSoldProgress = false,
  showQuickAdd = false,
}: {
  product: Product;
  showSoldProgress?: boolean;
  showQuickAdd?: boolean;
}) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const image = product.images[0];
  const isFavorite = useShopStore((state) => state.wishlist.includes(product.id));
  const toggleWishlist = useShopStore((state) => state.toggleWishlist);
  const addToCart = useShopStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timeout = setTimeout(() => setAdded(false), 2000);
    return () => clearTimeout(timeout);
  }, [added]);

  const quickAdd = () => {
    const variants = Object.fromEntries(
      product.variants.map((variant) => [variant.name, variant.options[0] ?? '']),
    );
    addToCart({
      id: `${product.id}:${JSON.stringify(variants)}`,
      productId: product.id,
      quantity: 1,
      selected: true,
      variants,
    });
    setAdded(true);
  };

  return (
    <View style={styles.card}>
      <Pressable
        style={({ pressed }) => [styles.cardContent, pressed && styles.pressed]}
        onPress={() => router.push({ pathname: '/product/[id]', params: { id: product.id } })}
        accessibilityRole="button"
        accessibilityLabel={`Xem chi tiết ${product.name}`}
      >
        <View style={styles.imageContainer}>
          <ProductImage uri={image} label={product.name} />

          {product.discount > 0 && (
            <View style={styles.discount}>
              <Text style={styles.discountText}>-{product.discount}%</Text>
            </View>
          )}
        </View>

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>

          <Text style={styles.price}>{formatPrice(product.price)}</Text>

          {product.originalPrice > product.price && (
            <Text style={styles.oldPrice}>{formatPrice(product.originalPrice)}</Text>
          )}

          <View style={styles.rating}>
            <Feather name="star" size={13} color={theme.colors.warning} />
            <Text style={styles.caption}>{product.rating}</Text>
          </View>

          <Text style={styles.caption}>Đã bán {product.sold.toLocaleString('vi-VN')}</Text>

          {showSoldProgress && (
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.min(100, (product.sold / FLASH_SALE_DISPLAY_TARGET) * 100)}%` },
                ]}
              />
            </View>
          )}

          <Text style={styles.caption} numberOfLines={1}>
            {product.location}
          </Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => toggleWishlist(product.id)}
        style={styles.favorite}
        accessibilityRole="button"
        accessibilityLabel={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
      >
        <Feather
          name="heart"
          size={18}
          color={isFavorite ? theme.colors.primary : theme.colors.text}
        />
      </Pressable>
      {showQuickAdd && (
        <Pressable style={styles.quickAdd} onPress={quickAdd} accessibilityRole="button">
          <Feather
            name={added ? 'check' : 'shopping-cart'}
            size={15}
            color={theme.colors.onPrimary}
          />
          <Text style={styles.quickAddText}>{added ? 'Đã thêm' : 'Thêm vào giỏ'}</Text>
        </Pressable>
      )}
    </View>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: 'hidden',
    },
    cardContent: { flex: 1 },
    pressed: { transform: [{ scale: 0.985 }], opacity: 0.92 },
    imageContainer: {
      aspectRatio: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    favorite: {
      position: 'absolute',
      right: theme.spacing.sm,
      top: theme.spacing.sm,
      width: 34,
      height: 34,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    discount: {
      position: 'absolute',
      top: theme.spacing.sm,
      left: theme.spacing.sm,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      backgroundColor: theme.colors.primarySoft,
      borderRadius: theme.radius.sm,
    },
    discountText: {
      ...theme.typography.caption,
      color: theme.colors.primary,
    },
    info: {
      padding: theme.spacing.md,
      gap: theme.spacing.xs,
    },
    name: {
      ...theme.typography.label,
      color: theme.colors.text,
      minHeight: theme.typography.label.lineHeight * 2,
    },
    price: {
      ...theme.typography.label,
      color: theme.colors.primary,
    },
    oldPrice: {
      ...theme.typography.caption,
      color: theme.colors.muted,
      textDecorationLine: 'line-through',
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    caption: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
    progressTrack: {
      height: 5,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.primarySoft,
      overflow: 'hidden',
    },
    progressFill: { height: '100%', backgroundColor: theme.colors.primary },
    quickAdd: {
      minHeight: theme.layout.touchTarget,
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.sm,
    },
    quickAddText: {
      ...theme.typography.caption,
      fontFamily: theme.fonts.semibold,
      color: theme.colors.onPrimary,
    },
  });
