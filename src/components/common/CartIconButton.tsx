import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCartCount } from '@/hooks/useCartCount';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';

interface Props {
  placement?: 'header' | 'bottom';
}

export function CartIconButton({ placement = 'header' }: Props) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const count = useCartCount();

  return (
    <Pressable
      onPress={() => router.push('/cart-view')}
      style={({ pressed }) => [
        styles.button,
        placement === 'bottom' && styles.bottomButton,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Mở giỏ hàng, ${count} sản phẩm`}
    >
      <Feather
        name="shopping-cart"
        size={22}
        color={placement === 'bottom' ? theme.colors.primary : theme.colors.text}
      />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText} maxFontSizeMultiplier={1.2}>
            {count > 99 ? '99+' : count}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    button: {
      width: theme.layout.touchTarget,
      height: theme.layout.touchTarget,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottomButton: { backgroundColor: theme.colors.primarySoft },
    pressed: { opacity: 0.72 },
    badge: {
      position: 'absolute',
      top: -3,
      right: -3,
      minWidth: 20,
      height: 20,
      paddingHorizontal: 2,
      borderRadius: theme.radius.pill,
      borderWidth: 2,
      borderColor: theme.colors.surface,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeText: {
      fontFamily: theme.fonts.semibold,
      fontSize: 10,
      lineHeight: 13,
      includeFontPadding: false,
      textAlign: 'center',
      color: theme.colors.onPrimary,
    },
  });
