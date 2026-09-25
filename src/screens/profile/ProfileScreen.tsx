import { PlaceholderScreen } from '@/screens/PlaceholderScreen';
import { useShopStore } from '@/store/useShopStore';
export default function ProfileScreen() {
  const user = useShopStore((state) => state.user);
  return (
    <PlaceholderScreen
      title="Tài khoản"
      icon="user"
      headline={`Xin chào, ${user.name}`}
      description={user.email}
    />
  );
}
