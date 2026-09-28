import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { EmptyState } from '@/components/common/EmptyState';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { useShopStore } from '@/store/useShopStore';
import type { ShopNotification } from '@/types';

const tabs: { id: ShopNotification['type'] | 'all'; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'order', label: 'Đơn hàng' },
  { id: 'promotion', label: 'Khuyến mãi' },
  { id: 'general', label: 'Thông báo' },
];

const icons: Record<ShopNotification['type'], React.ComponentProps<typeof Feather>['name']> = {
  order: 'package',
  promotion: 'tag',
  general: 'bell',
};

export default function NotificationsScreen() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const notifications = useShopStore((state) => state.notifications);
  const markRead = useShopStore((state) => state.markNotificationRead);
  const markAllRead = useShopStore((state) => state.markAllNotificationsRead);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['id']>('all');
  const visible = notifications.filter((item) => activeTab === 'all' || item.type === activeTab);
  const unreadCount = notifications.filter((item) => !item.read).length;

  const openNotification = (notification: ShopNotification) => {
    markRead(notification.id);
    if (notification.id.startsWith('order-')) {
      const id = notification.id.slice('order-'.length);
      router.push({ pathname: '/order/[id]', params: { id } });
    }
  };

  return (
    <Screen>
      <PageHeader
        title="Thông báo"
        right={
          unreadCount ? (
            <Pressable onPress={markAllRead} accessibilityRole="button">
              <Text style={styles.markAll}>Đã đọc tất cả</Text>
            </Pressable>
          ) : undefined
        }
      />
      <View style={styles.tabViewport}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
        >
          {tabs.map((tab) => (
            <Pressable
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      {visible.length ? (
        <ScrollView contentContainerStyle={styles.content}>
          {visible.map((notification) => (
            <Pressable
              key={notification.id}
              style={[styles.card, !notification.read && styles.unreadCard]}
              onPress={() => openNotification(notification)}
              accessibilityRole="button"
            >
              <View style={styles.iconBox}>
                <Feather name={icons[notification.type]} size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.cardBody}>
                <View style={styles.cardHeading}>
                  <Text style={styles.title}>{notification.title}</Text>
                  {!notification.read && <View style={styles.dot} />}
                </View>
                <Text style={styles.description}>{notification.description}</Text>
                <Text style={styles.date}>
                  {new Date(notification.createdAt).toLocaleDateString('vi-VN')}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <EmptyState
          icon="bell-off"
          title="Chưa có thông báo"
          description="Thông báo thuộc mục này sẽ xuất hiện ở đây."
        />
      )}
    </Screen>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    markAll: { ...theme.typography.caption, color: theme.colors.primary },
    tabViewport: { borderBottomWidth: 1, borderBottomColor: theme.colors.border },
    tabs: { paddingHorizontal: theme.layout.pageGutter, gap: theme.spacing.lg },
    tab: {
      minHeight: theme.layout.touchTarget,
      justifyContent: 'center',
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
      paddingHorizontal: theme.spacing.xs,
    },
    activeTab: { borderBottomColor: theme.colors.primary },
    tabText: { ...theme.typography.caption, color: theme.colors.textSecondary },
    activeTabText: { color: theme.colors.primary, fontFamily: theme.fonts.semibold },
    content: {
      padding: theme.layout.pageGutter,
      paddingBottom: theme.spacing.huge,
      backgroundColor: theme.colors.background,
      gap: theme.spacing.sm,
    },
    card: {
      flexDirection: 'row',
      gap: theme.spacing.md,
      padding: theme.spacing.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.surface,
    },
    unreadCard: { borderColor: theme.colors.primarySoft },
    iconBox: {
      width: 40,
      height: 40,
      borderRadius: theme.radius.pill,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primarySoft,
    },
    cardBody: { flex: 1, gap: theme.spacing.xs },
    cardHeading: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
    title: { ...theme.typography.label, color: theme.colors.text, flex: 1 },
    dot: {
      width: 7,
      height: 7,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.primary,
    },
    description: { ...theme.typography.body, color: theme.colors.textSecondary },
    date: { ...theme.typography.caption, color: theme.colors.muted },
  });
