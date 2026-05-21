export const ROUTES = {
  home: "#/",
  collection: "#/collection",
  wishlist: "#/wishlist",
  products: "#/products",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
