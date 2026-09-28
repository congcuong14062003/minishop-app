import type { Product } from '@/types';

export type PriceRange = 'all' | 'under500' | '500to1m' | '1to5m' | '5to10m' | 'over10m';
export type SortMode = 'popular' | 'priceAsc' | 'priceDesc' | 'newest';

export interface ProductFilters {
  priceRange: PriceRange;
  minRating: number;
  brands: string[];
}

export const emptyFilters = (): ProductFilters => ({
  priceRange: 'all',
  minRating: 0,
  brands: [],
});

export const priceRanges: { id: PriceRange; label: string; min: number; max: number }[] = [
  { id: 'all', label: 'Tất cả', min: 0, max: Infinity },
  { id: 'under500', label: 'Dưới 500K', min: 0, max: 500_000 },
  { id: '500to1m', label: '500K – 1 triệu', min: 500_000, max: 1_000_000 },
  { id: '1to5m', label: '1 – 5 triệu', min: 1_000_000, max: 5_000_000 },
  { id: '5to10m', label: '5 – 10 triệu', min: 5_000_000, max: 10_000_000 },
  { id: 'over10m', label: 'Trên 10 triệu', min: 10_000_000, max: Infinity },
];

export const sortModes: { id: SortMode; label: string }[] = [
  { id: 'popular', label: 'Phổ biến' },
  { id: 'priceAsc', label: 'Giá thấp → cao' },
  { id: 'priceDesc', label: 'Giá cao → thấp' },
  { id: 'newest', label: 'Mới nhất' },
];

export function selectProducts(
  source: readonly Product[],
  filters: ProductFilters,
  sort: SortMode,
  query = '',
): Product[] {
  const range = priceRanges.find((item) => item.id === filters.priceRange) ?? priceRanges[0]!;
  const rawTerms = query.trim().toLocaleLowerCase('vi-VN').split(/\s+/).filter(Boolean);
  const terms = rawTerms.length > 1 ? rawTerms.filter((term) => term !== 'bluetooth') : rawTerms;
  const result = source.filter(
    (product) =>
      product.price >= range.min &&
      product.price < range.max &&
      product.rating >= filters.minRating &&
      (filters.brands.length === 0 || filters.brands.includes(product.brand)) &&
      terms.every((term) =>
        `${product.name} ${product.brand}`.toLocaleLowerCase('vi-VN').includes(term),
      ),
  );

  return result.sort((a, b) => {
    if (sort === 'priceAsc') return a.price - b.price;
    if (sort === 'priceDesc') return b.price - a.price;
    if (sort === 'newest') return source.indexOf(b) - source.indexOf(a);
    return b.sold - a.sold;
  });
}
