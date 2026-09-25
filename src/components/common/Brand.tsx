import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from '@/theme';

export function Brand({ large = false }: { large?: boolean }) {
  return (
    <View style={styles.row} accessibilityLabel="MiniShop">
      <View style={[styles.mark, large && styles.largeMark]}>
        <Feather name="shopping-bag" size={large ? 32 : 20} color={theme.colors.onPrimary} />
      </View>
      <Text style={[styles.word, large && theme.typography.display]}>
        mini<Text style={styles.accent}>shop</Text>
        <Text style={styles.dot}>.</Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
  mark: {
    width: 34,
    height: 38,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeMark: { width: 56, height: 62, borderRadius: theme.radius.lg },
  word: { ...theme.typography.title, color: theme.colors.text, letterSpacing: -1.2 },
  accent: { color: theme.colors.primary },
  dot: { color: theme.colors.text },
});
