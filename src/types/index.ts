export type CategoryId =
  'phone' | 'laptop' | 'fashion' | 'shoes' | 'beauty' | 'home' | 'accessories' | 'gaming';
export interface Category {
  id: CategoryId;
  name: string;
  icon:
    | 'smartphone'
    | 'monitor'
    | 'shopping-bag'
    | 'package'
    | 'droplet'
    | 'home'
    | 'headphones'
    | 'cpu';
  productCount: number;
}
export interface ProductVariant {
  name: string;
  options: readonly string[];
}
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  sold: number;
  category: CategoryId;
  brand: string;
  images: readonly string[];
  variants: readonly ProductVariant[];
  description: string;
  stock: number;
  location: string;
}
export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  selected: boolean;
  variants: Record<string, string>;
}
export interface Address {
  id: string;
  name: string;
  phone: string;
  detail: string;
  isDefault: boolean;
}
export type OrderStatus = 'pending' | 'processing' | 'shipping' | 'delivered' | 'cancelled';
export interface Order {
  id: string;
  items: readonly CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  address: Address;
}
export interface ShopNotification {
  id: string;
  title: string;
  description: string;
  type: 'order' | 'promotion' | 'general';
  createdAt: string;
  read: boolean;
}
export interface Banner {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  category: CategoryId;
}
export interface User {
  id: string;
  name: string;
  email: string;
}
