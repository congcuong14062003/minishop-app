import { useEffect, useMemo } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { motion } from '@/constants/motion';
// 1. Bỏ import theme cố định.
// Thêm useMemo vào import React đang có, tránh import trùng.
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
export function Skeleton({ style }: { style?: StyleProp<ViewStyle> }) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const opacity = useSharedValue(1);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (!reducedMotion)
      opacity.value = withRepeat(withTiming(0.45, { duration: motion.slow }), -1, true);
    return () => cancelAnimation(opacity);
  }, [opacity, reducedMotion]);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  return <Animated.View accessible={false} style={[styles.base, style, animatedStyle]} />;
}
const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    base: { height: 14, backgroundColor: theme.colors.skeleton, borderRadius: theme.radius.sm },
  });
