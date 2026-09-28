import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { categories } from '@/data/categories';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';

export function CategorySection() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.heading}>Danh mục</Text>
        <Pressable style={styles.swipeHint} onPress={() => router.push('/(tabs)/categories')}>
          <Text style={styles.swipeHintText}>Xem tất cả</Text>
          <Feather name="arrow-right" size={15} color={theme.colors.primary} />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalViewport}
        contentContainerStyle={styles.list}
      >
        {categories.map((category) => (
          <Pressable
            key={category.id}
            style={styles.item}
            onPress={() => router.push({ pathname: '/category/[id]', params: { id: category.id } })}
          >
            <View style={styles.icon}>
              <Feather name={category.icon} size={26} color={theme.colors.primary} />
            </View>

            <Text style={styles.name} numberOfLines={2}>
              {category.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
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
    horizontalViewport: {
      marginRight: -theme.layout.pageGutter,
    },
    list: {
      gap: theme.spacing.md,
      paddingRight: theme.layout.pageGutter,
    },
    item: {
      width: 80,
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    icon: {
      width: 60,
      height: 60,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    name: {
      ...theme.typography.caption,
      color: theme.colors.text,
      textAlign: 'center',
    },
  });
