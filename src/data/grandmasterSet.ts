import type {
  CollectionCardRarity,
  CollectionCardType,
  CollectionCardVariant,
} from "../types/collection";

// Single source of truth for the grandmaster set: every promo printing that
// counts toward grandmaster completion, modeled relationally (card ↔ variant ↔
// product). Two kinds of cards carry grandmaster variants:
//   1. PRE master-set cards that also have promo printings (e.g. #005 Leafeon
//      Cosmos Holo). These attach to the existing master-set card by number.
//   2. SVP black-star promo cards (#167–176) — separate cards whose numbers
//      belong to the SVP set (they intentionally collide with PRE secret-rare
//      numbers), defined here in `svpCardData`.
// `collectionCards.ts` composes these into CollectionCards; `products.ts`
// derives each product's promo card list from the `grandmasterPromos` rows.

// --- Variant printings (the "variant types" a promo can be) -----------------

const makeGrandmasterVariant = (id: string, label: string) =>
  ({ id, label, tone: "grandmaster", set: "grandmaster" }) satisfies CollectionCardVariant;

const cosmosHoloVariant = makeGrandmasterVariant("cosmos-holo", "Cosmos");
const expansionStampVariant = makeGrandmasterVariant("expansion-stamp", "Stamp");
const expansionStampJumboVariant = makeGrandmasterVariant(
  "expansion-stamp-jumbo",
  "Stamp J",
);
const expansionStampAltVariant = makeGrandmasterVariant(
  "expansion-stamp-alt",
  "Stamp A",
);
const expansionStampJumboAltVariant = makeGrandmasterVariant(
  "expansion-stamp-jumbo-alt",
  "Stamp JA",
);
const playPokemonVariant = makeGrandmasterVariant("play-pokemon", "Play");
const playPokemonCosmosVariant = makeGrandmasterVariant(
  "play-pokemon-cosmos",
  "Play CH",
);
const pokemonTcgGymVariant = makeGrandmasterVariant("pokemon-tcg-gym", "Gym");
const premierBallLeagueVariant = makeGrandmasterVariant(
  "premier-ball-league",
  "PBL",
);
const premierBallLeagueJudgeVariant = makeGrandmasterVariant(
  "premier-ball-league-judge",
  "PBL J",
);
const holidayCalendarVariant = makeGrandmasterVariant(
  "holiday-calendar",
  "Holiday",
);
const pokemonDayVariant = makeGrandmasterVariant("pokemon-day", "Poké Day");
const jumboVariant = makeGrandmasterVariant("jumbo", "Jumbo");
const professorProgramVariant = makeGrandmasterVariant(
  "professor-program",
  "Prof",
);
// SVP black-star printings.
const holoPromoVariant = makeGrandmasterVariant("holo-promo", "Holo");
const pokemonCenterVariant = makeGrandmasterVariant("pokemon-center", "PC");

// --- Product ids (kept in sync with `products.ts`; validated there) ---------

const ETB = "sv8pt5-etb";
const ETB_POKEMON_CENTER = "sv8pt5-etb-pokemon-center";
const TECH_STICKER_GLACEON = "sv8pt5-tech-sticker-glaceon";
const TECH_STICKER_LEAFEON = "sv8pt5-tech-sticker-leafeon";
const TECH_STICKER_SYLVEON = "sv8pt5-tech-sticker-sylveon";
const POSTER = "sv8pt5-poster";
const SURPRISE_BOX = "sv8pt5-surprise-box";
const MINI_TIN_8_PACK = "sv8pt5-mini-tin-8-pack";
const TWO_PACK_BLISTER = "sv8pt5-two-pack-blister";
const SUPER_PREMIUM = "sv8pt5-super-premium-collection";
const LUCARIO_TYRANITAR = "sv8pt5-lucario-tyranitar-premium-collection";
const LUGIA_SPECIAL = "sv8pt5-lugia-special-collection";
const PRIZE_PACK_7 = "sv8pt5-prize-pack-7";
const HOLIDAY_CALENDAR = "sv8pt5-holiday-calendar-2025";
const SNORLAX_BLISSEY = "sv8pt5-snorlax-blissey-special-collection";
const PREMIUM_FIGURE = "sv8pt5-premium-figure-collection";
const HYDREIGON_DRAGAPULT = "sv8pt5-hydreigon-dragapult-premium-collection";
const LUGIA_LATIAS = "sv8pt5-lugia-latias-premium-collection";
const PRIZE_PACK_8 = "sv8pt5-prize-pack-8";

// --- SVP card table (cards not in the master set) ---------------------------

type SvpCardData = readonly [
  number: string,
  name: string,
  rarity: CollectionCardRarity,
  type: CollectionCardType,
];

export const svpCardData = [
  ["167", "Flareon", "promo", "fire"],
  ["168", "Vaporeon", "promo", "water"],
  ["169", "Jolteon", "promo", "lightning"],
  ["170", "Leafeon", "promo", "grass"],
  ["171", "Glaceon", "promo", "water"],
  ["172", "Sylveon", "promo", "psychic"],
  ["173", "Eevee", "promo", "colorless"],
  ["174", "Eevee ex", "promo", "colorless"],
  ["175", "Espeon ex", "promo", "psychic"],
  ["176", "Umbreon ex", "promo", "darkness"],
] satisfies readonly SvpCardData[];

// --- The relational join: one row per promo printing ------------------------

export interface GrandmasterPromo {
  // Which set the card number belongs to.
  set: "pre" | "svp";
  // Card number within its set.
  number: string;
  // The promo printing.
  variant: CollectionCardVariant;
  // Products this printing is found in (empty when none, e.g. tournament
  // prizes). Many-to-many: a printing can appear in multiple products.
  productIds: readonly string[];
}

const pre = (
  number: string,
  variant: CollectionCardVariant,
  productIds: readonly string[] = [],
): GrandmasterPromo => ({ set: "pre", number, variant, productIds });

const svp = (
  number: string,
  variant: CollectionCardVariant,
  productIds: readonly string[] = [],
): GrandmasterPromo => ({ set: "svp", number, variant, productIds });

// Authored from the grandmaster-set composition reference. PRE rows are ordered
// by card number (and variant order within a number); SVP rows follow.
export const grandmasterPromos: readonly GrandmasterPromo[] = [
  // --- PRE-set promos ---
  pre("004", playPokemonVariant, [PRIZE_PACK_7, PRIZE_PACK_8]),
  pre("004", playPokemonCosmosVariant, [PRIZE_PACK_7, PRIZE_PACK_8]),
  pre("004", pokemonTcgGymVariant),
  pre("004", premierBallLeagueVariant),
  pre("004", premierBallLeagueJudgeVariant),
  pre("005", cosmosHoloVariant, [MINI_TIN_8_PACK]),
  pre("006", expansionStampVariant, [SURPRISE_BOX]),
  pre("006", playPokemonVariant, [PRIZE_PACK_7]),
  pre("013", cosmosHoloVariant, [MINI_TIN_8_PACK]),
  pre("014", expansionStampVariant, [SURPRISE_BOX]),
  pre("014", playPokemonVariant, [PRIZE_PACK_7]),
  pre("022", cosmosHoloVariant, [MINI_TIN_8_PACK]),
  pre("023", expansionStampVariant, [SURPRISE_BOX]),
  pre("023", playPokemonVariant, [PRIZE_PACK_7]),
  pre("025", cosmosHoloVariant, [MINI_TIN_8_PACK]),
  pre("026", expansionStampVariant, [SURPRISE_BOX]),
  pre("026", holidayCalendarVariant, [HOLIDAY_CALENDAR]),
  pre("026", playPokemonVariant, [PRIZE_PACK_7]),
  pre("029", cosmosHoloVariant, [MINI_TIN_8_PACK]),
  pre("030", expansionStampVariant, [SURPRISE_BOX]),
  pre("030", playPokemonVariant, [PRIZE_PACK_7]),
  pre("033", cosmosHoloVariant, [MINI_TIN_8_PACK]),
  pre("034", expansionStampVariant, [SURPRISE_BOX]),
  pre("034", playPokemonVariant, [PRIZE_PACK_7]),
  pre("040", cosmosHoloVariant, [MINI_TIN_8_PACK]),
  pre("040", pokemonDayVariant),
  pre("041", expansionStampVariant, [SURPRISE_BOX]),
  pre("051", expansionStampVariant, [LUCARIO_TYRANITAR]),
  pre("051", expansionStampJumboVariant, [LUCARIO_TYRANITAR]),
  pre("059", cosmosHoloVariant, [MINI_TIN_8_PACK]),
  pre("060", expansionStampVariant, [SURPRISE_BOX]),
  pre("060", playPokemonVariant, [PRIZE_PACK_7]),
  pre("064", expansionStampVariant, [LUCARIO_TYRANITAR]),
  pre("073", jumboVariant, [HYDREIGON_DRAGAPULT]),
  pre("074", pokemonDayVariant, [TWO_PACK_BLISTER]),
  pre("075", expansionStampVariant, [SURPRISE_BOX]),
  pre("075", playPokemonVariant, [PRIZE_PACK_7]),
  pre("076", expansionStampVariant, [SNORLAX_BLISSEY]),
  pre("076", expansionStampJumboVariant, [SNORLAX_BLISSEY]),
  pre("082", expansionStampVariant, [LUGIA_SPECIAL]),
  pre("082", expansionStampAltVariant, [LUGIA_LATIAS]),
  pre("082", expansionStampJumboVariant, [LUGIA_SPECIAL]),
  pre("082", expansionStampJumboAltVariant, [LUGIA_LATIAS]),
  pre("086", playPokemonVariant, [PRIZE_PACK_7]),
  pre("086", pokemonTcgGymVariant),
  pre("109", professorProgramVariant),
  pre("116", playPokemonVariant, [PRIZE_PACK_7, PRIZE_PACK_8]),
  pre("122", professorProgramVariant),
  pre("123", professorProgramVariant),
  pre("124", professorProgramVariant),
  pre("125", professorProgramVariant),
  pre("129", playPokemonVariant, [PRIZE_PACK_8]),
  pre("135", professorProgramVariant),

  // --- SVP-set promos (black star) ---
  svp("167", cosmosHoloVariant, [POSTER]),
  svp("168", cosmosHoloVariant, [POSTER]),
  svp("169", cosmosHoloVariant, [POSTER]),
  svp("170", cosmosHoloVariant, [TECH_STICKER_LEAFEON]),
  svp("171", cosmosHoloVariant, [TECH_STICKER_GLACEON]),
  svp("172", cosmosHoloVariant, [TECH_STICKER_SYLVEON]),
  svp("173", holoPromoVariant, [ETB]),
  svp("173", pokemonCenterVariant, [ETB_POKEMON_CENTER]),
  svp("174", holoPromoVariant, [SUPER_PREMIUM]),
  svp("175", holoPromoVariant, [PREMIUM_FIGURE]),
  svp("176", holoPromoVariant, [PREMIUM_FIGURE]),
];

// --- Derived views ----------------------------------------------------------

const variantsByNumberForSet = (set: "pre" | "svp") =>
  grandmasterPromos.reduce<Record<string, CollectionCardVariant[]>>(
    (byNumber, promo) => {
      if (promo.set === set) {
        (byNumber[promo.number] ??= []).push(promo.variant);
      }
      return byNumber;
    },
    {},
  );

// Grandmaster variants attached to PRE master-set cards, by card number.
export const grandmasterVariantsByNumber: Record<
  string,
  readonly CollectionCardVariant[]
> = variantsByNumberForSet("pre");

// Variants of each SVP promo card, by card number.
export const svpVariantsByNumber: Record<
  string,
  readonly CollectionCardVariant[]
> = variantsByNumberForSet("svp");

// SVP card display name by number (for product promo lists).
export const svpCardNameByNumber: Record<string, string> = Object.fromEntries(
  svpCardData.map(([number, name]) => [number, name]),
);
