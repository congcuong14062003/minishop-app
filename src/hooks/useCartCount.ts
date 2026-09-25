import { useShopStore } from '@/store/useShopStore';
export function useCartCount() {
  return useShopStore((state) => state.cart.reduce((count, item) => count + item.quantity, 0));
}
