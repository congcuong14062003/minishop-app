import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';
import { ProductGrid } from '@/components/product/ProductGrid';
import { products } from '@/data/products';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { useShopStore } from '@/store/useShopStore';

export default function WishlistScreen() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const wishlist = useShopStore((state) => state.wishlist);
  const favorites = products.filter((product) => wishlist.includes(product.id));

  return (
    <Screen>
      <PageHeader title="Yêu thích" back={false} />
      {favorites.length ? (
        <ProductGrid
          products={favorites}
          showQuickAdd
          header={<Text style={styles.heading}>{favorites.length} sản phẩm đã lưu</Text>}
        />
      ) : (
        <View style={styles.empty}>
          <Feather name="heart" size={64} color={theme.colors.muted} />
          <Text style={styles.heading}>Chưa có sản phẩm yêu thích</Text>
          <Text style={styles.muted}>Chạm vào biểu tượng trái tim để lưu sản phẩm bạn thích.</Text>
          <Pressable style={styles.button} onPress={() => router.push('/(tabs)')}>
            <Text style={styles.buttonText}>Khám phá sản phẩm</Text>
          </Pressable>
        </View>
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
    heading: {
      ...theme.typography.heading,
      color: theme.colors.text,
      paddingVertical: theme.spacing.lg,
      textAlign: 'center',
    },
    muted: { ...theme.typography.body, color: theme.colors.textSecondary, textAlign: 'center' },
    button: {
      minHeight: theme.layout.touchTarget,
      paddingHorizontal: theme.spacing.xl,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.primary,
    },
    buttonText: { ...theme.typography.label, color: theme.colors.onPrimary },
  });
