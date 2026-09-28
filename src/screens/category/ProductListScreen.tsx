import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';
import { FilterSheet } from '@/components/product/FilterSheet';
import { ProductGrid } from '@/components/product/ProductGrid';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import {
  emptyFilters,
  selectProducts,
  sortModes,
  type ProductFilters,
  type SortMode,
} from '@/utils/catalog';

export default function ProductListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [filters, setFilters] = useState<ProductFilters>(emptyFilters);
  const [draftFilters, setDraftFilters] = useState<ProductFilters>(emptyFilters);
  const [sort, setSort] = useState<SortMode>('popular');
  const [sheetOpen, setSheetOpen] = useState(false);
  const category = categories.find((item) => item.id === id);
  const categoryProducts = useMemo(() => products.filter((item) => item.category === id), [id]);
  const brands = useMemo(
    () => [...new Set(categoryProducts.map((item) => item.brand))].sort(),
    [categoryProducts],
  );
  const results = useMemo(
    () => selectProducts(categoryProducts, filters, sort),
    [categoryProducts, filters, sort],
  );
  const filterCount =
    Number(filters.priceRange !== 'all') + Number(filters.minRating > 0) + filters.brands.length;

  if (!category) {
    return (
      <Screen>
        <PageHeader title="Danh mục" />
        <Text style={styles.empty}>Không tìm thấy danh mục này.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <PageHeader title={category.name} />
      <ProductGrid
        products={results}
        header={
          <View style={styles.listHeader}>
            <Pressable style={styles.search} onPress={() => router.push('/search')}>
              <Feather name="search" size={18} color={theme.colors.muted} />
              <Text style={styles.searchText}>Tìm trong MiniShop...</Text>
            </Pressable>
            <View style={styles.toolbar}>
              <View>
                <Text style={styles.resultTitle}>
                  Sản phẩm {category.name.toLocaleLowerCase('vi-VN')}
                </Text>
                <Text style={styles.resultCount}>{results.length} sản phẩm</Text>
              </View>
              <Pressable
                style={[styles.filterButton, filterCount > 0 && styles.filterActive]}
                onPress={() => {
                  setDraftFilters({ ...filters, brands: [...filters.brands] });
                  setSheetOpen(true);
                }}
                accessibilityRole="button"
                accessibilityLabel={`Lọc sản phẩm${filterCount ? `, ${filterCount} bộ lọc đang dùng` : ''}`}
              >
                <Feather name="sliders" size={16} color={theme.colors.primary} />
                <Text style={styles.filterText}>Lọc{filterCount ? ` (${filterCount})` : ''}</Text>
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sortRow}
            >
              {sortModes.map((mode) => (
                <Pressable
                  key={mode.id}
                  style={[styles.sortChip, sort === mode.id && styles.sortActive]}
                  onPress={() => setSort(mode.id)}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: sort === mode.id }}
                >
                  <Text style={[styles.sortText, sort === mode.id && styles.sortTextActive]}>
                    {mode.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        }
      />
      <FilterSheet
        visible={sheetOpen}
        value={draftFilters}
        brands={brands}
        onChange={setDraftFilters}
        onClose={() => setSheetOpen(false)}
        onApply={() => {
          setFilters(draftFilters);
          setSheetOpen(false);
        }}
      />
    </Screen>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    empty: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      padding: theme.spacing.xl,
    },
    listHeader: { paddingTop: theme.spacing.lg, paddingBottom: theme.spacing.lg },
    search: {
      minHeight: theme.layout.touchTarget,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.background,
    },
    searchText: { ...theme.typography.body, color: theme.colors.muted },
    toolbar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: theme.spacing.xxl,
      marginBottom: theme.spacing.lg,
    },
    resultTitle: { ...theme.typography.heading, color: theme.colors.text },
    resultCount: { ...theme.typography.caption, color: theme.colors.textSecondary },
    filterButton: {
      minHeight: 40,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.radius.pill,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    filterActive: { borderColor: theme.colors.primary, backgroundColor: theme.colors.primarySoft },
    filterText: { ...theme.typography.label, color: theme.colors.primary },
    sortRow: { gap: theme.spacing.sm },
    sortChip: {
      minHeight: 36,
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.background,
    },
    sortActive: { backgroundColor: theme.colors.primarySoft },
    sortText: { ...theme.typography.caption, color: theme.colors.textSecondary },
    sortTextActive: { color: theme.colors.primary, fontFamily: theme.fonts.semibold },
  });
