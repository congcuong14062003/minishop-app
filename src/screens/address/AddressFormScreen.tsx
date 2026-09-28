import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { FormField } from '@/components/common/FormField';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';
import { useAppTheme, type AppTheme } from '@/hooks/useAppTheme';
import { useShopStore } from '@/store/useShopStore';

export default function AddressFormScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const addresses = useShopStore((state) => state.addresses);
  const saveAddress = useShopStore((state) => state.saveAddress);
  const existing = addresses.find((entry) => entry.id === id);
  const [name, setName] = useState(existing?.name ?? '');
  const [phone, setPhone] = useState(existing?.phone ?? '');
  const [detail, setDetail] = useState(existing?.detail ?? '');
  const [isDefault, setIsDefault] = useState(existing?.isDefault ?? addresses.length === 0);
  const [submitted, setSubmitted] = useState(false);
  const nameError = !name.trim() ? 'Vui lòng nhập tên người nhận.' : undefined;
  const phoneError = !/^\d{10,11}$/.test(phone.trim())
    ? 'Số điện thoại cần có 10–11 chữ số.'
    : undefined;
  const detailError = !detail.trim() ? 'Vui lòng nhập địa chỉ chi tiết.' : undefined;

  const submit = () => {
    setSubmitted(true);
    if (nameError || phoneError || detailError) return;
    saveAddress({
      id: existing?.id ?? `address-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      detail: detail.trim(),
      isDefault,
    });
    router.back();
  };

  return (
    <Screen>
      <PageHeader title={existing ? 'Sửa địa chỉ' : 'Thêm địa chỉ'} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Thông tin người nhận</Text>
        <FormField
          label="Họ và tên"
          value={name}
          onChangeText={setName}
          placeholder="Nguyễn Văn A"
          autoCapitalize="words"
          error={submitted ? nameError : undefined}
        />
        <FormField
          label="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          placeholder="0123456789"
          keyboardType="phone-pad"
          error={submitted ? phoneError : undefined}
        />
        <FormField
          label="Địa chỉ chi tiết"
          value={detail}
          onChangeText={setDetail}
          placeholder="Số nhà, đường, quận/huyện, tỉnh/thành"
          multiline
          error={submitted ? detailError : undefined}
        />
        <Pressable
          style={styles.defaultRow}
          onPress={() => setIsDefault((value) => !value)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: isDefault }}
        >
          <Feather
            name={isDefault ? 'check-square' : 'square'}
            size={20}
            color={isDefault ? theme.colors.primary : theme.colors.muted}
          />
          <Text style={styles.label}>Đặt làm địa chỉ mặc định</Text>
        </Pressable>
        <Pressable style={styles.submit} onPress={submit} accessibilityRole="button">
          <Text style={styles.submitText}>Lưu địa chỉ</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    content: {
      padding: theme.layout.pageGutter,
      paddingBottom: theme.spacing.huge,
      gap: theme.spacing.lg,
      backgroundColor: theme.colors.surface,
    },
    heading: { ...theme.typography.heading, color: theme.colors.text },
    defaultRow: {
      minHeight: theme.layout.touchTarget,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
    },
    label: { ...theme.typography.body, color: theme.colors.text },
    submit: {
      minHeight: theme.layout.touchTarget,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: theme.spacing.lg,
    },
    submitText: { ...theme.typography.label, color: theme.colors.onPrimary },
  });
