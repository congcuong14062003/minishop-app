import type { Order } from '@/types';
import { initialAddresses } from './addresses';

const address = initialAddresses[0]!;

export const orders: readonly Order[] = [
  {
    id: 'MS202609250001',
    items: [
      {
        id: 'sample-iphone',
        productId: 'iphone-15-pro-max',
        quantity: 1,
        selected: true,
        variants: { 'Dung lượng': '256GB' },
      },
    ],
    total: 24_990_000,
    status: 'shipping',
    createdAt: '2026-09-25T09:30:00+07:00',
    address,
    paymentMethod: 'cod',
  },
  {
    id: 'MS202609180002',
    items: [
      {
        id: 'sample-sony',
        productId: 'sony-xm5',
        quantity: 1,
        selected: true,
        variants: { 'Màu sắc': 'Đen' },
      },
    ],
    total: 6_490_000,
    status: 'delivered',
    createdAt: '2026-09-18T14:20:00+07:00',
    address,
    paymentMethod: 'card',
  },
  {
    id: 'MS202609120003',
    items: [
      {
        id: 'sample-nike',
        productId: 'nike-air-force-1',
        quantity: 1,
        selected: true,
        variants: { 'Kích cỡ': '42' },
      },
    ],
    total: 1_890_000,
    status: 'processing',
    createdAt: '2026-09-12T10:15:00+07:00',
    address,
    paymentMethod: 'cod',
  },
  {
    id: 'MS202609090004',
    items: [
      {
        id: 'sample-keychron',
        productId: 'keychron-k2',
        quantity: 1,
        selected: true,
        variants: { 'Màu sắc': 'Xám' },
      },
    ],
    total: 1_790_000,
    status: 'pending',
    createdAt: '2026-09-09T08:00:00+07:00',
    address,
    paymentMethod: 'wallet',
  },
  {
    id: 'MS202609010005',
    items: [
      {
        id: 'sample-hoodie',
        productId: 'puma-hoodie',
        quantity: 1,
        selected: true,
        variants: { 'Kích cỡ': 'M' },
      },
    ],
    total: 790_000,
    status: 'cancelled',
    createdAt: '2026-09-01T15:45:00+07:00',
    address,
    paymentMethod: 'cod',
  },
];
