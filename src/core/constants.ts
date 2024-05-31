export const API_URL = import.meta.env.VITE_API_URL as string;

export const API_PATHS = {
  LOGIN: '/api/v1/users',
  PRODUCTS: '/api/v1/products',
  PRODUCT: `/api/v1/products/:id`,
  CATEGORIES: '/api/v1/categories',
  CART: '/api/v1/cart',
  LIKED_PRODUCTS: '/api/v1/liked-products',
  CARD_MUTATION: '/api/v1/line_items',
  CARD: '/api/v1/carts',
};
