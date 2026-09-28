import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { ProductImage } from './ProductImage';

interface Props {
  images: readonly string[];
  name: string;
  favorite: boolean;
  onFavorite: () => void;
}

export function ProductGallery({ images, name, favorite, onFavorite }: Props) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { width: windowWidth } = useWindowDimensions();
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const width = measuredWidth || Math.min(windowWidth, theme.layout.contentMaxWidth);
  const galleryImages = images.length ? images : [undefined];

  const onEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  };

  return (
    <View
      style={styles.gallery}
      onLayout={(event) => setMeasuredWidth(event.nativeEvent.layout.width)}
    >
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onEnd}
      >
        {galleryImages.map((uri, imageIndex) => (
          <View key={`${uri ?? 'empty'}-${imageIndex}`} style={{ width, height: 320 }}>
            <ProductImage uri={uri} label={`${name}, ảnh ${imageIndex + 1}`} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.actions}>
        <Pressable
          style={styles.roundButton}
          onPress={onFavorite}
          accessibilityLabel={favorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
        >
          <Feather
            name="heart"
            size={20}
            color={favorite ? theme.colors.primary : theme.colors.text}
          />
        </Pressable>
        <Pressable
          style={styles.roundButton}
          onPress={() => void Share.share({ message: `Xem sản phẩm ${name} trên MiniShop` })}
          accessibilityLabel="Chia sẻ sản phẩm"
        >
          <Feather name="share-2" size={20} color={theme.colors.text} />
        </Pressable>
      </View>
      <View style={styles.pageBadge}>
        <Text style={styles.pageText}>
          {index + 1}/{galleryImages.length}
        </Text>
      </View>
      {galleryImages.length > 1 && (
        <View style={styles.dots}>
          {galleryImages.map((_, dotIndex) => (
            <View key={dotIndex} style={[styles.dot, index === dotIndex && styles.activeDot]} />
          ))}
        </View>
      )}
    </View>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    gallery: { position: 'relative', backgroundColor: theme.colors.background },
    actions: {
      position: 'absolute',
      right: theme.spacing.lg,
      top: theme.spacing.lg,
      flexDirection: 'row',
      gap: theme.spacing.sm,
    },
    roundButton: {
      width: 40,
      height: 40,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.subtle,
    },
    pageBadge: {
      position: 'absolute',
      right: theme.spacing.lg,
      bottom: theme.spacing.lg,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.surface,
    },
    pageText: { ...theme.typography.caption, color: theme.colors.text },
    dots: {
      position: 'absolute',
      bottom: theme.spacing.lg,
      alignSelf: 'center',
      flexDirection: 'row',
      gap: theme.spacing.xs,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.muted,
    },
    activeDot: { width: 16, backgroundColor: theme.colors.primary },
  });
