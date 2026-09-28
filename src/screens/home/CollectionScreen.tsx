import { useMemo } from 'react';
import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';
import { ProductGrid } from '@/components/product/ProductGrid';
import { flashSaleProducts, popularProducts, recommendedProducts } from '@/data/homeCollections';
import { useAppTheme } from '@/hooks/useAppTheme';

const collections = {
  flashSale: { title: 'Flash Sale', products: flashSaleProducts },
  popular: { title: 'Được yêu thích', products: popularProducts },
  recommended: { title: 'Gợi ý hôm nay', products: recommendedProducts },
};

export default function CollectionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useAppTheme();
  const collection = collections[id as keyof typeof collections];
  const header = useMemo(
    () => (
      <Text
        style={{
          ...theme.typography.label,
          color: theme.colors.text,
          paddingVertical: theme.spacing.lg,
        }}
      >
        {collection?.products.length ?? 0} sản phẩm
      </Text>
    ),
    [collection, theme],
  );

  return (
    <Screen>
      <PageHeader title={collection?.title ?? 'Sản phẩm'} />
      {collection ? (
        <ProductGrid products={collection.products} header={header} />
      ) : (
        <Text
          style={{
            ...theme.typography.body,
            color: theme.colors.textSecondary,
            padding: theme.spacing.xl,
          }}
        >
          Không tìm thấy bộ sưu tập.
        </Text>
      )}
    </Screen>
  );
}
