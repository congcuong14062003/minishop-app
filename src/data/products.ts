import type { Product } from '@/types';

// Phase 1 seed establishes the contract. Full 30–50 item catalog comes with product UI.
export const products: readonly Product[] = [
  {
    id: 'sony-xm5',
    name: 'Tai nghe Sony WH-1000XM5',
    price: 6490000,
    originalPrice: 8990000,
    discount: 28,
    rating: 4.9,
    sold: 5600,
    category: 'accessories',
    brand: 'Sony',
    images: [],
    variants: [{ name: 'Màu sắc', options: ['Đen', 'Bạc'] }],
    description:
      'Tai nghe không dây chống ồn, âm thanh sống động và thiết kế nhẹ nhàng cho cả ngày.',
    stock: 48,
    location: 'Hà Nội',
  },
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    price: 24990000,
    originalPrice: 29990000,
    discount: 17,
    rating: 4.9,
    sold: 2300,
    category: 'phone',
    brand: 'Apple',
    images: [],
    variants: [
      { name: 'Dung lượng', options: ['256GB', '512GB'] },
      { name: 'Màu sắc', options: ['Titan tự nhiên', 'Titan đen'] },
    ],
    description: 'Thiết kế titan, camera chuyên nghiệp và màn hình Super Retina XDR.',
    stock: 32,
    location: 'TP. Hồ Chí Minh',
  },
];
