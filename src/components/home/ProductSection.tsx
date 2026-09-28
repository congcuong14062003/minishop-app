import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';

interface Props {
  title: string;
  products: readonly Product[];
  horizontal?: boolean;
  collectionId?: 'flashSale' | 'popular' | 'recommended';
  flashSale?: boolean;
}

export function ProductSection({
  title,
  products,
  horizontal = false,
  collectionId,
  flashSale = false,
}: Props) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [sectionWidth, setSectionWidth] = useState(0);
  const [remaining, setRemaining] = useState(2 * 60 * 60 + 35 * 60 + 48);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    if (!flashSale) return;
    const timer = setInterval(() => setRemaining((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => clearInterval(timer);
  }, [flashSale]);

  const countdown = [
    Math.floor(remaining / 3600),
    Math.floor((remaining % 3600) / 60),
    remaining % 60,
  ]
    .map((part) => String(part).padStart(2, '0'))
    .join(':');

  const cardWidth = Math.max(0, (sectionWidth - theme.spacing.md) / 2);
  const visibleProducts = useMemo(
    () => (horizontal ? products : products.slice(0, visibleCount)),
    [horizontal, products, visibleCount],
  );
  const rows = useMemo(() => {
    const result: Product[][] = [];
    for (let index = 0; index < visibleProducts.length; index += 2) {
      result.push(visibleProducts.slice(index, index + 2));
    }
    return result;
  }, [visibleProducts]);
  return (
    <View
      style={styles.section}
      onLayout={(event) => {
        setSectionWidth(event.nativeEvent.layout.width);
      }}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>{title}</Text>
          {flashSale && <Text style={styles.countdown}>Kết thúc sau {countdown}</Text>}
        </View>
        {collectionId && (
          <Pressable
            style={styles.swipeHint}
            onPress={() =>
              router.push({ pathname: '/collection/[id]', params: { id: collectionId } })
            }
          >
            <Text style={styles.swipeHintText}>Xem tất cả</Text>
            <Feather name="arrow-right" size={15} color={theme.colors.primary} />
          </Pressable>
        )}
      </View>

      {products.length === 0 ? (
        <Text style={styles.empty}>Chưa có sản phẩm.</Text>
      ) : horizontal ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalViewport}
          contentContainerStyle={styles.horizontalList}
        >
          {products.map((product) => (
            <View key={product.id} style={{ width: cardWidth }}>
              <ProductCard product={product} showSoldProgress={flashSale} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <>
          <View style={styles.grid}>
            {rows.map((row) => (
              <View key={row[0]?.id} style={styles.gridRow}>
                {row.map((product) => (
                  <View key={product.id} style={styles.gridItem}>
                    <ProductCard product={product} showSoldProgress={flashSale} />
                  </View>
                ))}
                {row.length === 1 && <View style={styles.gridItem} />}
              </View>
            ))}
          </View>
          {visibleCount < products.length && (
            <Pressable
              style={styles.moreButton}
              onPress={() => setVisibleCount((count) => count + 8)}
            >
              <Text style={styles.moreText}>Xem thêm sản phẩm</Text>
              <Feather name="chevron-down" size={16} color={theme.colors.primary} />
            </Pressable>
          )}
        </>
      )}
    </View>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    section: {
      paddingTop: theme.spacing.xxl,
      gap: theme.spacing.lg,
    },
    heading: {
      ...theme.typography.heading,
      color: theme.colors.text,
    },
    countdown: { ...theme.typography.caption, color: theme.colors.primary },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing.sm,
    },
    swipeHint: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
      flexShrink: 0,
    },
    swipeHintText: {
      ...theme.typography.caption,
      color: theme.colors.primary,
    },
    empty: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
    },
    horizontalViewport: {
      marginRight: -theme.layout.pageGutter,
    },
    horizontalList: {
      gap: theme.spacing.md,
      paddingRight: theme.layout.pageGutter,
    },
    grid: {
      gap: theme.spacing.md,
    },
    gridRow: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    gridItem: {
      flex: 1,
      minWidth: 0,
    },
    moreButton: {
      minHeight: theme.layout.touchTarget,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.sm,
    },
    moreText: { ...theme.typography.label, color: theme.colors.primary },
  });
