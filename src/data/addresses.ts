import type { Address } from '@/types';

export const initialAddresses: readonly Address[] = [
  {
    id: 'home',
    name: 'Nguyễn Văn A',
    phone: '0123456789',
    detail: '123 Nguyễn Trãi, Thanh Xuân, Hà Nội',
    isDefault: true,
  },
  {
    id: 'office',
    name: 'Nguyễn Văn A',
    phone: '0123456789',
    detail: '45 Lê Duẩn, Hải Châu, Đà Nẵng',
    isDefault: false,
  },
];
