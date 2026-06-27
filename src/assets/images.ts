// Build a `{ fileNameWithoutExtension -> url }` map from an eager glob so new
// images auto-register without editing this file.
const toFileNameMap = (modules: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(modules).map(([path, imageUrl]) => {
      const fileName = (path.split("/").pop() ?? "").replace(/\.[^.]+$/, "");
      return [fileName, imageUrl];
    }),
  ) as Record<string, string>;

const cardImagesByFileName = toFileNameMap(
  // Matches PRE-*.webp today and SVP-*.webp once those promo images are added,
  // so new card images auto-register without editing this file.
  import.meta.glob<string>("./images/cards/*.webp", {
    eager: true,
    import: "default",
  }),
);
const fallbackCardImage =
  cardImagesByFileName["PRE-001"] ??
  Object.values(cardImagesByFileName)[0] ??
  "";

const productImagesByFileName = toFileNameMap(
  import.meta.glob<string>("./images/products/*.webp", {
    eager: true,
    import: "default",
  }),
);

// Resolves a product image by its file name (without extension), e.g.
// `getProductImage("sv8pt5-etb")`.
export const getProductImage = (fileName: string): string =>
  productImagesByFileName[fileName] ?? "";

// Logos: variant-icon artwork (Poké Ball, Play! Pokémon, etc.) plus the set
// logo, all stored as WebP. New files auto-register without editing this file.
const logoImagesByFileName = toFileNameMap(
  import.meta.glob<string>("./images/logos/*.webp", {
    eager: true,
    import: "default",
  }),
);

// Resolves a logo image by file name (without extension), e.g.
// `getLogoImage("pokeball")`.
export const getLogoImage = (fileName: string): string =>
  logoImagesByFileName[fileName] ?? "";

const setLogo = getLogoImage("sv8pt5-logo");

// Eeveelution "diamond" hero artwork (decorative/hero-<name>.webp) used by the
// dashboard hero mosaic. Excludes the old combined hero-image. Order doesn't
// matter — the mosaic places them randomly.
const decorativeImagesByFileName = toFileNameMap(
  import.meta.glob<string>("./images/decorative/hero-*.webp", {
    eager: true,
    import: "default",
  }),
);
export const eeveelutionHeroImages = Object.entries(decorativeImagesByFileName)
  .filter(([fileName]) => fileName !== "hero-image")
  .map(([, url]) => url);

export const cardImages = {
  byFileName: cardImagesByFileName,
  sample: fallbackCardImage,
} as const;

export const images = {
  cards: cardImages,
  setLogo,
} as const;
