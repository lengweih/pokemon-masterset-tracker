import heroImage from "./images/screens/hero-image.png";
import selectorIcon from "./images/screens/selector-icon.png";
import titleIcon from "./images/screens/title-icon.png";
import productAccessoryPouch from "./images/products/sv8pt5-accessory-pouch.png";
import productBinder from "./images/products/sv8pt5-binder.png";
import productBoosterBundle from "./images/products/sv8pt5-booster-bundle.png";
import productEtb from "./images/products/sv8pt5-etb.png";
import productEtbPokemonCenter from "./images/products/sv8pt5-etb-pc.png";
import productPosterCollection from "./images/products/sv8pt5-poster.png";
import productSurpriseBox from "./images/products/sv8pt5-suprise-box.png";
import productTechStickerOne from "./images/products/sv8pt5-tech-sticker-one.png";
import productTechStickerThree from "./images/products/sv8pt5-tech-sticker-three.png";
import productTechStickerTwo from "./images/products/sv8pt5-tech-sticker-two.png";
import setLogo from "./images/sv8pt5-logo.png";

export const productImages = {
  accessoryPouch: productAccessoryPouch,
  binder: productBinder,
  boosterBundle: productBoosterBundle,
  etb: productEtb,
  etbPokemonCenter: productEtbPokemonCenter,
  posterCollection: productPosterCollection,
  surpriseBox: productSurpriseBox,
  techStickerOne: productTechStickerOne,
  techStickerThree: productTechStickerThree,
  techStickerTwo: productTechStickerTwo,
} as const;

export const images = {
  heroImage,
  products: productImages,
  selectorIcon,
  setLogo,
  titleIcon,
} as const;
