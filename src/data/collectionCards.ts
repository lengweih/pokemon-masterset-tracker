import { images } from "../assets/images";
import { getCollectionProgress } from "../lib/collectionOwnership";
import type {
  CollectionCard,
  CollectionCardRarity,
  CollectionCardType,
  CollectionCardVariant,
  CollectionVariantSet,
  CollectionViewId,
  OwnedVariantsByCardId,
} from "../types/collection";

const nonHoloVariant = {
  id: "non-holo",
  label: "NH",
  tone: "default",
  set: "master",
} satisfies CollectionCardVariant;

const reverseHoloVariant = {
  id: "reverse-holo",
  label: "RH",
  tone: "reverse",
  set: "master",
} satisfies CollectionCardVariant;

const holoVariant = {
  id: "holo",
  label: "H",
  tone: "holo",
  set: "master",
} satisfies CollectionCardVariant;

const pokeBallVariant = {
  id: "poke-ball",
  label: "PB",
  tone: "pokeball",
  set: "master",
} satisfies CollectionCardVariant;

const masterBallVariant = {
  id: "master-ball",
  label: "MB",
  tone: "masterball",
  set: "master",
} satisfies CollectionCardVariant;

const standardPokemonVariants = [
  nonHoloVariant,
  reverseHoloVariant,
  pokeBallVariant,
  masterBallVariant,
] satisfies readonly CollectionCardVariant[];

const holoPokemonVariants = [
  holoVariant,
  reverseHoloVariant,
  pokeBallVariant,
  masterBallVariant,
] satisfies readonly CollectionCardVariant[];

const standardTrainerVariants = [
  nonHoloVariant,
  reverseHoloVariant,
  pokeBallVariant,
] satisfies readonly CollectionCardVariant[];

const foilOnlyVariants = [
  holoVariant,
] satisfies readonly CollectionCardVariant[];

// Grandmaster (outside-pack / promo) variants. All share the neutral
// "grandmaster" tone for now and render as fallback label pills until each has
// its own icon. Full names live in `variantDisplay.ts`.
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

// Grandmaster variants per master-set card number (from the grandmaster-set
// reference). The SVP black-star promos (#167–176) are intentionally omitted —
// they are new cards that need their own images/IDs.
const grandmasterVariantsByNumber: Record<
  string,
  readonly CollectionCardVariant[]
> = {
  "004": [
    playPokemonVariant,
    playPokemonCosmosVariant,
    pokemonTcgGymVariant,
    premierBallLeagueVariant,
    premierBallLeagueJudgeVariant,
  ],
  "005": [cosmosHoloVariant],
  "006": [expansionStampVariant, playPokemonVariant],
  "013": [cosmosHoloVariant],
  "014": [expansionStampVariant, playPokemonVariant],
  "022": [cosmosHoloVariant],
  "023": [expansionStampVariant, playPokemonVariant],
  "025": [cosmosHoloVariant],
  "026": [expansionStampVariant, holidayCalendarVariant, playPokemonVariant],
  "029": [cosmosHoloVariant],
  "030": [expansionStampVariant, playPokemonVariant],
  "033": [cosmosHoloVariant],
  "034": [expansionStampVariant, playPokemonVariant],
  "040": [cosmosHoloVariant, pokemonDayVariant],
  "041": [expansionStampVariant],
  "051": [expansionStampVariant, expansionStampJumboVariant],
  "059": [cosmosHoloVariant],
  "060": [expansionStampVariant, playPokemonVariant],
  "064": [expansionStampVariant],
  "073": [jumboVariant],
  "074": [pokemonDayVariant],
  "075": [expansionStampVariant, playPokemonVariant],
  "076": [expansionStampVariant, expansionStampJumboVariant],
  "082": [
    expansionStampVariant,
    expansionStampAltVariant,
    expansionStampJumboVariant,
    expansionStampJumboAltVariant,
  ],
  "086": [playPokemonVariant, pokemonTcgGymVariant],
  "109": [professorProgramVariant],
  "116": [playPokemonVariant],
  "122": [professorProgramVariant],
  "123": [professorProgramVariant],
  "124": [professorProgramVariant],
  "125": [professorProgramVariant],
  "129": [playPokemonVariant],
  "135": [professorProgramVariant],
};

const masterSetFoilOnlyRarities = new Set<CollectionCardRarity>([
  "ace-spec-rare",
  "double-rare",
  "hyper-rare",
  "illustration-rare",
  "special-illustration-rare",
  "ultra-rare",
]);

export const collectionCardRarityLabels = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  "double-rare": "Double Rare",
  "ultra-rare": "Ultra Rare",
  "illustration-rare": "Illustration Rare",
  "ace-spec-rare": "ACE SPEC Rare",
  "special-illustration-rare": "Special Illustration Rare",
  "hyper-rare": "Hyper Rare",
} satisfies Record<CollectionCardRarity, string>;

export const collectionCardRarityOrder = [
  "common",
  "uncommon",
  "rare",
  "double-rare",
  "ultra-rare",
  "ace-spec-rare",
  "illustration-rare",
  "special-illustration-rare",
  "hyper-rare",
] satisfies readonly CollectionCardRarity[];

const collectionCardTypeLabels = {
  colorless: "Colorless",
  darkness: "Darkness",
  dragon: "Dragon",
  fighting: "Fighting",
  fire: "Fire",
  grass: "Grass",
  lightning: "Lightning",
  metal: "Metal",
  psychic: "Psychic",
  trainer: "Trainer",
  water: "Water",
} satisfies Record<CollectionCardType, string>;

type CollectionCardInput = {
  id: string;
  name: string;
  number: string;
  rarity: CollectionCardRarity;
  type: CollectionCardType;
  variants: readonly CollectionCardVariant[];
  imageAlt?: string;
};

const getCollectionCardImage = (cardId: string) => {
  const imageKey = cardId.toUpperCase();

  return images.cards.byFileName[imageKey] ?? images.cards.sample;
};

const createCollectionCard = ({
  id,
  imageAlt,
  name,
  number,
  rarity,
  type,
  variants,
}: CollectionCardInput) => {
  return {
    id,
    imageAlt: imageAlt ?? `${name} Pokémon card`,
    imageUrl: getCollectionCardImage(id),
    name,
    number,
    rarity,
    rarityLabel: collectionCardRarityLabels[rarity],
    type,
    typeLabel: collectionCardTypeLabels[type],
    variants,
  } satisfies CollectionCard;
};

type MasterSetCardData = readonly [
  number: string,
  name: string,
  rarity: CollectionCardRarity,
  type: CollectionCardType,
];

const masterSetCardData = [
  ["001", "Exeggcute", "common", "grass"],
  ["002", "Exeggutor", "uncommon", "grass"],
  ["003", "Pinsir", "common", "grass"],
  ["004", "Budew", "common", "grass"],
  ["005", "Leafeon", "rare", "grass"],
  ["006", "Leafeon ex", "double-rare", "grass"],
  ["007", "Cottonee", "common", "grass"],
  ["008", "Whimsicott", "rare", "grass"],
  ["009", "Applin", "common", "grass"],
  ["010", "Dipplin", "uncommon", "grass"],
  ["011", "Hydrapple ex", "double-rare", "grass"],
  ["012", "Teal Mask Ogerpon ex", "double-rare", "grass"],
  ["013", "Flareon", "rare", "fire"],
  ["014", "Flareon ex", "double-rare", "fire"],
  ["015", "Litleo", "common", "fire"],
  ["016", "Pyroar", "uncommon", "fire"],
  ["017", "Hearthflame Mask Ogerpon ex", "double-rare", "fire"],
  ["018", "Slowpoke", "common", "water"],
  ["019", "Slowking", "uncommon", "water"],
  ["020", "Goldeen", "common", "water"],
  ["021", "Seaking", "uncommon", "water"],
  ["022", "Vaporeon", "rare", "water"],
  ["023", "Vaporeon ex", "double-rare", "water"],
  ["024", "Suicune", "uncommon", "water"],
  ["025", "Glaceon", "rare", "water"],
  ["026", "Glaceon ex", "double-rare", "water"],
  ["027", "Wellspring Mask Ogerpon ex", "double-rare", "water"],
  ["028", "Pikachu ex", "double-rare", "lightning"],
  ["029", "Jolteon", "rare", "lightning"],
  ["030", "Jolteon ex", "double-rare", "lightning"],
  ["031", "Iron Hands ex", "double-rare", "lightning"],
  ["032", "Iron Thorns ex", "double-rare", "lightning"],
  ["033", "Espeon", "rare", "psychic"],
  ["034", "Espeon ex", "double-rare", "psychic"],
  ["035", "Duskull", "common", "psychic"],
  ["036", "Dusclops", "common", "psychic"],
  ["037", "Dusknoir", "rare", "psychic"],
  ["038", "Spritzee", "common", "psychic"],
  ["039", "Aromatisse", "common", "psychic"],
  ["040", "Sylveon", "rare", "psychic"],
  ["041", "Sylveon ex", "double-rare", "psychic"],
  ["042", "Scream Tail", "uncommon", "psychic"],
  ["043", "Flutter Mane", "rare", "psychic"],
  ["044", "Munkidori", "rare", "psychic"],
  ["045", "Fezandipiti", "rare", "psychic"],
  ["046", "Iron Boulder", "rare", "psychic"],
  ["047", "Larvitar", "common", "fighting"],
  ["048", "Pupitar", "common", "fighting"],
  ["049", "Groudon", "rare", "fighting"],
  ["050", "Riolu", "common", "fighting"],
  ["051", "Lucario ex", "double-rare", "fighting"],
  ["052", "Hippopotas", "common", "fighting"],
  ["053", "Hippowdon", "common", "fighting"],
  ["054", "Bloodmoon Ursaluna", "rare", "fighting"],
  ["055", "Great Tusk", "uncommon", "fighting"],
  ["056", "Sandy Shocks ex", "double-rare", "fighting"],
  ["057", "Okidogi", "rare", "fighting"],
  ["058", "Cornerstone Mask Ogerpon ex", "double-rare", "fighting"],
  ["059", "Umbreon", "rare", "darkness"],
  ["060", "Umbreon ex", "double-rare", "darkness"],
  ["061", "Sneasel", "common", "darkness"],
  ["062", "Houndour", "common", "darkness"],
  ["063", "Houndoom", "common", "darkness"],
  ["064", "Tyranitar ex", "double-rare", "darkness"],
  ["065", "Roaring Moon", "rare", "darkness"],
  ["066", "Bronzor", "common", "metal"],
  ["067", "Bronzong", "uncommon", "metal"],
  ["068", "Heatran", "uncommon", "metal"],
  ["069", "Duraludon", "common", "metal"],
  ["070", "Archaludon", "rare", "metal"],
  ["071", "Dreepy", "common", "dragon"],
  ["072", "Drakloak", "common", "dragon"],
  ["073", "Dragapult ex", "double-rare", "dragon"],
  ["074", "Eevee", "common", "colorless"],
  ["075", "Eevee ex", "double-rare", "colorless"],
  ["076", "Snorlax ex", "double-rare", "colorless"],
  ["077", "Hoothoot", "common", "colorless"],
  ["078", "Noctowl", "rare", "colorless"],
  ["079", "Dunsparce", "common", "colorless"],
  ["080", "Dudunsparce", "rare", "colorless"],
  ["081", "Miltank", "common", "colorless"],
  ["082", "Lugia ex", "double-rare", "colorless"],
  ["083", "Buneary", "common", "colorless"],
  ["084", "Lopunny", "common", "colorless"],
  ["085", "Fan Rotom", "common", "colorless"],
  ["086", "Regigigas", "uncommon", "colorless"],
  ["087", "Shaymin", "uncommon", "colorless"],
  ["088", "Furfrou", "common", "colorless"],
  ["089", "Hawlucha", "uncommon", "colorless"],
  ["090", "Noibat", "common", "colorless"],
  ["091", "Noivern ex", "double-rare", "colorless"],
  ["092", "Terapagos ex", "double-rare", "colorless"],
  ["093", "Amarys", "common", "trainer"],
  ["094", "Area Zero Underdepths", "uncommon", "trainer"],
  ["095", "Binding Mochi", "uncommon", "trainer"],
  ["096", "Black Belt's Training", "common", "trainer"],
  ["097", "Black Belt's Training", "common", "trainer"],
  ["098", "Black Belt's Training", "common", "trainer"],
  ["099", "Black Belt's Training", "common", "trainer"],
  ["100", "Briar", "uncommon", "trainer"],
  ["101", "Buddy-Buddy Poffin", "uncommon", "trainer"],
  ["102", "Bug Catching Set", "uncommon", "trainer"],
  ["103", "Carmine", "uncommon", "trainer"],
  ["104", "Ciphermaniac's Codebreaking", "uncommon", "trainer"],
  ["105", "Crispin", "uncommon", "trainer"],
  ["106", "Earthen Vessel", "uncommon", "trainer"],
  ["107", "Explorer's Guidance", "uncommon", "trainer"],
  ["108", "Festival Grounds", "uncommon", "trainer"],
  ["109", "Friends in Paldea", "common", "trainer"],
  ["110", "Glass Trumpet", "uncommon", "trainer"],
  ["111", "Haban Berry", "common", "trainer"],
  ["112", "Janine's Secret Art", "uncommon", "trainer"],
  ["113", "Kieran", "uncommon", "trainer"],
  ["114", "Lacey", "uncommon", "trainer"],
  ["115", "Larry's Skill", "common", "trainer"],
  ["116", "Max Rod", "ace-spec-rare", "trainer"],
  ["117", "Maximum Belt", "ace-spec-rare", "trainer"],
  ["118", "Ogre's Mask", "uncommon", "trainer"],
  ["119", "Prime Catcher", "ace-spec-rare", "trainer"],
  ["120", "Professor Sada's Vitality", "uncommon", "trainer"],
  ["121", "Professor Turo's Scenario", "uncommon", "trainer"],
  ["122", "Professor's Research", "common", "trainer"],
  ["123", "Professor's Research", "common", "trainer"],
  ["124", "Professor's Research", "common", "trainer"],
  ["125", "Professor's Research", "common", "trainer"],
  ["126", "Rescue Board", "uncommon", "trainer"],
  ["127", "Roto-Stick", "common", "trainer"],
  ["128", "Scoop Up Cyclone", "ace-spec-rare", "trainer"],
  ["129", "Sparkling Crystal", "ace-spec-rare", "trainer"],
  ["130", "Techno Radar", "uncommon", "trainer"],
  ["131", "Treasure Tracker", "ace-spec-rare", "trainer"],
  ["132", "Amarys", "ultra-rare", "trainer"],
  ["133", "Atticus", "ultra-rare", "trainer"],
  ["134", "Atticus", "ultra-rare", "trainer"],
  ["135", "Brassius", "ultra-rare", "trainer"],
  ["136", "Eri", "ultra-rare", "trainer"],
  ["137", "Friends in Paldea", "ultra-rare", "trainer"],
  ["138", "Giacomo", "ultra-rare", "trainer"],
  ["139", "Larry's Skill", "ultra-rare", "trainer"],
  ["140", "Mela", "ultra-rare", "trainer"],
  ["141", "Ortega", "ultra-rare", "trainer"],
  ["142", "Raifort", "ultra-rare", "trainer"],
  ["143", "Tyme", "ultra-rare", "trainer"],
  ["144", "Leafeon ex", "special-illustration-rare", "grass"],
  ["145", "Teal Mask Ogerpon ex", "special-illustration-rare", "grass"],
  ["146", "Flareon ex", "special-illustration-rare", "fire"],
  ["147", "Ceruledge ex", "special-illustration-rare", "fire"],
  ["148", "Hearthflame Mask Ogerpon ex", "special-illustration-rare", "fire"],
  ["149", "Vaporeon ex", "special-illustration-rare", "water"],
  ["150", "Glaceon ex", "special-illustration-rare", "water"],
  ["151", "Palafin ex", "special-illustration-rare", "water"],
  ["152", "Wellspring Mask Ogerpon ex", "special-illustration-rare", "water"],
  ["153", "Jolteon ex", "special-illustration-rare", "lightning"],
  ["154", "Iron Hands ex", "special-illustration-rare", "lightning"],
  ["155", "Espeon ex", "special-illustration-rare", "psychic"],
  ["156", "Sylveon ex", "special-illustration-rare", "psychic"],
  ["157", "Iron Valiant ex", "special-illustration-rare", "psychic"],
  ["158", "Iron Crown ex", "special-illustration-rare", "psychic"],
  ["159", "Sandy Shocks ex", "special-illustration-rare", "fighting"],
  [
    "160",
    "Cornerstone Mask Ogerpon ex",
    "special-illustration-rare",
    "fighting",
  ],
  ["161", "Umbreon ex", "special-illustration-rare", "darkness"],
  ["162", "Roaring Moon ex", "special-illustration-rare", "darkness"],
  ["163", "Pecharunt ex", "special-illustration-rare", "darkness"],
  ["164", "Gholdengo ex", "special-illustration-rare", "metal"],
  ["165", "Dragapult ex", "special-illustration-rare", "dragon"],
  ["166", "Raging Bolt ex", "special-illustration-rare", "dragon"],
  ["167", "Eevee ex", "special-illustration-rare", "colorless"],
  ["168", "Bloodmoon Ursaluna ex", "special-illustration-rare", "colorless"],
  ["169", "Terapagos ex", "special-illustration-rare", "colorless"],
  ["170", "Amarys", "special-illustration-rare", "trainer"],
  ["171", "Crispin", "special-illustration-rare", "trainer"],
  ["172", "Drayton", "special-illustration-rare", "trainer"],
  ["173", "Janine's Secret Art", "special-illustration-rare", "trainer"],
  ["174", "Kieran", "special-illustration-rare", "trainer"],
  ["175", "Lacey", "special-illustration-rare", "trainer"],
  ["176", "Iron Leaves ex", "hyper-rare", "grass"],
  ["177", "Teal Mask Ogerpon ex", "hyper-rare", "grass"],
  ["178", "Walking Wake ex", "hyper-rare", "water"],
  ["179", "Pikachu ex", "hyper-rare", "lightning"],
  ["180", "Terapagos ex", "hyper-rare", "colorless"],
] satisfies readonly MasterSetCardData[];

const createMasterSetCard = ([
  number,
  name,
  rarity,
  type,
]: MasterSetCardData) => {
  // Each card carries all its variants — master (booster-pack) plus any
  // grandmaster (promo) variants. Views project to a single set below.
  const variants = [
    ...getMasterSetVariants(rarity, type),
    ...(grandmasterVariantsByNumber[number] ?? []),
  ];

  return createCollectionCard({
    id: `pre-${number}`,
    name,
    number,
    rarity,
    type,
    variants,
  });
};

const getMasterSetVariants = (
  rarity: CollectionCardRarity,
  type: CollectionCardType,
) => {
  if (masterSetFoilOnlyRarities.has(rarity)) {
    return foilOnlyVariants;
  }

  if (type === "trainer") {
    return standardTrainerVariants;
  }

  if (rarity === "rare") {
    return holoPokemonVariants;
  }

  return standardPokemonVariants;
};

// Single source of truth: every card with its full variant list (master +
// grandmaster). Used by pages that work from stored card ids (wishlist, card
// detail) where the whole card matters.
const allCollectionCards = masterSetCardData.map((card) =>
  createMasterSetCard(card),
);

// Returns a copy of the card with variants filtered to one set.
const projectCardToSet = (
  card: CollectionCard,
  set: CollectionVariantSet,
): CollectionCard => ({
  ...card,
  variants: card.variants.filter((variant) => variant.set === set),
});

// A view shows only cards that have at least one variant of that set, each
// projected to that set's variants.
const cardsForSet = (set: CollectionVariantSet): readonly CollectionCard[] =>
  allCollectionCards
    .filter((card) => card.variants.some((variant) => variant.set === set))
    .map((card) => projectCardToSet(card, set));

export const collectionCardsByView = {
  master: cardsForSet("master"),
  grandmaster: cardsForSet("grandmaster"),
} satisfies Record<CollectionViewId, readonly CollectionCard[]>;

// Views listed here render a "coming soon" placeholder instead of the browser.
// Currently empty — both master and grandmaster are live.
const comingSoonCollectionViews = new Set<CollectionViewId>([]);

export const isCollectionViewComingSoon = (view: CollectionViewId) =>
  comingSoonCollectionViews.has(view);

const collectionCardsById = new Map<string, CollectionCard>(
  allCollectionCards.map((card) => [card.id, card]),
);

export const getCollectionCardById = (cardId: string) =>
  collectionCardsById.get(cardId);

// Previous/next cards in set order, for card detail navigation.
export const getCollectionCardNeighbors = (cardId: string) => {
  const index = allCollectionCards.findIndex((card) => card.id === cardId);

  return {
    previousCard: index > 0 ? allCollectionCards[index - 1] : undefined,
    nextCard:
      index >= 0 && index < allCollectionCards.length - 1
        ? allCollectionCards[index + 1]
        : undefined,
  };
};

// Progress scope per view: master counts master variants; grandmaster is the
// full set — every master + grandmaster variant. (SVP promos #167–176 are not
// modelled yet, so the grandmaster total excludes them until added.)
export const getCollectionViewProgress = (
  view: CollectionViewId,
  ownedVariantsByCardId: OwnedVariantsByCardId,
) =>
  view === "grandmaster"
    ? getCollectionProgress(allCollectionCards, ownedVariantsByCardId)
    : getCollectionProgress(collectionCardsByView.master, ownedVariantsByCardId);
