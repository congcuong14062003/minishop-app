import type { Category } from '@/types';
export const categories: readonly Category[] = [
  { id: 'phone', name: 'Điện thoại', icon: 'smartphone', productCount: 128 },
  { id: 'laptop', name: 'Laptop', icon: 'monitor', productCount: 76 },
  { id: 'fashion', name: 'Thời trang', icon: 'shopping-bag', productCount: 240 },
  { id: 'shoes', name: 'Giày dép', icon: 'package', productCount: 96 },
  { id: 'beauty', name: 'Mỹ phẩm', icon: 'droplet', productCount: 180 },
  { id: 'home', name: 'Đồ gia dụng', icon: 'home', productCount: 152 },
  { id: 'accessories', name: 'Phụ kiện', icon: 'headphones', productCount: 210 },
  { id: 'gaming', name: 'Gaming', icon: 'cpu', productCount: 64 },
];
