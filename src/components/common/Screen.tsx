import { useMemo, type PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';

export function Screen({ children }: PropsWithChildren) {
  // Lấy theme tương ứng với lựa chọn Sáng / Tối / Theo hệ thống.
  const { theme } = useAppTheme();

  // Khi theme đổi, tạo lại styles bằng màu của theme mới.
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safe}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

// Nhận một theme rồi tạo styles từ theme đó.
const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    content: {
      flex: 1,
      width: '100%',
      maxWidth: theme.layout.contentMaxWidth,
      alignSelf: 'center',
    },
  });
