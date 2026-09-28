export function getAddressCity(detail?: string) {
  return detail?.split(',').at(-1)?.trim() || 'Chưa chọn địa chỉ';
}
