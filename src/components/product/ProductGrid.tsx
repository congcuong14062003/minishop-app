import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { Product } from '@/types';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { ProductCard } from './ProductCard';

interface Props {
  products: readonly Product[];
  emptyMessage?: string;
  header?: React.ReactElement;
  showQuickAdd?: boolean;
}

export function ProductGrid({
  products,
  emptyMessage = 'Không có sản phẩm phù hợp.',
  header,
  showQuickAdd = false,
}: Props) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [width, setWidth] = useState(0);
  const cardWidth = Math.max(0, (width - theme.spacing.md) / 2);

  return (
    <FlatList
      data={products}
      keyExtractor={(product) => product.id}
      numColumns={2}
      style={styles.list}
      onLayout={(event) => setWidth(event.nativeEvent.layout.width - 2 * theme.layout.pageGutter)}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      ListHeaderComponent={header}
      ListEmptyComponent={<Text style={styles.empty}>{emptyMessage}</Text>}
      renderItem={({ item }) => (
        <View style={{ width: cardWidth }}>
          <ProductCard product={item} showQuickAdd={showQuickAdd} />
        </View>
      )}
    />
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    list: { flex: 1 },
    content: {
      paddingHorizontal: theme.layout.pageGutter,
      paddingBottom: theme.spacing.huge,
    },
    row: { gap: theme.spacing.md, marginBottom: theme.spacing.md },
    empty: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      paddingVertical: theme.spacing.huge,
    },
  });
