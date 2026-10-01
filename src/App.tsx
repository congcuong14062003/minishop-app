import { StyleSheet, Text } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as NativeSplash from 'expo-splash-screen';
import {
  useFonts,
  BeVietnamPro_400Regular,
  BeVietnamPro_500Medium,
  BeVietnamPro_600SemiBold,
  BeVietnamPro_700Bold,
} from '@expo-google-fonts/be-vietnam-pro';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SplashScreen } from '@/screens/SplashScreen';
import { motion } from '@/constants/motion';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { useThemeStore } from '@/store/useThemeStore';
import { useShopStore } from '@/store/useShopStore';
import { restoreSession } from '@/services/auth';
import { useEffect, useMemo, useState } from 'react';
void NativeSplash.preventAutoHideAsync().catch(() => undefined);

export default function App() {
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [themeReady, setThemeReady] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    let active = true;

    async function restoreTheme() {
      try {
        await useThemeStore.persist.rehydrate();
      } catch (error) {
        console.warn('Không thể đọc lựa chọn giao diện:', error);
      } finally {
        if (active) setThemeReady(true);
      }
    }

    void restoreTheme();

    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    let active = true;
    void restoreSession()
      .then((user) => {
        if (active && user) useShopStore.getState().signIn(user);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setAuthReady(true);
      });
    return () => {
      active = false;
    };
  }, []);
  const [fontsLoaded, fontError] = useFonts({
    BeVietnamPro_400Regular,
    BeVietnamPro_500Medium,
    BeVietnamPro_600SemiBold,
    BeVietnamPro_700Bold,
  });
  const [introFinished, setIntroFinished] = useState(false);
  useEffect(() => {
    // Chờ cả font và lựa chọn theme.
    if ((!fontsLoaded && !fontError) || !themeReady || !authReady) return;

    void NativeSplash.hideAsync().catch(() => undefined);

    const timer = setTimeout(() => setIntroFinished(true), motion.splash);

    return () => clearTimeout(timer);
  }, [fontsLoaded, fontError, themeReady, authReady]);
  if ((!fontsLoaded && !fontError) || !themeReady || !authReady) {
    return null;
  }
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        {fontError ? (
          <Text style={{ color: theme.colors.text }}>
            Không thể tải phông chữ. Vui lòng mở lại MiniShop.
          </Text>
        ) : !introFinished ? (
          <SplashScreen />
        ) : (
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: theme.colors.background },
              animation: 'fade',
            }}
          >
            <Stack.Screen name="(tabs)" />
          </Stack>
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    error: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.xxl,
      backgroundColor: theme.colors.background,
    },
  });
