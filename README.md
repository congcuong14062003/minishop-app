# MiniShop · Phase 1

Nền tảng UI mobile thương mại điện tử với Expo SDK 57, React Native và TypeScript strict. Dữ liệu hoàn toàn local, không gọi API nghiệp vụ, không backend và không thanh toán thật.

## Phạm vi hoàn thành

- Expo Router với 5 tab: Trang chủ, Danh mục, Giỏ hàng, Yêu thích, Tài khoản.
- Splash thương hiệu khoảng 1,5 giây sau khi font local sẵn sàng.
- Be Vietnam Pro 400/500/600/700 và bộ icon Feather.
- Theme màu, typography, spacing, radius, shadow; bảng màu dark chuẩn bị riêng, chưa bật chuyển chế độ.
- Khung Home: header, ô tìm kiếm tĩnh, khối thương hiệu, skeleton danh mục và sản phẩm.
- Các tab còn lại là màn hình khung/empty state, chưa phải chức năng hoàn chỉnh.
- Animation Reanimated cho tab, badge số lượng giỏ và skeleton. Badge ẩn khi giỏ trống; lấy số lượng từ store.
- Hợp đồng TypeScript cho sản phẩm, biến thể, danh mục, giỏ, đơn hàng, địa chỉ, thông báo, banner và user.
- 8 danh mục, 4 banner, 2 sản phẩm mẫu để xác lập cấu trúc. Danh mục 30–50 sản phẩm và ảnh được làm ở phase sản phẩm.
- Zustand lưu cart/wishlist/user trong bộ nhớ; khởi động lại sẽ reset. Chưa lưu AsyncStorage.

**Dừng tại Phase 1 theo yêu cầu.** Skeleton Home hiển thị có chủ đích để duyệt bố cục; không đại diện cho việc chờ API. Search, carousel và danh sách sản phẩm sẽ được nối chức năng trong các phase sau.

## Chạy project

Dùng Node **24 LTS, từ 24.3.0 trở lên** (hoặc Node 22 từ 22.13.0). Terminal của máy được phát hiện có Node 22.12.0; phiên bản này thấp hơn yêu cầu SDK. Phiên kiểm tra sử dụng Node 24.19.0 có sẵn trong runtime.

```powershell
cd D:\project\minishop\minishop-app
npm ci

# Mở máy ảo trước, đợi vào màn hình chính Android.
& "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -avd Pixel_3_XL_2
```

Trong terminal PowerShell khác:

```powershell
cd D:\project\minishop\minishop-app
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:Path += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator"
npm run android
```

Sau khi đổi entry point hoặc thêm thư viện, khởi động lại Metro bằng `npm run android -- --clear`. Nếu cổng đang bận, dừng Metro cũ bằng Ctrl+C hoặc chọn một cổng khác. Lỗi kết nối 5554 có thể xảy ra nếu mở app trước khi máy ảo sẵn sàng.

```powershell
npm run typecheck
npm run lint
npm run format:check
npm run web
```

Font nằm trong package local và được bundle; app không tải font từ Google khi chạy. Native splash của Expo Go có thể hiện thương hiệu Expo trước splash MiniShop; splash JS MiniShop xuất hiện trên cả Expo Go và bản build riêng.

## Kiến trúc và file mới

```text
src/
  App.tsx                       # Font, splash, providers, root Stack
  app/
    _layout.tsx                 # Entry layout của Router
    (tabs)/
      _layout.tsx               # 5 tab, safe area, badge
      index.tsx                 # Route Home
      categories.tsx
      cart.tsx
      wishlist.tsx
      profile.tsx
  assets/                       # Chỗ đặt tài nguyên nội bộ sau này
  components/
    common/Brand.tsx
    common/Screen.tsx
    common/Skeleton.tsx
    home/HomeSkeleton.tsx
    product/, cart/, order/     # Dành cho các phase tiếp theo
  constants/motion.ts
  data/
    products.ts
    categories.ts
    banners.ts
    orders.ts
    notifications.ts
  hooks/useCartCount.ts
  navigation/TabIcon.tsx
  screens/
    SplashScreen.tsx
    PlaceholderScreen.tsx
    home/HomeScreen.tsx
    category/CategoryScreen.tsx
    cart/CartScreen.tsx
    wishlist/WishlistScreen.tsx
    profile/ProfileScreen.tsx
    product/, search/, checkout/, order/, notification/, auth/
  store/useShopStore.ts
  theme/
    colors.ts
    typography.ts
    spacing.ts
    radius.ts
    shadows.ts
    index.ts
  types/index.ts
  utils/format.ts
```

Các thư mục dành cho phase sau có `.gitkeep`. Config mới: `eslint.config.js`, `.prettierrc.json`, `.prettierignore`, `.nvmrc` (Node 24). Cập nhật `package.json`, lockfile, `app.json`, `tsconfig.json`.

Route chỉ định tuyến, màn hình ở `screens`, component dùng lại ở `components`. `src/App.tsx` ghép các provider. File `App.tsx` và `index.ts` cũ ở root được giữ lại vì có chỉnh sửa trước đó, nhưng **không còn là entry chạy app**. Sửa UI Home tại `src/screens/home/HomeScreen.tsx`.

## Package đã thêm

- Navigation: `expo-router`, `expo-linking`, `expo-constants`, `react-native-screens`, `react-native-safe-area-context`.
- Thương hiệu: `expo-font`, `@expo-google-fonts/be-vietnam-pro`, `@expo/vector-icons`, `expo-splash-screen`.
- Chuyển động: `react-native-reanimated`, `react-native-worklets`, `react-native-gesture-handler`.
- Nền tảng phase sau: `expo-image`, `@shopify/flash-list`, `zustand`.
- Preview web: `react-dom`, `react-native-web`.
- Code quality: `eslint`, `eslint-config-expo`, `eslint-config-prettier`, `prettier`.

Các package native được cài qua Expo để dùng phiên bản tương thích SDK 57; xem phiên bản chính xác trong `package.json` và `package-lock.json`.

## Kiểm tra Phase 1

- TypeScript strict: đạt, không lỗi.
- ESLint: đạt, không warning.
- Prettier: đạt.
- Expo dependency compatibility: đạt.
- Android Pixel_3_XL_2 qua Expo Go: bundle thành công, đã xem Home và bấm qua đủ 5 tab; nội dung tiếng Việt hiển thị đúng, tab và nội dung không đè vùng điều hướng hệ thống.
- Bản kiểm tra đang chạy bằng Node 24.19.0 ở cổng 8083. Chưa kiểm tra thực tế trên iOS và các kích thước thiết bị khác; vòng responsive đầy đủ thuộc Phase 10.

## Phase 2 tiếp theo

Xây bộ component dùng lại: Button, IconButton, Input, Card, Badge, Price, Rating, SearchBar, ProductImage, ProductCard, EmptyState và các skeleton. Hoàn thiện trạng thái nhấn, disabled/loading, accessibility, animation vừa phải và kiểm tra trên màn hình nhỏ. Chỉ sau khi Phase 2 ổn mới triển khai Home đầy đủ ở Phase 3.
