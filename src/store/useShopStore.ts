import { create } from 'zustand';
import { initialAddresses } from '@/data/addresses';
import { notifications as initialNotifications } from '@/data/notifications';
import { orders as initialOrders } from '@/data/orders';
import type { Address, CartItem, Order, ShopNotification, User } from '@/types';

interface ShopState {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  addresses: Address[];
  selectedAddressId: string | null;
  notifications: ShopNotification[];
  selectedVoucherId: string | null;
  user: User | null;
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  toggleCartSelection: (id: string) => void;
  selectAllCart: (selected: boolean) => void;
  placeOrder: (address: Address, total: number, paymentMethod: 'cod' | 'card' | 'wallet') => string;
  toggleWishlist: (productId: string) => void;
  saveAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  selectAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  signIn: (user: User) => void;
  signOut: () => void;
  selectVoucher: (id: string | null) => void;
}

export const useShopStore = create<ShopState>((set) => ({
  cart: [],
  wishlist: [],
  orders: [...initialOrders],
  addresses: [...initialAddresses],
  selectedAddressId: initialAddresses[0]?.id ?? null,
  notifications: [...initialNotifications],
  selectedVoucherId: null,
  user: { id: 'local-user', name: 'Nguyễn Văn A', email: 'user@example.com' },
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((entry) => entry.id === item.id);
      return {
        cart: existing
          ? state.cart.map((entry) =>
              entry.id === item.id
                ? { ...entry, quantity: entry.quantity + item.quantity, selected: true }
                : entry,
            )
          : [...state.cart, item],
      };
    }),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    })),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
  toggleCartSelection: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    })),
  selectAllCart: (selected) =>
    set((state) => ({ cart: state.cart.map((item) => ({ ...item, selected })) })),
  placeOrder: (address, total, paymentMethod) => {
    const id = `MS${Date.now()}`;
    set((state) => ({
      orders: [
        {
          id,
          items: state.cart.filter((item) => item.selected),
          total,
          status: 'processing',
          createdAt: new Date().toISOString(),
          address,
          paymentMethod,
        },
        ...state.orders,
      ],
      cart: state.cart.filter((item) => !item.selected),
      selectedVoucherId: null,
      notifications: [
        {
          id: `order-${id}`,
          title: `Đơn hàng #${id} đã được đặt`,
          description: 'MiniShop đang chuẩn bị sản phẩm của bạn.',
          type: 'order',
          createdAt: new Date().toISOString(),
          read: false,
        },
        ...state.notifications,
      ],
    }));
    return id;
  },
  toggleWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.includes(id)
        ? state.wishlist.filter((entry) => entry !== id)
        : [...state.wishlist, id],
    })),
  saveAddress: (address) =>
    set((state) => {
      const exists = state.addresses.some((entry) => entry.id === address.id);
      const updated = exists
        ? state.addresses.map((entry) => (entry.id === address.id ? address : entry))
        : [...state.addresses, address];
      const normalized = address.isDefault
        ? updated.map((entry) => ({ ...entry, isDefault: entry.id === address.id }))
        : updated.some((entry) => entry.isDefault)
          ? updated
          : updated.map((entry, index) => ({ ...entry, isDefault: index === 0 }));
      return {
        addresses: normalized,
        selectedAddressId: state.selectedAddressId ?? address.id,
      };
    }),
  removeAddress: (id) =>
    set((state) => {
      const remaining = state.addresses.filter((entry) => entry.id !== id);
      const selectedAddressId =
        state.selectedAddressId === id ? (remaining[0]?.id ?? null) : state.selectedAddressId;
      const hasDefault = remaining.some((entry) => entry.isDefault);
      return {
        addresses: hasDefault
          ? remaining
          : remaining.map((entry, index) => ({ ...entry, isDefault: index === 0 })),
        selectedAddressId,
      };
    }),
  selectAddress: (id) => set({ selectedAddressId: id }),
  setDefaultAddress: (id) =>
    set((state) => ({
      addresses: state.addresses.map((entry) => ({ ...entry, isDefault: entry.id === id })),
      selectedAddressId: id,
    })),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((entry) =>
        entry.id === id ? { ...entry, read: true } : entry,
      ),
    })),
  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((entry) => ({ ...entry, read: true })),
    })),
  signIn: (user) => set({ user }),
  signOut: () => set({ user: null }),
  selectVoucher: (id) => set({ selectedVoucherId: id }),
}));
