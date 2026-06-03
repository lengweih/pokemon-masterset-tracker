import heroImage from "./images/screens/hero-image.png";
import titleIcon from "./images/screens/title-icon.png";
import setLogo from "./images/sv8pt5-logo.png";

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
  import.meta.glob<string>("./images/cards/PRE-*.webp", {
    eager: true,
    import: "default",
  }),
);
const fallbackCardImage =
  cardImagesByFileName["PRE-001"] ?? Object.values(cardImagesByFileName)[0] ?? "";

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

export const cardImages = {
  byFileName: cardImagesByFileName,
  sample: fallbackCardImage,
} as const;

export const images = {
  cards: cardImages,
  heroImage,
  setLogo,
  titleIcon,
} as const;
