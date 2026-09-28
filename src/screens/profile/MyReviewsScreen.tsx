import { EmptyState } from '@/components/common/EmptyState';
import { PageHeader } from '@/components/common/PageHeader';
import { Screen } from '@/components/common/Screen';

export default function MyReviewsScreen() {
  return (
    <Screen>
      <PageHeader title="Đánh giá của tôi" />
      <EmptyState
        icon="star"
        title="Chưa có đánh giá"
        description="Sau khi nhận hàng, các đánh giá bạn viết sẽ xuất hiện ở đây."
      />
    </Screen>
  );
}
