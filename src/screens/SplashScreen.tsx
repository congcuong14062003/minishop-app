import { StyleSheet, Text } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn } from 'react-native-reanimated';
import { Brand } from '@/components/common/Brand';
import { theme } from '@/theme';
import { motion } from '@/constants/motion';

export function SplashScreen() {
  return (
    <Animated.View style={styles.screen} exiting={FadeOut.duration(motion.normal)}>
      <Animated.View entering={ZoomIn.duration(motion.slow)}>
        <Brand large />
      </Animated.View>
      <Animated.Text
        entering={FadeIn.delay(motion.fast).duration(motion.slow)}
        style={styles.tagline}
      >
        Nhỏ xinh mỗi ngày.
      </Animated.Text>
      <Text style={styles.footer}>CHÀO MỪNG ĐẾN VỚI MINISHOP</Text>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.lg,
  },
  tagline: { ...theme.typography.body, color: theme.colors.textSecondary },
  footer: {
    position: 'absolute',
    bottom: theme.spacing.huge,
    ...theme.typography.eyebrow,
    color: theme.colors.muted,
  },
});
