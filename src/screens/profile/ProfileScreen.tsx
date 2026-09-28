import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { MenuRow } from '@/components/common/MenuRow';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { useShopStore } from '@/store/useShopStore';

export default function ProfileScreen() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const user = useShopStore((state) => state.user);
  const orderCount = useShopStore((state) => state.orders.length);
  const wishlistCount = useShopStore((state) => state.wishlist.length);
  const unreadCount = useShopStore(
    (state) => state.notifications.filter((item) => !item.read).length,
  );
  const signOut = useShopStore((state) => state.signOut);

  return (
    <Screen>
      <PageHeader title="Tài khoản" back={false} />
      <ScrollView contentContainerStyle={styles.content}>
        {user ? (
          <View style={styles.hero}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.name.trim().charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email || user.phone}</Text>
              <Text style={styles.member}>THÀNH VIÊN MINISHOP</Text>
            </View>
          </View>
        ) : (
          <View style={styles.guestHero}>
            <Text style={styles.name}>Chào mừng đến MiniShop</Text>
            <Text style={styles.email}>Đăng nhập để lưu thông tin mua sắm của bạn.</Text>
            <View style={styles.guestActions}>
              <Pressable style={styles.primaryButton} onPress={() => router.push('/login')}>
                <Text style={styles.primaryText}>Đăng nhập</Text>
              </Pressable>
              <Pressable style={styles.outlineButton} onPress={() => router.push('/register')}>
                <Text style={styles.outlineText}>Đăng ký</Text>
              </Pressable>
            </View>
          </View>
        )}

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{orderCount}</Text>
            <Text style={styles.statLabel}>Đơn hàng</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{wishlistCount}</Text>
            <Text style={styles.statLabel}>Yêu thích</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Đánh giá</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>MUA SẮM</Text>
        <View style={styles.menu}>
          <MenuRow icon="package" label="Đơn hàng của tôi" onPress={() => router.push('/orders')} />
          <MenuRow
            icon="heart"
            label="Sản phẩm yêu thích"
            onPress={() => router.push('/(tabs)/wishlist')}
          />
          <MenuRow icon="gift" label="Kho voucher" onPress={() => router.push('/vouchers')} />
          <MenuRow
            icon="map-pin"
            label="Địa chỉ nhận hàng"
            onPress={() => router.push('/addresses')}
          />
        </View>
        <Text style={styles.sectionLabel}>CÁ NHÂN</Text>
        <View style={styles.menu}>
          <MenuRow
            icon="star"
            label="Đánh giá của tôi"
            onPress={() => router.push('/my-reviews')}
          />
          <MenuRow
            icon="bell"
            label="Thông báo"
            value={unreadCount ? `${unreadCount} mới` : undefined}
            onPress={() => router.push('/notifications')}
          />
          <MenuRow icon="settings" label="Cài đặt" onPress={() => router.push('/settings')} />
          {user && <MenuRow icon="log-out" label="Đăng xuất" danger onPress={signOut} />}
        </View>
        <Text style={styles.footer}>MINISHOP · MUA SẮM MỖI NGÀY</Text>
      </ScrollView>
    </Screen>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    content: { paddingBottom: theme.spacing.huge, backgroundColor: theme.colors.background },
    hero: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.lg,
      padding: theme.layout.pageGutter,
      backgroundColor: theme.colors.surface,
    },
    avatar: {
      width: 66,
      height: 66,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: { ...theme.typography.title, color: theme.colors.primary },
    userInfo: { flex: 1, gap: theme.spacing.xs },
    name: { ...theme.typography.heading, color: theme.colors.text },
    email: { ...theme.typography.body, color: theme.colors.textSecondary },
    member: { ...theme.typography.eyebrow, color: theme.colors.primary },
    guestHero: {
      padding: theme.layout.pageGutter,
      gap: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
    },
    guestActions: { flexDirection: 'row', gap: theme.spacing.sm, marginTop: theme.spacing.md },
    primaryButton: {
      minHeight: theme.layout.touchTarget,
      paddingHorizontal: theme.spacing.xl,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
    },
    primaryText: { ...theme.typography.label, color: theme.colors.onPrimary },
    outlineButton: {
      minHeight: theme.layout.touchTarget,
      paddingHorizontal: theme.spacing.xl,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      justifyContent: 'center',
    },
    outlineText: { ...theme.typography.label, color: theme.colors.primary },
    stats: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: theme.layout.pageGutter,
      paddingVertical: theme.spacing.lg,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.surface,
    },
    stat: { flex: 1, alignItems: 'center', gap: theme.spacing.xs },
    statNumber: { ...theme.typography.heading, color: theme.colors.primary },
    statLabel: { ...theme.typography.caption, color: theme.colors.textSecondary },
    statDivider: { width: 1, height: 30, backgroundColor: theme.colors.border },
    sectionLabel: {
      ...theme.typography.eyebrow,
      color: theme.colors.muted,
      marginHorizontal: theme.layout.pageGutter,
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
    menu: {
      marginHorizontal: theme.layout.pageGutter,
      borderRadius: theme.radius.md,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    footer: {
      ...theme.typography.eyebrow,
      color: theme.colors.muted,
      textAlign: 'center',
      marginTop: theme.spacing.xxl,
    },
  });
