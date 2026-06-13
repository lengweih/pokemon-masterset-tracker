import { getProductImage } from "../assets/images";
import type { Product } from "../types/product";
import {
  grandmasterPromos,
  svpCardNameByNumber,
  type GrandmasterPromo,
} from "./grandmasterSet";
import { masterCardNameByNumber } from "./masterSet";

// `imageUrl` is resolved from the product image file by name (see
// `getProductImage`); the file lives at
// `src/assets/images/products/<stem>.webp`.
//
// `promoSummary` is the only promo field authored here — the promo card list is
// derived from the shared `grandmasterPromos` source (single source of truth),
// so promo card identities never drift between the grandmaster set and the
// product card.
type ProductInput = Omit<Product, "imageUrl" | "promos"> & {
  image: string;
  promoSummary?: string;
};

const resolvePromoCardName = (promo: GrandmasterPromo) =>
  promo.set === "svp"
    ? svpCardNameByNumber[promo.number]
    : masterCardNameByNumber[promo.number];

// Promo card names per product, derived from the shared promo source. Names are
// de-duped, preserving first-seen order (promos are listed by card number).
const promoCardsByProductId: Record<string, string[]> = (() => {
  const byProduct: Record<string, string[]> = {};
  for (const promo of grandmasterPromos) {
    const name = resolvePromoCardName(promo);
    if (!name) {
      continue;
    }
    for (const productId of promo.productIds) {
      const cards = (byProduct[productId] ??= []);
      if (!cards.includes(name)) {
        cards.push(name);
      }
    }
  }
  return byProduct;
})();

const createProduct = ({
  image,
  promoSummary,
  ...product
}: ProductInput): Product => ({
  ...product,
  imageUrl: getProductImage(image),
  ...(promoSummary
    ? {
        promos: {
          summary: promoSummary,
          cards: promoCardsByProductId[product.id] ?? [],
        },
      }
    : {}),
});

export const products: Product[] = (
  [
    {
      id: "sv8pt5-etb",
      image: "sv8pt5-etb",
      imageAlt: "Prismatic Evolutions Elite Trainer Box product packaging",
      name: "Elite Trainer Box",
      releaseDate: "2025-01-17",
      releaseLabel: "Released Jan 17, 2025",
      promoSummary: "Includes the Eevee promo (#173).",
    },
    {
      id: "sv8pt5-etb-pokemon-center",
      image: "sv8pt5-etb-pc",
      imageAlt:
        "Prismatic Evolutions Pokémon Center Elite Trainer Box product packaging",
      name: "Elite Trainer Box - Pokémon Center",
      releaseDate: "2025-01-17",
      releaseLabel: "Released Jan 17, 2025",
      promoSummary: "Includes the Pokémon Center Eevee promo (#173).",
    },
    {
      id: "sv8pt5-binder",
      image: "sv8pt5-binder",
      imageAlt: "Prismatic Evolutions Binder Collection product packaging",
      name: "Binder Collection",
      releaseDate: "2025-01-17",
      releaseLabel: "Released Jan 17, 2025",
    },
    {
      id: "sv8pt5-tech-sticker-glaceon",
      image: "sv8pt5-tech-sticker-glaceon",
      imageAlt:
        "Prismatic Evolutions Glaceon Tech Sticker Collection packaging",
      name: "Tech Sticker Collection - Glaceon",
      releaseDate: "2025-01-17",
      releaseLabel: "Released Jan 17, 2025",
      promoSummary: "Includes the Cosmos Holo Glaceon promo (#171).",
    },
    {
      id: "sv8pt5-tech-sticker-leafeon",
      image: "sv8pt5-tech-sticker-leafeon",
      imageAlt:
        "Prismatic Evolutions Leafeon Tech Sticker Collection packaging",
      name: "Tech Sticker Collection - Leafeon",
      releaseDate: "2025-01-17",
      releaseLabel: "Released Jan 17, 2025",
      promoSummary: "Includes the Cosmos Holo Leafeon promo (#170).",
    },
    {
      id: "sv8pt5-tech-sticker-sylveon",
      image: "sv8pt5-tech-sticker-sylveon",
      imageAlt:
        "Prismatic Evolutions Sylveon Tech Sticker Collection packaging",
      name: "Tech Sticker Collection - Sylveon",
      releaseDate: "2025-01-17",
      releaseLabel: "Released Jan 17, 2025",
      promoSummary: "Includes the Cosmos Holo Sylveon promo (#172).",
    },
    {
      id: "sv8pt5-poster",
      image: "sv8pt5-poster",
      imageAlt: "Prismatic Evolutions Poster Collection product packaging",
      name: "Poster Collection",
      releaseDate: "2025-01-17",
      releaseLabel: "Released Jan 17, 2025",
      promoSummary:
        "Includes Cosmos Holo promos: Flareon (#167), Vaporeon (#168), and Jolteon (#169).",
    },
    {
      id: "sv8pt5-surprise-box",
      image: "sv8pt5-surprise-box",
      imageAlt: "Prismatic Evolutions Surprise Box product packaging",
      name: "Surprise Box",
      releaseDate: "2025-02-07",
      releaseLabel: "Released Feb 7, 2025",
      promoSummary: "Contains 1 of 9 Eeveelution ex promos (Expansion Stamp).",
    },
    {
      id: "sv8pt5-mini-tin-leafeon",
      image: "sv8pt5-mini-tin-leafeon",
      imageAlt: "Prismatic Evolutions Leafeon Mini Tin product packaging",
      name: "Mini Tin - Leafeon",
      releaseDate: "2025-02-07",
      releaseLabel: "Released Feb 7, 2025",
    },
    {
      id: "sv8pt5-mini-tin-flareon",
      image: "sv8pt5-mini-tin-flareon",
      imageAlt: "Prismatic Evolutions Flareon Mini Tin product packaging",
      name: "Mini Tin - Flareon",
      releaseDate: "2025-02-07",
      releaseLabel: "Released Feb 7, 2025",
    },
    {
      id: "sv8pt5-mini-tin-vaporeon",
      image: "sv8pt5-mini-tin-vaporeon",
      imageAlt: "Prismatic Evolutions Vaporeon Mini Tin product packaging",
      name: "Mini Tin - Vaporeon",
      releaseDate: "2025-02-07",
      releaseLabel: "Released Feb 7, 2025",
    },
    {
      id: "sv8pt5-mini-tin-glaceon",
      image: "sv8pt5-mini-tin-glaceon",
      imageAlt: "Prismatic Evolutions Glaceon Mini Tin product packaging",
      name: "Mini Tin - Glaceon",
      releaseDate: "2025-02-07",
      releaseLabel: "Released Feb 7, 2025",
    },
    {
      id: "sv8pt5-mini-tin-jolteon",
      image: "sv8pt5-mini-tin-jolteon",
      imageAlt: "Prismatic Evolutions Jolteon Mini Tin product packaging",
      name: "Mini Tin - Jolteon",
      releaseDate: "2025-02-07",
      releaseLabel: "Released Feb 7, 2025",
    },
    {
      id: "sv8pt5-mini-tin-espeon",
      image: "sv8pt5-mini-tin-espeon",
      imageAlt: "Prismatic Evolutions Espeon Mini Tin product packaging",
      name: "Mini Tin - Espeon",
      releaseDate: "2025-02-07",
      releaseLabel: "Released Feb 7, 2025",
    },
    {
      id: "sv8pt5-mini-tin-sylveon",
      image: "sv8pt5-mini-tin-sylveon",
      imageAlt: "Prismatic Evolutions Sylveon Mini Tin product packaging",
      name: "Mini Tin - Sylveon",
      releaseDate: "2025-02-07",
      releaseLabel: "Released Feb 7, 2025",
    },
    {
      id: "sv8pt5-mini-tin-umbreon",
      image: "sv8pt5-mini-tin-umbreon",
      imageAlt: "Prismatic Evolutions Umbreon Mini Tin product packaging",
      name: "Mini Tin - Umbreon",
      releaseDate: "2025-02-07",
      releaseLabel: "Released Feb 7, 2025",
    },
    {
      id: "sv8pt5-mini-tin-8-pack",
      image: "sv8pt5-8-pack-mini-tins",
      imageAlt: "Prismatic Evolutions Mini Tin 8-Pack product packaging",
      name: "Mini Tin - 8-Pack",
      releaseDate: "2025-02-07",
      releaseLabel: "Released Feb 7, 2025",
      promoSummary: "Contains all 8 Cosmos Holo Eeveelution promos.",
    },
    {
      id: "sv8pt5-two-pack-blister",
      image: "sv8pt5-two-pack-blister",
      imageAlt: "Prismatic Evolutions Two Pack Blister product packaging",
      name: "Two Pack Blister",
      releaseDate: "2025-02-27",
      releaseLabel: "Released Feb 27, 2025",
      promoSummary: "Includes the Pokémon Day Eevee promo (#074).",
    },
    {
      id: "sv8pt5-booster-bundle",
      image: "sv8pt5-booster-bundle",
      imageAlt: "Prismatic Evolutions Booster Bundle product packaging",
      name: "Booster Bundle",
      releaseDate: "2025-03-07",
      releaseLabel: "Released Mar 7, 2025",
    },
    {
      id: "sv8pt5-accessory-pouch",
      image: "sv8pt5-accessory-pouch",
      imageAlt:
        "Prismatic Evolutions Accessory Pouch Special Collection product packaging",
      name: "Accessory Pouch Special Collection",
      releaseDate: "2025-04-25",
      releaseLabel: "Released Apr 25, 2025",
    },
    {
      id: "sv8pt5-super-premium-collection",
      image: "sv8pt5-super-premium-collection",
      imageAlt:
        "Prismatic Evolutions Super-Premium Collection product packaging",
      name: "Super-Premium Collection",
      releaseDate: "2025-05-16",
      releaseLabel: "Released May 16, 2025",
      promoSummary: "Includes the Eevee ex promo (#174).",
    },
    {
      id: "sv8pt5-lucario-tyranitar-premium-collection",
      image: "sv8pt5-lucario-tyranitar-premium-collection",
      imageAlt:
        "Prismatic Evolutions Lucario ex & Tyranitar ex Premium Collection product packaging",
      name: "Lucario ex & Tyranitar ex Premium Collection",
      releaseDate: "2025-08-01",
      releaseLabel: "Released Aug 2025",
      promoSummary:
        "Expansion Stamp promos: Lucario ex (#051, standard + jumbo) and Tyranitar ex (#064).",
    },
    {
      id: "sv8pt5-lugia-special-collection",
      image: "sv8pt5-lugia-special-collection",
      imageAlt:
        "Prismatic Evolutions Lugia ex Special Collection product packaging",
      name: "Lugia ex Special Collection",
      releaseDate: "2025-08-01",
      releaseLabel: "Released Aug 2025",
      promoSummary:
        "Expansion Stamp promos of Lugia ex (#082, standard + jumbo).",
    },
    {
      id: "sv8pt5-prize-pack-7",
      image: "sv8pt5-prize-pack-7",
      imageAlt: "Play! Pokémon Prize Pack Series 7 packaging",
      name: "Play! Pokémon Prize Pack Series 7",
      releaseDate: "2025-08-14",
      releaseLabel: "Released Aug 14, 2025",
      promoSummary: "Play! Pokémon promos found across Series 7 prize packs.",
    },
    {
      id: "sv8pt5-holiday-calendar-2025",
      image: "sv8pt5-holiday-calendar-2025",
      imageAlt: "Pokémon TCG Holiday Calendar 2025 product packaging",
      name: "Holiday Calendar 2025",
      releaseDate: "2025-08-22",
      releaseLabel: "Released Aug 22, 2025",
      promoSummary: "Includes the Holiday Calendar Glaceon ex promo (#026).",
    },
    {
      id: "sv8pt5-snorlax-blissey-special-collection",
      image: "sv8pt5-snorlax-blissey-special-collection",
      imageAlt:
        "Prismatic Evolutions Snorlax ex & Blissey ex Special Collection product packaging",
      name: "Snorlax ex & Blissey ex Special Collection",
      releaseDate: "2025-09-12",
      releaseLabel: "Released Sep 2025",
      promoSummary:
        "Expansion Stamp promos of Snorlax ex (#076, standard + jumbo).",
    },
    {
      id: "sv8pt5-premium-figure-collection",
      image: "sv8pt5-premium-figure-collection",
      imageAlt:
        "Prismatic Evolutions Premium Figure Collection product packaging",
      name: "Premium Figure Collection",
      releaseDate: "2025-09-26",
      releaseLabel: "Released Sep 26, 2025",
      promoSummary: "Holo promos: Espeon ex (#175) and Umbreon ex (#176).",
    },
    {
      id: "sv8pt5-hydreigon-dragapult-premium-collection",
      image: "sv8pt5-hydreigon-dragapult-premium-collection",
      imageAlt:
        "Prismatic Evolutions Hydreigon ex & Dragapult ex Premium Collection product packaging",
      name: "Hydreigon ex & Dragapult ex Premium Collection",
      releaseDate: "2025-10-03",
      releaseLabel: "Released Oct 3, 2025",
      promoSummary: "Includes the jumbo Dragapult ex promo (#073).",
    },
    {
      id: "sv8pt5-lugia-latias-premium-collection",
      image: "sv8pt5-lugia-latias-premium-collection",
      imageAlt:
        "Prismatic Evolutions Lugia ex & Latias ex Premium Collection product packaging",
      name: "Lugia ex & Latias ex Premium Collection",
      releaseDate: "2025-10-17",
      releaseLabel: "Released Oct 17, 2025",
      promoSummary:
        "Expansion Stamp (Alternate Placement) promos of Lugia ex (#082, standard + jumbo).",
    },
    {
      id: "sv8pt5-prize-pack-8",
      image: "sv8pt5-prize-pack-8",
      imageAlt: "Play! Pokémon Prize Pack Series 8 packaging",
      name: "Play! Pokémon Prize Pack Series 8",
      releaseDate: "2026-01-01",
      releaseLabel: "Released Jan 1, 2026",
      promoSummary: "Play! Pokémon promos found in Series 8 prize packs.",
    },
  ] satisfies readonly ProductInput[]
).map(createProduct);

// Guard against drift: every product referenced by a promo must exist, and
// every product with a summary must resolve to at least one promo card.
if (import.meta.env.DEV) {
  const productIds = new Set(products.map((product) => product.id));
  for (const productId of Object.keys(promoCardsByProductId)) {
    if (!productIds.has(productId)) {
      console.warn(
        `grandmasterPromos references unknown product id: ${productId}`,
      );
    }
  }
  for (const product of products) {
    if (product.promos && product.promos.cards.length === 0) {
      console.warn(`Product "${product.id}" has a promo summary but no cards.`);
    }
  }
}
