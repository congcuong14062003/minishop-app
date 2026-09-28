import { products } from './products';

// Home merchandising groups are separate from the user's personal wishlist.
const collectionIds = {
  flashSale: [
    'sony-xm5',
    'nike-air-force-1',
    'samsung-buds-fe',
    'cerave-cleanser',
    'uniqlo-airism',
    'locklock-bottle',
    'logitech-g304',
    'redmi-note-13',
  ],
  popular: [
    'iphone-15-pro-max',
    'macbook-air-m4',
    'adidas-ultraboost',
    'airpods-pro-2',
    'laroche-sunscreen',
    'philips-airfryer',
    'mx-master-3s',
    'levis-501',
  ],
  recommended: [
    'samsung-s25-ultra',
    'asus-zenbook-14',
    'new-balance-530',
    'muji-linen',
    'bioderma-sensibio',
    'xiaomi-lamp',
    'keychron-k2',
    'jbl-flip-6',
    'oppo-reno12',
    'dell-inspiron-14',
    'converse-chuck70',
    'puma-hoodie',
    'innisfree-serum',
    'electrolux-kettle',
    'razer-deathadder',
    '8bitdo-ultimate',
  ],
} as const;

const byId = new Map(products.map((product) => [product.id, product]));
function selectProducts(ids: readonly string[]) {
  return ids.map((id) => {
    const product = byId.get(id);
    if (!product) throw new Error(`Missing mock product: ${id}`);
    return product;
  });
}

export const flashSaleProducts = selectProducts(collectionIds.flashSale);
export const popularProducts = selectProducts(collectionIds.popular);
export const recommendedProducts = selectProducts(collectionIds.recommended);
