export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  images: readonly string[];
}

const reviewTemplates: readonly Omit<Review, 'id'>[] = [
  {
    name: 'Minh Anh',
    rating: 5,
    date: '18/09/2026',
    comment: 'Sản phẩm đẹp, đóng gói cẩn thận. Mình đã dùng vài ngày và rất hài lòng.',
    images: [],
  },
  {
    name: 'Quốc Bảo',
    rating: 5,
    date: '12/09/2026',
    comment: 'Giao nhanh hơn dự kiến, sản phẩm đúng mô tả và hoàn thiện tốt.',
    images: [],
  },
  {
    name: 'Thu Hà',
    rating: 4,
    date: '05/09/2026',
    comment: 'Trải nghiệm ổn trong tầm giá. Shop tư vấn nhiệt tình, sẽ tiếp tục ủng hộ.',
    images: [],
  },
  {
    name: 'Hoàng Long',
    rating: 5,
    date: '29/08/2026',
    comment: 'Thiết kế đẹp và sử dụng thuận tiện. Rất đáng để cân nhắc.',
    images: [],
  },
  {
    name: 'Ngọc Linh',
    rating: 5,
    date: '22/08/2026',
    comment: 'Hàng đến nguyên vẹn, thao tác sử dụng đơn giản và cảm giác rất chắc chắn.',
    images: [],
  },
  {
    name: 'Đức Huy',
    rating: 5,
    date: '15/08/2026',
    comment: 'Đúng mẫu mình cần. Chất lượng tốt hơn mong đợi ở mức giá này.',
    images: [],
  },
  {
    name: 'Bảo Trân',
    rating: 5,
    date: '08/08/2026',
    comment: 'Mua làm quà và người nhận rất thích. Gói hàng gọn gàng, giao đúng hẹn.',
    images: [],
  },
  {
    name: 'Phương Nam',
    rating: 5,
    date: '01/08/2026',
    comment: 'Sau một thời gian dùng vẫn hoạt động tốt. Mình sẽ giới thiệu cho bạn bè.',
    images: [],
  },
];

export function getProductReviews(productId: string, images: readonly string[] = []): Review[] {
  return reviewTemplates.map((review, index) => ({
    ...review,
    id: `${productId}-review-${index}`,
    images: index < 2 && images[index] ? [images[index]] : [],
  }));
}
