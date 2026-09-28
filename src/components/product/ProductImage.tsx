import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';

interface Props {
  uri?: string;
  label: string;
}

export function ProductImage({ uri, label }: Props) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      {uri ? (
        <Image
          source={{ uri }}
          style={styles.image}
          contentFit="contain"
          accessibilityLabel={label}
        />
      ) : (
        <Feather name="package" size={44} color={theme.colors.muted} />
      )}
    </View>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: { width: '100%', height: '100%' },
  });
