import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';
import { ProductGrid } from '@/components/product/ProductGrid';
import { products } from '@/data/products';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { emptyFilters, selectProducts } from '@/utils/catalog';

const initialRecent = ['Tai nghe bluetooth', 'iPhone', 'Nike'];
const popular = ['Sony', 'MacBook', 'Giày Nike', 'AirPods'];

export default function SearchScreen() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [recent, setRecent] = useState(initialRecent);
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return selectProducts(products, emptyFilters(), 'popular', query).slice(0, 5);
  }, [query]);
  const results = useMemo(
    () => (submitted ? selectProducts(products, emptyFilters(), 'popular', query) : []),
    [query, submitted],
  );

  const search = (text = query) => {
    const term = text.trim();
    if (!term) return;
    setQuery(term);
    setSubmitted(true);
    setRecent((items) => [term, ...items.filter((item) => item !== term)].slice(0, 6));
  };

  return (
    <Screen>
      <PageHeader title="Tìm kiếm" />
      <View style={styles.searchBox}>
        <Feather name="search" size={20} color={theme.colors.muted} />
        <TextInput
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            setSubmitted(false);
          }}
          onSubmitEditing={() => search()}
          placeholder="Tìm kiếm sản phẩm..."
          placeholderTextColor={theme.colors.muted}
          returnKeyType="search"
          style={styles.input}
          autoFocus
        />
        {!!query && (
          <Pressable
            onPress={() => {
              setQuery('');
              setSubmitted(false);
            }}
            accessibilityLabel="Xóa tìm kiếm"
          >
            <Feather name="x" size={18} color={theme.colors.textSecondary} />
          </Pressable>
        )}
      </View>

      {submitted ? (
        <ProductGrid
          products={results}
          emptyMessage="Không tìm thấy sản phẩm"
          header={
            <Text style={styles.resultCount}>
              {results.length} kết quả cho “{query}”
            </Text>
          }
        />
      ) : (
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {query.trim() ? (
            <>
              <Text style={styles.heading}>Gợi ý sản phẩm</Text>
              {suggestions.map((product) => (
                <Pressable
                  key={product.id}
                  style={styles.suggestion}
                  onPress={() => search(product.name)}
                >
                  <Feather name="search" size={16} color={theme.colors.muted} />
                  <Text style={styles.suggestionText} numberOfLines={1}>
                    {product.name}
                  </Text>
                </Pressable>
              ))}
              {suggestions.length === 0 && (
                <Text style={styles.muted}>Nhấn tìm kiếm để xem kết quả.</Text>
              )}
            </>
          ) : (
            <>
              <Text style={styles.heading}>Tìm kiếm gần đây</Text>
              <View style={styles.chips}>
                {recent.map((term) => (
                  <Pressable key={term} style={styles.chip} onPress={() => search(term)}>
                    <Text style={styles.chipText}>{term}</Text>
                  </Pressable>
                ))}
              </View>
              <Text style={styles.heading}>Tìm kiếm phổ biến</Text>
              <View style={styles.chips}>
                {popular.map((term) => (
                  <Pressable key={term} style={styles.chip} onPress={() => search(term)}>
                    <Text style={styles.chipText}>{term}</Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}
        </ScrollView>
      )}
    </Screen>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    searchBox: {
      minHeight: theme.layout.touchTarget,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      margin: theme.layout.pageGutter,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.background,
    },
    input: { ...theme.typography.body, color: theme.colors.text, flex: 1, paddingVertical: 0 },
    content: { paddingHorizontal: theme.layout.pageGutter, paddingBottom: theme.spacing.huge },
    heading: {
      ...theme.typography.heading,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
      marginTop: theme.spacing.lg,
    },
    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm },
    chip: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.background,
    },
    chipText: { ...theme.typography.caption, color: theme.colors.text },
    suggestion: {
      minHeight: theme.layout.touchTarget,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    suggestionText: { ...theme.typography.body, color: theme.colors.text, flex: 1 },
    muted: { ...theme.typography.body, color: theme.colors.textSecondary },
    resultCount: {
      ...theme.typography.label,
      color: theme.colors.text,
      paddingVertical: theme.spacing.lg,
    },
  });
