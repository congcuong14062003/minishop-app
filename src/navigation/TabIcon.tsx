import { useEffect, type ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { motion } from '@/constants/motion';
// 1. Bỏ import theme cố định.
// Thêm useMemo vào import React đang có, tránh import trùng.
import { useMemo } from 'react';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
export function TabIcon({
  name,
  focused,
  count = 0,
}: {
  name: ComponentProps<typeof Feather>['name'];
  focused: boolean;
  count?: number;
}) {
  const scale = useSharedValue(1);
  const badgeScale = useSharedValue(1);
  useEffect(() => {
    scale.value = withTiming(focused ? 1.08 : 1, { duration: motion.fast });
  }, [focused, scale]);
  useEffect(() => {
    if (count > 0)
      badgeScale.value = withSequence(
        withTiming(1.2, { duration: motion.fast }),
        withTiming(1, { duration: motion.fast }),
      );
  }, [badgeScale, count]);
  const iconStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const badgeStyle = useAnimatedStyle(() => ({ transform: [{ scale: badgeScale.value }] }));

  // 2. Thêm bên trong hàm component, trước return.
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View>
      <Animated.View style={[styles.icon, focused && styles.active, iconStyle]}>
        <Feather
          name={name}
          size={21}
          color={focused ? theme.colors.primary : theme.colors.textSecondary}
        />
      </Animated.View>
      {count > 0 && (
        <Animated.View style={[styles.badge, badgeStyle]}>
          <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
        </Animated.View>
      )}
    </View>
  );
}
const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    icon: {
      width: 48,
      height: 30,
      borderRadius: theme.radius.pill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    active: { backgroundColor: theme.colors.primarySoft },
    badge: {
      position: 'absolute',
      right: 0,
      top: -3,
      minWidth: 18,
      height: 18,
      paddingHorizontal: theme.spacing.xs,
      borderRadius: theme.radius.pill,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
      borderWidth: 2,
      borderColor: theme.colors.surface,
    },
    badgeText: { fontFamily: theme.fonts.semibold, fontSize: 9, color: theme.colors.onPrimary },
  });
