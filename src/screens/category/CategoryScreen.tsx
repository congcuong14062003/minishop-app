import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Screen } from '@/components/common/Screen';
import { PageHeader } from '@/components/common/PageHeader';
import { categories } from '@/data/categories';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';

export default function CategoryScreen() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Screen>
      <PageHeader title="Danh mục" back={false} />
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.search} onPress={() => router.push('/search')}>
          <Feather name="search" size={18} color={theme.colors.muted} />
          <Text style={styles.searchText}>Tìm kiếm sản phẩm...</Text>
        </Pressable>
        <Text style={styles.intro}>Khám phá theo danh mục</Text>
        <View style={styles.grid}>
          {categories.map((category) => (
            <Pressable
              key={category.id}
              style={styles.item}
              onPress={() =>
                router.push({ pathname: '/category/[id]', params: { id: category.id } })
              }
              accessibilityRole="button"
              accessibilityLabel={`${category.name}, ${category.productCount} sản phẩm`}
            >
              <View style={styles.icon}>
                <Feather name={category.icon} size={28} color={theme.colors.primary} />
              </View>
              <Text style={styles.name} numberOfLines={2}>
                {category.name}
              </Text>
              <Text style={styles.count}>{category.productCount} sản phẩm</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    content: {
      padding: theme.layout.pageGutter,
      paddingBottom: theme.spacing.huge,
    },
    search: {
      minHeight: theme.layout.touchTarget,
      paddingHorizontal: theme.spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.background,
    },
    searchText: { ...theme.typography.body, color: theme.colors.muted },
    intro: {
      ...theme.typography.heading,
      color: theme.colors.text,
      marginTop: theme.spacing.xxl,
      marginBottom: theme.spacing.lg,
    },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.md },
    item: {
      width: '47%',
      minHeight: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.md,
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    icon: {
      width: 64,
      height: 64,
      borderRadius: theme.radius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primarySoft,
      marginBottom: theme.spacing.sm,
    },
    name: { ...theme.typography.label, color: theme.colors.text, textAlign: 'center' },
    count: { ...theme.typography.caption, color: theme.colors.textSecondary },
  });
