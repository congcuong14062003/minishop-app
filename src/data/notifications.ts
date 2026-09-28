import type { ShopNotification } from '@/types';

export const notifications: readonly ShopNotification[] = [
  {
    id: 'order-MS202609250001',
    title: 'Đơn hàng #MS202609250001 đang được giao',
    description: 'Sản phẩm đang trên đường đến địa chỉ của bạn.',
    type: 'order',
    createdAt: '2026-09-27T12:00:00+07:00',
    read: false,
  },
  {
    id: 'promotion-weekend',
    title: 'Ưu đãi cuối tuần đã bắt đầu',
    description: 'Khám phá Flash Sale và những lựa chọn được yêu thích tại MiniShop.',
    type: 'promotion',
    createdAt: '2026-09-27T08:00:00+07:00',
    read: false,
  },
  {
    id: 'welcome',
    title: 'Chào mừng bạn đến với MiniShop',
    description: 'Lưu sản phẩm yêu thích và khám phá những gợi ý dành riêng cho bạn.',
    type: 'general',
    createdAt: '2026-09-25T09:00:00+07:00',
    read: false,
  },
  {
    id: 'free-shipping',
    title: 'Miễn phí vận chuyển toàn quốc',
    description: 'Các đơn hàng trong bản UI mẫu được miễn phí vận chuyển tiêu chuẩn.',
    type: 'promotion',
    createdAt: '2026-09-24T10:00:00+07:00',
    read: true,
  },
];
