import { useEffect } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { theme } from '@/theme';
import { motion } from '@/constants/motion';

export function Skeleton({ style }: { style?: StyleProp<ViewStyle> }) {
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
const styles = StyleSheet.create({
  base: { height: 14, backgroundColor: theme.colors.skeleton, borderRadius: theme.radius.sm },
});
