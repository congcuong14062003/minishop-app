import type { Product } from '@/types';

// Local demo data: prices, ratings, stock and variants are illustrative.
// Photos illustrate categories, not the exact branded models.
export const products: readonly Product[] = [
  {
    id: 'sony-xm5',
    name: 'Tai nghe Sony WH-1000XM5',
    category: 'accessories',
    brand: 'Sony',
    price: 6490000,
    originalPrice: 8990000,
    discount: 28,
    rating: 4.9,
    sold: 5600,
    stock: 28,
    location: 'Hà Nội',
    description:
      'Tai nghe Sony WH-1000XM5. Phụ kiện tiện mang theo, bổ sung cho trải nghiệm làm việc và giải trí.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
    ],
    variants: [
      {
        name: 'Màu sắc',
        options: ['Đen', 'Trắng'],
      },
    ],
  },
  {
    id: 'nike-air-force-1',
    name: 'Giày Nike Air Force 1 Low',
    category: 'shoes',
    brand: 'Nike',
    price: 1890000,
    originalPrice: 2690000,
    discount: 30,
    rating: 4.8,
    sold: 3240,
    stock: 35,
    location: 'TP. Hồ Chí Minh',
    description:
      'Giày Nike Air Force 1 Low. Giày phong cách năng động, dễ phối cùng trang phục đi học và dạo phố.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Kích cỡ',
        options: ['38', '39', '40', '41', '42'],
      },
    ],
  },
  {
    id: 'samsung-buds-fe',
    name: 'Tai nghe Samsung Galaxy Buds FE',
    category: 'accessories',
    brand: 'Samsung',
    price: 990000,
    originalPrice: 1990000,
    discount: 50,
    rating: 4.7,
    sold: 2180,
    stock: 42,
    location: 'Đà Nẵng',
    description:
      'Tai nghe Samsung Galaxy Buds FE. Phụ kiện tiện mang theo, bổ sung cho trải nghiệm làm việc và giải trí.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Màu sắc',
        options: ['Đen', 'Trắng'],
      },
    ],
  },
  {
    id: 'cerave-cleanser',
    name: 'Sữa rửa mặt CeraVe 236ml',
    category: 'beauty',
    brand: 'CeraVe',
    price: 249000,
    originalPrice: 350000,
    discount: 29,
    rating: 4.9,
    sold: 8420,
    stock: 49,
    location: 'Bình Dương',
    description:
      'Sữa rửa mặt CeraVe 236ml. Sản phẩm dành cho quy trình chăm sóc da hằng ngày, bao bì gọn và dễ mang theo.',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Phân loại',
        options: ['Tiêu chuẩn', 'Bộ quà tặng'],
      },
    ],
  },
  {
    id: 'uniqlo-airism',
    name: 'Áo thun Uniqlo AIRism',
    category: 'fashion',
    brand: 'Uniqlo',
    price: 199000,
    originalPrice: 299000,
    discount: 33,
    rating: 4.8,
    sold: 12600,
    stock: 56,
    location: 'Hà Nội',
    description:
      'Áo thun Uniqlo AIRism. Thiết kế dễ phối, phom thoải mái để bổ sung vào tủ đồ hằng ngày.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Kích cỡ',
        options: ['S', 'M', 'L', 'XL'],
      },
    ],
  },
  {
    id: 'locklock-bottle',
    name: 'Bình giữ nhiệt LocknLock 500ml',
    category: 'home',
    brand: 'LocknLock',
    price: 229000,
    originalPrice: 390000,
    discount: 41,
    rating: 4.8,
    sold: 6470,
    stock: 63,
    location: 'TP. Hồ Chí Minh',
    description:
      'Bình giữ nhiệt LocknLock 500ml. Thiết kế tiện dụng cho sinh hoạt gia đình, phù hợp không gian sống hiện đại.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Phân loại',
        options: ['Tiêu chuẩn'],
      },
    ],
  },
  {
    id: 'logitech-g304',
    name: 'Chuột gaming Logitech G304',
    category: 'gaming',
    brand: 'Logitech',
    price: 590000,
    originalPrice: 990000,
    discount: 40,
    rating: 4.9,
    sold: 4510,
    stock: 70,
    location: 'Đà Nẵng',
    description:
      'Chuột gaming Logitech G304. Thiết kế dành cho góc chơi game, dễ kết hợp cùng các thiết bị hiện có.',
    images: [
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Màu sắc',
        options: ['Đen', 'Trắng'],
      },
    ],
  },
  {
    id: 'redmi-note-13',
    name: 'Xiaomi Redmi Note 13',
    category: 'phone',
    brand: 'Xiaomi',
    price: 3990000,
    originalPrice: 5490000,
    discount: 27,
    rating: 4.7,
    sold: 1840,
    stock: 77,
    location: 'Bình Dương',
    description:
      'Xiaomi Redmi Note 13. Điện thoại màn hình lớn, kiểu dáng hiện đại cho công việc và giải trí hằng ngày.',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80',
    ],
    variants: [
      {
        name: 'Dung lượng',
        options: ['256GB', '512GB'],
      },
    ],
  },
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    category: 'phone',
    brand: 'Apple',
    price: 24990000,
    originalPrice: 29990000,
    discount: 17,
    rating: 4.9,
    sold: 2300,
    stock: 84,
    location: 'Hà Nội',
    description:
      'iPhone 15 Pro Max. Điện thoại màn hình lớn, kiểu dáng hiện đại cho công việc và giải trí hằng ngày.',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80',
    ],
    variants: [
      {
        name: 'Dung lượng',
        options: ['256GB', '512GB'],
      },
    ],
  },
  {
    id: 'macbook-air-m4',
    name: 'MacBook Air M4 13 inch',
    category: 'laptop',
    brand: 'Apple',
    price: 24990000,
    originalPrice: 27990000,
    discount: 11,
    rating: 4.9,
    sold: 1680,
    stock: 91,
    location: 'TP. Hồ Chí Minh',
    description:
      'MacBook Air M4 13 inch. Laptop gọn nhẹ dành cho học tập, làm việc văn phòng và sáng tạo nội dung.',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
    ],
    variants: [
      {
        name: 'Bộ nhớ',
        options: ['16GB / 512GB', '16GB / 1TB'],
      },
    ],
  },
  {
    id: 'adidas-ultraboost',
    name: 'Giày Adidas Ultraboost Light',
    category: 'shoes',
    brand: 'Adidas',
    price: 2790000,
    originalPrice: 3990000,
    discount: 30,
    rating: 4.9,
    sold: 2750,
    stock: 98,
    location: 'Đà Nẵng',
    description:
      'Giày Adidas Ultraboost Light. Giày phong cách năng động, dễ phối cùng trang phục đi học và dạo phố.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Kích cỡ',
        options: ['38', '39', '40', '41', '42'],
      },
    ],
  },
  {
    id: 'airpods-pro-2',
    name: 'Tai nghe Apple AirPods Pro 2',
    category: 'accessories',
    brand: 'Apple',
    price: 4990000,
    originalPrice: 6190000,
    discount: 19,
    rating: 4.9,
    sold: 7310,
    stock: 105,
    location: 'Bình Dương',
    description:
      'Tai nghe Apple AirPods Pro 2. Phụ kiện tiện mang theo, bổ sung cho trải nghiệm làm việc và giải trí.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Màu sắc',
        options: ['Đen', 'Trắng'],
      },
    ],
  },
  {
    id: 'laroche-sunscreen',
    name: 'Kem chống nắng La Roche-Posay 50ml',
    category: 'beauty',
    brand: 'La Roche-Posay',
    price: 429000,
    originalPrice: 550000,
    discount: 22,
    rating: 4.9,
    sold: 15320,
    stock: 112,
    location: 'Hà Nội',
    description:
      'Kem chống nắng La Roche-Posay 50ml. Sản phẩm dành cho quy trình chăm sóc da hằng ngày, bao bì gọn và dễ mang theo.',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Phân loại',
        options: ['Tiêu chuẩn', 'Bộ quà tặng'],
      },
    ],
  },
  {
    id: 'philips-airfryer',
    name: 'Nồi chiên Philips 4.1L',
    category: 'home',
    brand: 'Philips',
    price: 1990000,
    originalPrice: 2890000,
    discount: 31,
    rating: 4.8,
    sold: 4890,
    stock: 119,
    location: 'TP. Hồ Chí Minh',
    description:
      'Nồi chiên Philips 4.1L. Thiết kế tiện dụng cho sinh hoạt gia đình, phù hợp không gian sống hiện đại.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Phân loại',
        options: ['Tiêu chuẩn'],
      },
    ],
  },
  {
    id: 'mx-master-3s',
    name: 'Chuột Logitech MX Master 3S',
    category: 'accessories',
    brand: 'Logitech',
    price: 1990000,
    originalPrice: 2490000,
    discount: 20,
    rating: 4.9,
    sold: 3670,
    stock: 126,
    location: 'Đà Nẵng',
    description:
      'Chuột Logitech MX Master 3S. Phụ kiện tiện mang theo, bổ sung cho trải nghiệm làm việc và giải trí.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Màu sắc',
        options: ['Đen', 'Trắng'],
      },
    ],
  },
  {
    id: 'levis-501',
    name: 'Quần jeans Levi’s 501 Original',
    category: 'fashion',
    brand: 'Levi’s',
    price: 1290000,
    originalPrice: 1690000,
    discount: 24,
    rating: 4.8,
    sold: 3120,
    stock: 133,
    location: 'Bình Dương',
    description:
      'Quần jeans Levi’s 501 Original. Thiết kế dễ phối, phom thoải mái để bổ sung vào tủ đồ hằng ngày.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Kích cỡ',
        options: ['S', 'M', 'L', 'XL'],
      },
    ],
  },
  {
    id: 'samsung-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra',
    category: 'phone',
    brand: 'Samsung',
    price: 26990000,
    originalPrice: 33990000,
    discount: 21,
    rating: 4.9,
    sold: 1540,
    stock: 140,
    location: 'Hà Nội',
    description:
      'Samsung Galaxy S25 Ultra. Điện thoại màn hình lớn, kiểu dáng hiện đại cho công việc và giải trí hằng ngày.',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Dung lượng',
        options: ['256GB', '512GB'],
      },
    ],
  },
  {
    id: 'asus-zenbook-14',
    name: 'Laptop ASUS Zenbook 14 OLED',
    category: 'laptop',
    brand: 'ASUS',
    price: 21990000,
    originalPrice: 25990000,
    discount: 15,
    rating: 4.8,
    sold: 870,
    stock: 147,
    location: 'TP. Hồ Chí Minh',
    description:
      'Laptop ASUS Zenbook 14 OLED. Laptop gọn nhẹ dành cho học tập, làm việc văn phòng và sáng tạo nội dung.',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Bộ nhớ',
        options: ['16GB / 512GB', '16GB / 1TB'],
      },
    ],
  },
  {
    id: 'new-balance-530',
    name: 'Giày New Balance 530',
    category: 'shoes',
    brand: 'New Balance',
    price: 2190000,
    originalPrice: 2690000,
    discount: 19,
    rating: 4.8,
    sold: 1960,
    stock: 154,
    location: 'Đà Nẵng',
    description:
      'Giày New Balance 530. Giày phong cách năng động, dễ phối cùng trang phục đi học và dạo phố.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Kích cỡ',
        options: ['38', '39', '40', '41', '42'],
      },
    ],
  },
  {
    id: 'muji-linen',
    name: 'Áo sơ mi linen MUJI',
    category: 'fashion',
    brand: 'MUJI',
    price: 599000,
    originalPrice: 799000,
    discount: 25,
    rating: 4.7,
    sold: 2450,
    stock: 161,
    location: 'Bình Dương',
    description:
      'Áo sơ mi linen MUJI. Thiết kế dễ phối, phom thoải mái để bổ sung vào tủ đồ hằng ngày.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Kích cỡ',
        options: ['S', 'M', 'L', 'XL'],
      },
    ],
  },
  {
    id: 'bioderma-sensibio',
    name: 'Nước tẩy trang Bioderma 500ml',
    category: 'beauty',
    brand: 'Bioderma',
    price: 329000,
    originalPrice: 450000,
    discount: 27,
    rating: 4.9,
    sold: 11200,
    stock: 168,
    location: 'Hà Nội',
    description:
      'Nước tẩy trang Bioderma 500ml. Sản phẩm dành cho quy trình chăm sóc da hằng ngày, bao bì gọn và dễ mang theo.',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Phân loại',
        options: ['Tiêu chuẩn', 'Bộ quà tặng'],
      },
    ],
  },
  {
    id: 'xiaomi-lamp',
    name: 'Đèn bàn Xiaomi Mi Smart LED',
    category: 'home',
    brand: 'Xiaomi',
    price: 699000,
    originalPrice: 990000,
    discount: 29,
    rating: 4.8,
    sold: 3240,
    stock: 175,
    location: 'TP. Hồ Chí Minh',
    description:
      'Đèn bàn Xiaomi Mi Smart LED. Thiết kế tiện dụng cho sinh hoạt gia đình, phù hợp không gian sống hiện đại.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Phân loại',
        options: ['Tiêu chuẩn'],
      },
    ],
  },
  {
    id: 'keychron-k2',
    name: 'Bàn phím cơ Keychron K2',
    category: 'gaming',
    brand: 'Keychron',
    price: 1790000,
    originalPrice: 2290000,
    discount: 22,
    rating: 4.8,
    sold: 1420,
    stock: 182,
    location: 'Đà Nẵng',
    description:
      'Bàn phím cơ Keychron K2. Thiết kế dành cho góc chơi game, dễ kết hợp cùng các thiết bị hiện có.',
    images: [
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Màu sắc',
        options: ['Đen', 'Trắng'],
      },
    ],
  },
  {
    id: 'jbl-flip-6',
    name: 'Loa Bluetooth JBL Flip 6',
    category: 'accessories',
    brand: 'JBL',
    price: 2290000,
    originalPrice: 2990000,
    discount: 23,
    rating: 4.9,
    sold: 2570,
    stock: 189,
    location: 'Bình Dương',
    description:
      'Loa Bluetooth JBL Flip 6. Phụ kiện tiện mang theo, bổ sung cho trải nghiệm làm việc và giải trí.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Màu sắc',
        options: ['Đen', 'Trắng'],
      },
    ],
  },
  {
    id: 'oppo-reno12',
    name: 'Điện thoại OPPO Reno12',
    category: 'phone',
    brand: 'OPPO',
    price: 7990000,
    originalPrice: 9990000,
    discount: 20,
    rating: 4.7,
    sold: 930,
    stock: 196,
    location: 'Hà Nội',
    description:
      'Điện thoại OPPO Reno12. Điện thoại màn hình lớn, kiểu dáng hiện đại cho công việc và giải trí hằng ngày.',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Dung lượng',
        options: ['256GB', '512GB'],
      },
    ],
  },
  {
    id: 'dell-inspiron-14',
    name: 'Laptop Dell Inspiron 14',
    category: 'laptop',
    brand: 'Dell',
    price: 15990000,
    originalPrice: 18990000,
    discount: 16,
    rating: 4.7,
    sold: 650,
    stock: 203,
    location: 'TP. Hồ Chí Minh',
    description:
      'Laptop Dell Inspiron 14. Laptop gọn nhẹ dành cho học tập, làm việc văn phòng và sáng tạo nội dung.',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Bộ nhớ',
        options: ['16GB / 512GB', '16GB / 1TB'],
      },
    ],
  },
  {
    id: 'converse-chuck70',
    name: 'Giày Converse Chuck 70',
    category: 'shoes',
    brand: 'Converse',
    price: 1490000,
    originalPrice: 1890000,
    discount: 21,
    rating: 4.8,
    sold: 4270,
    stock: 210,
    location: 'Đà Nẵng',
    description:
      'Giày Converse Chuck 70. Giày phong cách năng động, dễ phối cùng trang phục đi học và dạo phố.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Kích cỡ',
        options: ['38', '39', '40', '41', '42'],
      },
    ],
  },
  {
    id: 'puma-hoodie',
    name: 'Áo hoodie Puma Essentials',
    category: 'fashion',
    brand: 'Puma',
    price: 790000,
    originalPrice: 1090000,
    discount: 28,
    rating: 4.7,
    sold: 1380,
    stock: 217,
    location: 'Bình Dương',
    description:
      'Áo hoodie Puma Essentials. Thiết kế dễ phối, phom thoải mái để bổ sung vào tủ đồ hằng ngày.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Kích cỡ',
        options: ['S', 'M', 'L', 'XL'],
      },
    ],
  },
  {
    id: 'innisfree-serum',
    name: 'Serum Innisfree Green Tea 80ml',
    category: 'beauty',
    brand: 'Innisfree',
    price: 499000,
    originalPrice: 690000,
    discount: 28,
    rating: 4.8,
    sold: 5630,
    stock: 224,
    location: 'Hà Nội',
    description:
      'Serum Innisfree Green Tea 80ml. Sản phẩm dành cho quy trình chăm sóc da hằng ngày, bao bì gọn và dễ mang theo.',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Phân loại',
        options: ['Tiêu chuẩn', 'Bộ quà tặng'],
      },
    ],
  },
  {
    id: 'electrolux-kettle',
    name: 'Ấm siêu tốc Electrolux 1.7L',
    category: 'home',
    brand: 'Electrolux',
    price: 449000,
    originalPrice: 650000,
    discount: 31,
    rating: 4.8,
    sold: 3710,
    stock: 231,
    location: 'TP. Hồ Chí Minh',
    description:
      'Ấm siêu tốc Electrolux 1.7L. Thiết kế tiện dụng cho sinh hoạt gia đình, phù hợp không gian sống hiện đại.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Phân loại',
        options: ['Tiêu chuẩn'],
      },
    ],
  },
  {
    id: 'razer-deathadder',
    name: 'Chuột Razer DeathAdder V3',
    category: 'gaming',
    brand: 'Razer',
    price: 1290000,
    originalPrice: 1690000,
    discount: 24,
    rating: 4.9,
    sold: 1870,
    stock: 238,
    location: 'Đà Nẵng',
    description:
      'Chuột Razer DeathAdder V3. Thiết kế dành cho góc chơi game, dễ kết hợp cùng các thiết bị hiện có.',
    images: [
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Màu sắc',
        options: ['Đen', 'Trắng'],
      },
    ],
  },
  {
    id: '8bitdo-ultimate',
    name: 'Tay cầm 8BitDo Ultimate',
    category: 'gaming',
    brand: '8BitDo',
    price: 990000,
    originalPrice: 1290000,
    discount: 23,
    rating: 4.8,
    sold: 1240,
    stock: 245,
    location: 'Bình Dương',
    description:
      'Tay cầm 8BitDo Ultimate. Thiết kế dành cho góc chơi game, dễ kết hợp cùng các thiết bị hiện có.',
    images: [
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=600&q=80',
    ],
    variants: [
      {
        name: 'Màu sắc',
        options: ['Đen', 'Trắng'],
      },
    ],
  },
];
