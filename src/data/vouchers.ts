export interface Voucher {
  id: string;
  code: string;
  title: string;
  description: string;
  minimum: number;
  discount: number;
}

export const vouchers: readonly Voucher[] = [
  {
    id: 'mini50',
    code: 'MINI50',
    title: 'Giảm 50.000 ₫',
    description: 'Cho đơn hàng từ 500.000 ₫',
    minimum: 500_000,
    discount: 50_000,
  },
  {
    id: 'mini100',
    code: 'MINI100',
    title: 'Giảm 100.000 ₫',
    description: 'Cho đơn hàng từ 2.000.000 ₫',
    minimum: 2_000_000,
    discount: 100_000,
  },
  {
    id: 'mini200',
    code: 'MINI200',
    title: 'Giảm 200.000 ₫',
    description: 'Cho đơn hàng từ 10.000.000 ₫',
    minimum: 10_000_000,
    discount: 200_000,
  },
];

export function getVoucherDiscount(voucherId: string | null, subtotal: number) {
  const voucher = vouchers.find((item) => item.id === voucherId);
  return voucher && subtotal >= voucher.minimum ? Math.min(voucher.discount, subtotal) : 0;
}
