import { images } from "../assets/images";
import type {
  CollectionCard,
  CollectionCardRarity,
  CollectionCardType,
  CollectionCardVariant,
  CollectionViewId,
} from "../types/collection";

const baseVariant = {
  id: "base",
  label: "Base",
  tone: "base",
} satisfies CollectionCardVariant;

const reverseHoloVariant = {
  id: "reverse-holo",
  label: "RH",
  tone: "reverse",
} satisfies CollectionCardVariant;

const holoVariant = {
  id: "holo",
  label: "Holo",
  tone: "holo",
} satisfies CollectionCardVariant;

const pokeBallVariant = {
  id: "poke-ball",
  label: "PB",
  tone: "pokeball",
} satisfies CollectionCardVariant;

const masterBallVariant = {
  id: "master-ball",
  label: "MB",
  tone: "masterball",
} satisfies CollectionCardVariant;

const standardPokemonVariants = [
  baseVariant,
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
  baseVariant,
  reverseHoloVariant,
  pokeBallVariant,
] satisfies readonly CollectionCardVariant[];

const foilOnlyVariants = [
  holoVariant,
] satisfies readonly CollectionCardVariant[];

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

const createMasterSetCard = (
  [number, name, rarity, type]: MasterSetCardData,
  variants: readonly CollectionCardVariant[] = getMasterSetVariants(
    rarity,
    type,
  ),
) => {
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

export const collectionCardsByView = {
  master: masterSetCardData.map((card) => createMasterSetCard(card)),
  // Grandmaster set is not modelled yet. Keeping it empty avoids reusing the
  // master set's card IDs, which would otherwise share ownership/wishlist data.
  // To enable it later: populate this array with grandmaster cards (using
  // distinct IDs) and remove the view from `comingSoonCollectionViews` below.
  grandmaster: [] as readonly CollectionCard[],
} satisfies Record<CollectionViewId, readonly CollectionCard[]>;

// Views listed here render a "coming soon" placeholder instead of the browser.
const comingSoonCollectionViews = new Set<CollectionViewId>(["grandmaster"]);

export const isCollectionViewComingSoon = (view: CollectionViewId) =>
  comingSoonCollectionViews.has(view);

// Lookup of every card across all views, keyed by id. Used by pages that work
// from stored card ids (wishlist, card detail) rather than a specific view.
const collectionCardsById = new Map<string, CollectionCard>(
  Object.values(collectionCardsByView)
    .flat()
    .map((card) => [card.id, card]),
);

export const getCollectionCardById = (cardId: string) =>
  collectionCardsById.get(cardId);
