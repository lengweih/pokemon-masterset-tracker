// Promo cards a product contains that count toward the grandmaster set. Shown
// as an extra hover/tap hint on the product card, not inline.
export interface ProductPromos {
  // Short summary, e.g. "Contains 1 of 8 Eeveelution promos...".
  summary: string;
  // The promo card names that can be found in this product.
  cards: string[];
}

export interface Product {
  id: string;
  imageAlt: string;
  imageUrl: string;
  name: string;
  releaseDate: string;
  releaseLabel: string;
  promos?: ProductPromos;
}

export type ProductSortOption =
  | "name-asc"
  | "name-desc"
  | "release-newest"
  | "release-oldest";
