import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { EmptyState } from '@/components/common/EmptyState';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { useShopStore } from '@/store/useShopStore';

export default function AddressesScreen() {
  const { from } = useLocalSearchParams<{ from?: string }>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const addresses = useShopStore((state) => state.addresses);
  const selectedId = useShopStore((state) => state.selectedAddressId);
  const selectAddress = useShopStore((state) => state.selectAddress);
  const setDefaultAddress = useShopStore((state) => state.setDefaultAddress);
  const removeAddress = useShopStore((state) => state.removeAddress);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <Screen>
      <PageHeader title="Địa chỉ của tôi" />
      {addresses.length ? (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.hint}>
            {from === 'checkout' ? 'Chọn địa chỉ nhận đơn hàng' : 'Quản lý địa chỉ nhận hàng'}
          </Text>
          {addresses.map((address) => (
            <View key={address.id} style={styles.card}>
              <Pressable
                style={styles.selectArea}
                onPress={() => {
                  selectAddress(address.id);
                  if (from === 'checkout') router.back();
                }}
                accessibilityRole="radio"
                accessibilityState={{ checked: selectedId === address.id }}
              >
                <Feather
                  name={selectedId === address.id ? 'check-circle' : 'circle'}
                  size={20}
                  color={selectedId === address.id ? theme.colors.primary : theme.colors.muted}
                />
                <View style={styles.addressInfo}>
                  <View style={styles.nameRow}>
                    <Text style={styles.name}>{address.name}</Text>
                    {address.isDefault && <Text style={styles.defaultBadge}>Mặc định</Text>}
                  </View>
                  <Text style={styles.muted}>{address.phone}</Text>
                  <Text style={styles.detail}>{address.detail}</Text>
                </View>
              </Pressable>
              <View style={styles.actions}>
                {!address.isDefault && (
                  <Pressable onPress={() => setDefaultAddress(address.id)}>
                    <Text style={styles.action}>Đặt làm mặc định</Text>
                  </Pressable>
                )}
                <View style={styles.actionEnd}>
                  <Pressable
                    onPress={() =>
                      router.push({ pathname: '/address-form', params: { id: address.id } })
                    }
                  >
                    <Text style={styles.action}>Sửa</Text>
                  </Pressable>
                  <Pressable onPress={() => setDeleteId(address.id)}>
                    <Text style={styles.deleteText}>Xóa</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <EmptyState
          icon="map-pin"
          title="Chưa có địa chỉ"
          description="Thêm địa chỉ để hoàn tất đơn hàng nhanh hơn."
          actionLabel="Thêm địa chỉ"
          onAction={() => router.push('/address-form')}
        />
      )}
      {!!addresses.length && (
        <View style={styles.footer}>
          <Pressable style={styles.addButton} onPress={() => router.push('/address-form')}>
            <Feather name="plus" size={18} color={theme.colors.onPrimary} />
            <Text style={styles.addText}>Thêm địa chỉ mới</Text>
          </Pressable>
        </View>
      )}
      <Modal
        transparent
        visible={deleteId !== null}
        animationType="fade"
        onRequestClose={() => setDeleteId(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Xóa địa chỉ này?</Text>
            <Text style={styles.muted}>Bạn có thể thêm lại địa chỉ sau.</Text>
            <View style={styles.modalActions}>
              <Pressable style={styles.cancelButton} onPress={() => setDeleteId(null)}>
                <Text style={styles.name}>Hủy</Text>
              </Pressable>
              <Pressable
                style={styles.confirmButton}
                onPress={() => {
                  if (deleteId) removeAddress(deleteId);
                  setDeleteId(null);
                }}
              >
                <Text style={styles.addText}>Xóa</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    content: {
      backgroundColor: theme.colors.background,
      padding: theme.layout.pageGutter,
      paddingBottom: theme.spacing.huge,
      gap: theme.spacing.md,
    },
    hint: { ...theme.typography.caption, color: theme.colors.textSecondary },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: 'hidden',
    },
    selectArea: {
      flexDirection: 'row',
      gap: theme.spacing.md,
      padding: theme.spacing.lg,
    },
    addressInfo: { flex: 1, gap: theme.spacing.xs },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
      flexWrap: 'wrap',
    },
    name: { ...theme.typography.label, color: theme.colors.text },
    defaultBadge: {
      ...theme.typography.caption,
      color: theme.colors.primary,
      backgroundColor: theme.colors.primarySoft,
      paddingHorizontal: theme.spacing.sm,
      borderRadius: theme.radius.sm,
    },
    muted: { ...theme.typography.caption, color: theme.colors.textSecondary },
    detail: { ...theme.typography.body, color: theme.colors.text },
    actions: {
      minHeight: theme.layout.touchTarget,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingHorizontal: theme.spacing.lg,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    actionEnd: { marginLeft: 'auto', flexDirection: 'row', gap: theme.spacing.xl },
    action: { ...theme.typography.caption, color: theme.colors.primary },
    deleteText: { ...theme.typography.caption, color: theme.colors.error },
    footer: { padding: theme.spacing.lg, borderTopWidth: 1, borderTopColor: theme.colors.border },
    addButton: {
      minHeight: theme.layout.touchTarget,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: theme.spacing.sm,
    },
    addText: { ...theme.typography.label, color: theme.colors.onPrimary },
    modalBackdrop: {
      flex: 1,
      backgroundColor: theme.colors.scrim,
      justifyContent: 'center',
      padding: theme.spacing.xxl,
    },
    modalCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.xl,
      gap: theme.spacing.md,
    },
    modalTitle: { ...theme.typography.heading, color: theme.colors.text },
    modalActions: { flexDirection: 'row', gap: theme.spacing.sm, marginTop: theme.spacing.md },
    cancelButton: {
      flex: 1,
      minHeight: theme.layout.touchTarget,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    confirmButton: {
      flex: 1,
      minHeight: theme.layout.touchTarget,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.error,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
