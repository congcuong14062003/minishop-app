import { create } from 'zustand';
import type { CartItem, User } from '@/types';

interface ShopState {
  cart: CartItem[];
  wishlist: string[];
  user: User;
  addToCart: (item: CartItem) => void;
  toggleWishlist: (productId: string) => void;
}

export const useShopStore = create<ShopState>((set) => ({
  cart: [],
  wishlist: [],
  user: { id: 'local-user', name: 'Nguyễn Văn A', email: 'user@example.com' },
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((entry) => entry.id === item.id);
      return {
        cart: existing
          ? state.cart.map((entry) =>
              entry.id === item.id ? { ...entry, quantity: entry.quantity + item.quantity } : entry,
            )
          : [...state.cart, item],
      };
    }),
  toggleWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.includes(id)
        ? state.wishlist.filter((entry) => entry !== id)
        : [...state.wishlist, id],
    })),
}));
