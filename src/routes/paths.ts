export const ROUTES = {
  home: "/",
  collection: "/collection",
  wishlist: "/wishlist",
  products: "/products",
  changelog: "/changelog",
} as const;

export const ROUTE_PATTERNS = {
  cardDetail: "/collection/:cardId",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
