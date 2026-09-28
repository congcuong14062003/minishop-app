import { useThemeStore } from '@/store/useThemeStore';
import { useColorScheme } from 'react-native';
import { theme as lightTheme, darkTheme } from '@/theme';
export type AppTheme = typeof lightTheme | typeof darkTheme;

export function useAppTheme() {
  const mode = useThemeStore((state) => state.mode);
  const systemScheme = useColorScheme();

  const resolvedMode = mode === 'system' ? (systemScheme ?? 'light') : mode;

  const isDark = resolvedMode === 'dark';

  return {
    theme: isDark ? darkTheme : lightTheme,
    mode,
    resolvedMode,
    isDark,
  };
}
