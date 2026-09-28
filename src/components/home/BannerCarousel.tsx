import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import type { Banner } from '@/types';

interface Props {
  banners: readonly Banner[];
}

const AUTO_ADVANCE_MS = 4500;

export function BannerCarousel({ banners }: Props) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { width: windowWidth } = useWindowDimensions();
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const activeIndexRef = useRef(0);
  const scrollRef = useRef<ScrollView>(null);
  const slideWidth =
    measuredWidth ||
    Math.max(1, Math.min(windowWidth, theme.layout.contentMaxWidth) - 2 * theme.layout.pageGutter);

  const goTo = useCallback(
    (index: number) => {
      activeIndexRef.current = index;
      setActiveIndex(index);
      scrollRef.current?.scrollTo({ x: index * slideWidth, animated: true });
    },
    [slideWidth],
  );

  useFocusEffect(
    useCallback(() => {
      if (banners.length < 2 || isDragging) return;

      const timer = setInterval(() => {
        goTo((activeIndex + 1) % banners.length);
      }, AUTO_ADVANCE_MS);

      return () => clearInterval(timer);
    }, [activeIndex, banners.length, goTo, isDragging]),
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({ x: activeIndexRef.current * slideWidth, animated: false });
  }, [slideWidth]);

  if (banners.length === 0) return null;

  const backgrounds = [
    theme.colors.cream,
    theme.colors.lavender,
    theme.colors.sage,
    theme.colors.blue,
  ];

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
    const nextIndex = Math.max(0, Math.min(index, banners.length - 1));
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    setIsDragging(false);
  };

  return (
    <View onLayout={(event) => setMeasuredWidth(event.nativeEvent.layout.width)}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={() => setIsDragging(true)}
        onScrollEndDrag={() => setIsDragging(false)}
        onMomentumScrollEnd={handleScrollEnd}
      >
        {banners.map((banner, index) => {
          const icon =
            banner.category === 'fashion'
              ? 'shopping-bag'
              : banner.category === 'accessories'
                ? 'headphones'
                : 'home';

          return (
            <View key={banner.id} style={{ width: slideWidth }}>
              <View
                style={[styles.card, { backgroundColor: backgrounds[index % backgrounds.length] }]}
              >
                <View style={styles.copy}>
                  <Text style={styles.eyebrow}>{banner.eyebrow}</Text>
                  <Text style={styles.title} numberOfLines={3}>
                    {banner.title}
                  </Text>
                  <Text style={styles.description} numberOfLines={2}>
                    {banner.description}
                  </Text>
                </View>
                <View style={styles.decoration} pointerEvents="none">
                  <Feather name={icon} size={66} color={theme.colors.onPrimary} />
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {banners.length > 1 && (
        <View style={styles.pagination}>
          {banners.map((banner, index) => (
            <Pressable
              key={banner.id}
              onPress={() => goTo(index)}
              style={styles.dotTouchTarget}
              accessibilityRole="button"
              accessibilityLabel={`Xem banner ${index + 1}: ${banner.eyebrow}`}
              accessibilityState={{ selected: activeIndex === index }}
            >
              <View style={[styles.dot, activeIndex === index && styles.activeDot]} />
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      height: 228,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.xl,
      overflow: 'hidden',
      justifyContent: 'center',
    },
    copy: { zIndex: 1, width: '84%' },
    eyebrow: {
      ...theme.typography.eyebrow,
      color: theme.colors.primary,
      marginBottom: theme.spacing.sm,
    },
    title: {
      ...theme.typography.title,
      fontSize: 21,
      lineHeight: 29,
      color: theme.colors.text,
    },
    description: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.sm,
    },
    decoration: {
      position: 'absolute',
      right: -22,
      bottom: -24,
      width: 122,
      height: 150,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.primary,
      transform: [{ rotate: '-14deg' }],
      alignItems: 'center',
      justifyContent: 'center',
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme.spacing.sm,
    },
    dotTouchTarget: {
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.border,
    },
    activeDot: {
      width: 16,
      backgroundColor: theme.colors.primary,
    },
  });
