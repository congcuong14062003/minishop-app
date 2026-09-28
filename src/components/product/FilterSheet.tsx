import { useMemo, type Dispatch, type SetStateAction } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { emptyFilters, priceRanges, type ProductFilters } from '@/utils/catalog';

interface Props {
  visible: boolean;
  value: ProductFilters;
  brands: readonly string[];
  onChange: Dispatch<SetStateAction<ProductFilters>>;
  onApply: () => void;
  onClose: () => void;
}

export function FilterSheet({
  visible,
  value: draft,
  brands,
  onChange: setDraft,
  onApply,
  onClose,
}: Props) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();

  const toggleBrand = (brand: string) => {
    setDraft((current) => ({
      ...current,
      brands: current.brands.includes(brand)
        ? current.brands.filter((item) => item !== brand)
        : [...current.brands, brand],
    }));
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Đóng bộ lọc" />
        <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, theme.spacing.lg) }]}>
          <View style={styles.handle} />
          <View style={styles.headingRow}>
            <Text style={styles.heading}>Lọc sản phẩm</Text>
            <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Đóng">
              <Feather name="x" size={22} color={theme.colors.text} />
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Khoảng giá</Text>
            <View style={styles.options}>
              {priceRanges.map((range) => {
                const selected = draft.priceRange === range.id;
                return (
                  <Pressable
                    key={range.id}
                    style={[styles.chip, selected && styles.selectedChip]}
                    onPress={() => setDraft((current) => ({ ...current, priceRange: range.id }))}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: selected }}
                  >
                    <Text style={[styles.chipText, selected && styles.selectedText]}>
                      {range.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.sectionTitle}>Đánh giá</Text>
            <View style={styles.options}>
              {[0, 4, 4.5].map((rating) => {
                const selected = draft.minRating === rating;
                return (
                  <Pressable
                    key={rating}
                    style={[styles.chip, selected && styles.selectedChip]}
                    onPress={() => setDraft((current) => ({ ...current, minRating: rating }))}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: selected }}
                  >
                    <Text style={[styles.chipText, selected && styles.selectedText]}>
                      {rating === 0 ? 'Tất cả' : `★ ${rating}+`}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.sectionTitle}>Thương hiệu</Text>
            <View style={styles.options}>
              {brands.map((brand) => {
                const selected = draft.brands.includes(brand);
                return (
                  <Pressable
                    key={brand}
                    style={[styles.chip, selected && styles.selectedChip]}
                    onPress={() => toggleBrand(brand)}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: selected }}
                  >
                    <Text style={[styles.chipText, selected && styles.selectedText]}>{brand}</Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Pressable style={styles.reset} onPress={() => setDraft(emptyFilters())}>
              <Text style={styles.resetText}>Đặt lại</Text>
            </Pressable>
            <Pressable style={styles.apply} onPress={onApply}>
              <Text style={styles.applyText}>Áp dụng</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: theme.colors.scrim },
    backdrop: { flex: 1 },
    sheet: {
      maxHeight: '84%',
      paddingHorizontal: theme.layout.pageGutter,
      paddingTop: theme.spacing.sm,
      borderTopLeftRadius: theme.radius.lg,
      borderTopRightRadius: theme.radius.lg,
      backgroundColor: theme.colors.surface,
    },
    handle: {
      width: 38,
      height: 4,
      alignSelf: 'center',
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.border,
      marginBottom: theme.spacing.lg,
    },
    headingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.md,
    },
    heading: { ...theme.typography.heading, color: theme.colors.text },
    sectionTitle: {
      ...theme.typography.label,
      color: theme.colors.text,
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.md,
    },
    options: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm },
    chip: {
      paddingHorizontal: theme.spacing.md,
      minHeight: 38,
      justifyContent: 'center',
      borderRadius: theme.radius.pill,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    selectedChip: { borderColor: theme.colors.primary, backgroundColor: theme.colors.primarySoft },
    chipText: { ...theme.typography.caption, color: theme.colors.textSecondary },
    selectedText: { color: theme.colors.primary, fontFamily: theme.fonts.semibold },
    footer: {
      flexDirection: 'row',
      gap: theme.spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingTop: theme.spacing.lg,
      marginTop: theme.spacing.lg,
    },
    reset: {
      flex: 1,
      minHeight: theme.layout.touchTarget,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    resetText: { ...theme.typography.label, color: theme.colors.text },
    apply: {
      flex: 2,
      minHeight: theme.layout.touchTarget,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.primary,
    },
    applyText: { ...theme.typography.label, color: theme.colors.onPrimary },
  });
