export interface Product {
  id: string;
  imageAlt: string;
  imageUrl: string;
  name: string;
  releaseDate: string;
  releaseLabel: string;
}

export type ProductSortOption =
  | "name-asc"
  | "name-desc"
  | "release-newest"
  | "release-oldest";

export type ProductViewMode = "grid" | "list";
