# AGENTS.md

You are an expert React, Vite, TypeScript, and Tailwind CSS engineer helping me build **Pokemon Masterset Tracker**.

Write clean, simple, maintainable code. Prioritize clarity over unnecessary abstraction.

Think like a senior frontend developer building a small personal-use web app.

---

# Project Overview

We are building **Pokemon Masterset Tracker**, a simple and lightweight web application for tracking personal Pokémon TCG master sets.

The app currently focuses on the **Prismatic Evolutions** master set and grandmaster set. It may expand to support other Pokémon TCG sets in the future.

The app is for personal use only, so it should stay simple, easy to understand, easy to maintain, and easy to deploy, ideally on **GitHub Pages**.

The app includes:

- A homepage dashboard showing collection progress, statistics, quick actions, and changelogs.
- A collection page for tracking Prismatic Evolutions cards with pagination, search, filters, sorting, and an image-first card grid.
- Tabs for switching between `Master Set` and `Grandmaster Set`.
- Variant tracking for cards, such as base, holo, reverse holo, Poké Ball stamp, Master Ball stamp, promo, cosmos holo, or other set-specific variants.
- A quick add/edit popup that lets users toggle owned variants instantly (no save step), sharing the same variant ownership rows as the card detail page.
- An individual card detail page showing all variants and ownership controls directly on the page.
- A wishlist page showing cards the user has wishlisted.
- A product list page showing products related to the Pokémon TCG set.
- Import/export of collection + wishlist data as a JSON backup, from the
  dashboard quick actions.

Keep the implementation simple and readable.

---

# Source of Truth Files

Use both of these files:

```txt
AGENTS.md
DESIGN.md
```

Read `AGENTS.md` first for:

- project rules
- architecture
- tech stack
- folder structure
- state management
- implementation workflow
- coding standards

Read `DESIGN.md` before making any UI changes.

`DESIGN.md` is the source of truth for:

- colors
- typography
- spacing
- radius
- shadows
- component styling
- page layouts
- responsive behavior
- motion guidelines

If there is a UI conflict, `DESIGN.md` wins.

If there is an architecture, code structure, state management, or workflow conflict, `AGENTS.md` wins.

---

# Tech Stack

Use the existing stack:

- React
- Vite
- TypeScript
- React Router with `HashRouter`
- Tailwind CSS
- localStorage
- GitHub Pages deployment
- `framer-motion` for view/element fade-ins and small UI motion
- `embla-carousel-react` (+ `embla-carousel-autoplay`) for the dashboard wishlist
  preview carousel

Do not introduce new major libraries unless there is a strong reason.

Ask before installing anything new.

---

# Development Philosophy

Build feature by feature.

For every feature:

1. Read this file first.
2. Read `DESIGN.md` if the task involves UI.
3. Keep the implementation simple.
4. Avoid overengineering.
5. Prefer readable code over clever code.
6. Build the smallest useful version first.
7. Refactor only when repetition appears.
8. Do not rewrite unrelated code.
9. Preserve the existing app direction.

This is a lightweight personal project, not a large enterprise app.

---

# Decision Making

If something is unclear or could be improved, suggest a better approach.

If a new library would significantly help:

1. recommend it,
2. explain why,
3. ask before adding it.

Do not install new libraries without approval.

Prefer:

- simple React state
- custom hooks
- typed data files
- localStorage
- small utility functions

Avoid adding complex state management or backend services unless explicitly approved.

---

# Architecture

Use this folder structure:

```txt
src/
  assets/
    images/
  components/
    common/
    collection/
    dashboard/
    navigation/
    product/
    wishlist/
    ui/
  data/
  hooks/
  lib/
  pages/
  routes/
  types/
  App.tsx
  main.tsx
  index.css
```

---

# Folder Responsibilities

## `src/pages/`

Pages are route-level screens only.

Examples:

- `Dashboard.tsx`
- `CollectionPage.tsx`
- `CardDetailPage.tsx`
- `ChangelogPage.tsx`
- `WishlistPage.tsx`
- `ProductListPage.tsx`
- `NotFoundPage.tsx`

Pages should compose components and call hooks.

Do not put large reusable UI blocks or complex business logic directly inside pages.

---

## `src/components/`

Reusable UI components live here.

Create a component when:

- it is reused in multiple places,
- it makes a page easier to read,
- it represents a clear UI concept,
- it keeps logic and markup easier to maintain.

Examples for this app:

- `CollectionCard`
- `VariantSelectorModal`
- `ProgressSummaryCard`
- `CircularProgress`
- `WishlistButton`
- `ProductCard`
- `CardVariantList`
- `PageHeader`
- `AppNavigation`

Do not create components too early.

Start simple, then extract when useful.

## `src/components/common/`

Shared app-level components live here when they are reused across multiple
pages or feature areas but are not small UI primitives.

Examples:

- `PageHeader`
- `ChangelogTimelineEntry`

Use this folder for common composition components, not dashboard-specific
business logic.

---

## `src/components/navigation/`

Navigation-specific UI lives here.

Examples:

- `AppNavigation`
- `NavigationHeader`
- `NavigationPanel`
- `NavigationLinks`
- `MastersetSelector`

Keep navigation components focused on app chrome and navigation behavior. Do not put page content or dashboard business logic here.

---

## `src/components/ui/`

Small reusable UI primitives live here.

Examples:

- `Button`
- `Input`
- `Select`
- `Badge`
- `Tabs`
- `Modal`
- `DataViewToolbar`
- `Pagination`
- `ProgressBar`

Keep these components simple and app-specific.

Do not build a large design system framework unless needed.

Follow `DESIGN.md` for visual styling.

---

## `src/data/`

Hardcoded app data lives here.

Use typed data files for:

- Pokémon card data
- variant definitions
- product list data
- changelog entries
- set metadata

Example files:

```txt
src/data/cards.ts
src/data/products.ts
src/data/changelog.ts
src/data/sets.ts
src/data/variants.ts
```

Keep data typed.

Do not fetch remote data unless explicitly asked.

---

## `src/hooks/`

Reusable logic lives here.

Examples:

- `useLocalStorage`
- `useCollection`
- `useWishlist`
- `useFilteredCards`
- `usePagination`

Hooks should be readable and focused.

Avoid making one large hook that controls the whole app.

---

## `src/lib/`

Utility functions live here.

Examples:

- `cn.ts`
- `collectionProgress.ts`
- `cardFilters.ts`
- `formatCardNumber.ts`
- `storageKeys.ts`

Keep functions pure where possible.

---

## `src/types/`

Shared TypeScript types live here.

Examples:

```txt
src/types/card.ts
src/types/changelog.ts
src/types/collection.ts
src/types/product.ts
src/types/set.ts
```

Use clear names and avoid unnecessary generic types.

---

## `src/assets/`

Images and static assets live here.

Use centralized image imports when possible.

---

# Routing Rules

Use `HashRouter` because the app is intended to deploy easily on GitHub Pages.

Routes should be simple:

```txt
/
#/collection
#/collection/:cardId
#/wishlist
#/products
#/changelog
```

Use route params for the individual card page.

Any unmatched path renders `NotFoundPage` (a catch-all `path="*"` route) — a
simple "Page not found" empty state with a button back to the dashboard. Do not
redirect unknown paths to the dashboard; show the not-found page so the bad URL
stays visible.

Do not use `BrowserRouter` unless deployment is changed away from GitHub Pages.

---

# State Management

Use:

- local component state for temporary UI state,
- custom hooks for reusable state logic,
- localStorage for persisted collection data.

Examples of state this app needs:

- `ownedVariantsByCardId`
- `wishlistCardIds`
- `activeCollectionTab`
- `searchQuery`
- `selectedFilters`
- `sortOption`
- `currentPage`

Do not add Zustand, Redux, Jotai, or other state libraries unless approved.

---

# Persistence Rules

Persist user collection data in localStorage.

Persist:

- owned card variants,
- wishlist cards,
- preferred collection tab if useful.

Do not persist temporary UI state like modal open state.

Use stable localStorage keys in one central file (`src/lib/storageKeys.ts`).
Scope collection and wishlist keys to the specific master set so future sets do
not share ownership data. Keys are built per set so a key for any set can be
derived; `STORAGE_KEYS` is the active set's keys.

```ts
// src/lib/storageKeys.ts
export const CURRENT_SET_ID = "prismatic-evolutions";

export const buildSetStorageKeys = (setId: string) => {
  const prefix = `pokemon-masterset-tracker.${setId}`;
  return {
    collection: `${prefix}.collection`,
    wishlist: `${prefix}.wishlist`,
    preferences: `${prefix}.preferences`,
  };
};

// Keys for the currently active master set (single-set for now).
export const STORAGE_KEYS = buildSetStorageKeys(CURRENT_SET_ID);
```

`mastersetOptions` (`src/data/mastersets.ts`) lists the known set ids; backup
and any future multi-set logic iterate over it.

The `preferences` key currently persists the active collection tab. Read all
persisted values through the `useLocalStorageState` hook with a type-guard
validator so missing or malformed data falls back to a safe default. The
hook reads localStorage on mount and does not sync across separate writes, so
a bulk replace (e.g. importing a backup) reloads the page afterward.

---

# Data Model Guidelines

Cards should support multiple variants.

A card should not simply be marked as owned or not owned. Ownership should be tracked by variant.

Example shape:

```ts
export interface PokemonCard {
  id: string;
  number: string;
  name: string;
  imageUrl: string;
  rarity?: string;
  type?: string;
  variants: CardVariant[];
}

export interface CardVariant {
  id: string;
  label: string;
  tone: string;
}

export type OwnedVariantsByCardId = Record<string, string[]>;
```

Card numbers should display with a `#`.

Example:

```txt
#001
#025
#132
```

---

# Collection Rules

The collection page should support:

- pagination,
- search,
- filtering,
- sorting,
- an image-first card grid,
- master set and grandmaster set tabs,
- quick add/edit variant popup.

Collection cards should:

- keep the same aspect ratio as a modern Pokemon card,
- show the card image as the full visible card by default,
- avoid showing card details, variant tags, or progress by default,
- show card number, card name, wishlist action, and add/edit action in a translucent hover/focus overlay.

The overlay button on a collection card should be:

- `Add` if the user owns zero variants of that card,
- `Edit` if the user owns one or more variants of that card.

## Variant set model (master vs. grandmaster)

Every variant is tagged with a `set` (`CollectionVariantSet`): `"master"` =
obtainable from booster packs, `"grandmaster"` = obtainable outside packs
(promos / special products). A card carries **all** its variants (both sets) in
one list; the two collection tabs are **projections** of the same cards:

- A card appears in a tab only if it has ≥1 variant of that set, showing **only
  that set's variants**. So `pre-005` Leafeon appears in the master tab (NH/RH/PB/MB)
  and in the grandmaster tab (its Cosmos Holo promo).
- The card/variant facts live in two relational source files, joined by a thin
  composition layer:
  - `src/data/masterSet.ts` — the master-set source: card data (#001–180) and the
    master (booster-pack) variant definitions / `getMasterSetVariants`.
  - `src/data/grandmasterSet.ts` — the grandmaster source: the grandmaster variant
    definitions, the SVP black-star promo card data (`svpCardData`), and the
    `grandmasterPromos` join table (one row per promo printing: `set`, `number`,
    `variant`, `productIds`). The per-number variant maps and `products.ts`'s promo
    card lists are **derived** from this table, so promo facts have one home.
  - `src/data/collectionCards.ts` — composition/"ORM" layer: joins the two sources
    into `allCollectionCards` (full cards with full variant lists, the single
    source of truth the app renders) and projects them per set with
    `collectionCardsByView` (`cardsForSet`). `getCollectionCardById` returns the
    **full** card (used by card detail + wishlist).
- **Card IDs are intentionally shared across both tabs** (e.g. `pre-005`).
  Ownership is keyed by card id → owned variant ids; because master and
  grandmaster variant ids differ, one store serves both tabs.

Master set variant types (booster-pack): `non-holo` ("NH", commons/uncommons/
trainers), `holo` ("H", rares/foil-only), `reverse-holo`, `poke-ball`,
`master-ball`. A card's default printing is exactly one of `non-holo` or `holo`
(never both), chosen by rarity in `getMasterSetVariants`; these share the neutral
`default` tone.

Grandmaster (promo) variant types are added per card via
`grandmasterVariantsByNumber` (keyed by card number, derived from the
`grandmasterPromos` join table) and merged in `createMasterSetCard`. They all use
the shared `"grandmaster"` tone. See the grandmaster-set-composition reference for
the full card → variant → product list.

Variants render via the shared `VariantIcon` (see `DESIGN.md` → Variants), which
resolves each variant id to one mark in this order: a custom **logo image**
(`src/assets/images/logos`, e.g. Poké Ball, Master Ball, Play! Pokémon) → a
**letter glyph** (N / H / R, plus the holo promo as H) → a **lucide icon** (e.g.
Cosmos Holo, the Expansion Stamp family, Jumbo, Holiday Calendar) → a labeled pill
fallback for any variant with none of the above. Related variants may
intentionally share one mark (e.g. the Expansion Stamp variants all use the same
icon, both Play! Pokémon variants share one logo); they remain distinguishable by
their full name via `aria-label` / hover tooltip. The full variant name is always
exposed via `aria-label` / `title`.

### Progress

`getCollectionViewProgress(view, owned)` is the single progress helper:

- **Master** progress counts only master variants.
- **Grandmaster** progress is the **superset** — every master + grandmaster
  variant (100% requires the whole master set too). The grandmaster *tab grid*
  still lists only cards that have promo variants; its progress bar counts the
  whole set.

The SVP black-star promos (#167–176) are modelled in `grandmasterSet.ts`
(`svpCardData`, `"promo"` rarity) and appear in the grandmaster tab as their own
cards, counting toward the grandmaster total. Their numbers collide with the
master set's own secret rares, so card identity is **(set, number)** — SVP cards
use `svp-<number>` ids (vs. `pre-<number>`). Their images are not added yet, so
they fall back to the placeholder until `SVP-<n>.webp` files are dropped into
`src/assets/images/cards/` (auto-registered via the glob).

### Editing ownership per tab

Each tab edits only its own set's variants. Single toggles use
`toggleVariantOwnership`; "mark all / clear all" must use `setVariantSetOwnership`
(preserves the other set's owned variants — never `setCardOwnership`, which
replaces the whole card and would wipe the other tab).

Clicking the card should navigate to the card detail page.

The hover overlay (and all `hover:` styles) is gated to hover-capable devices via
Tailwind's `hoverOnlyWhenSupported` (set in `tailwind.config.ts`). This avoids
the touch "sticky hover" bug (e.g. closing the variant modal would otherwise
leave the card under the X stuck in its hovered state). The practical effect on
touch: the quick-action overlay does not appear, so **tapping a card just opens
its detail page** — wishlist and Add/Edit happen there. Keep this flag on; do not
build a separate tap-to-reveal overlay unless explicitly asked.

Clicking the wishlist button should toggle wishlist status and should not accidentally open the detail page.

Clicking the Add/Edit button should open the variant selector modal and should not accidentally open the detail page.

The collection page reads an `ownership` query param to pre-apply the ownership
filter, so the dashboard can deep-link to it (the "Missing Cards" hero CTA and
the "View Missing Cards" quick action both link to
`#/collection?ownership=missing`). A plain string `to` with a query is fine —
React Router parses the search via `parsePath`, so pass `to={`${ROUTES.collection}?ownership=missing`}` directly.

A mounted `ScrollToTop` component scrolls to the top on forward navigations
(not on browser back/forward) so deep-linking into a page starts at the top.

---

# Card Detail Page Rules

The individual card page should show:

- card image,
- card name,
- card number,
- rarity/type if available,
- all variants,
- ownership controls for each variant,
- wishlist toggle.

Variant ownership should be editable directly on the page (toggle each variant;
changes persist immediately). Do not use the quick add/edit popup on the detail
page.

The page also includes: a back link, **context-aware** previous/next card
navigation, a variants-owned progress bar (over **all** the card's variants), and
per-section "mark all / clear all" actions. The detail page is reached with a
`?from=` query param (`grandmaster` / `master` / `wishlist`) recording which list
the user came from; prev/next then cycle **only** that list (computed in
`CardDetailPage` from `collectionCardsByView` or the wishlist ids, never crossing
master ↔ SVP), the back link returns there, and a small browsing-context
indicator shows the list name and the card's position in it. On a bare deep link
(no `?from=`), prev/next and the indicator fall back to the card's own set —
Master for `pre-` cards, Grandmaster for `svp-` cards — so the indicator still
shows. Resolve the card with `getCollectionCardById` (returns the full card)
and reuse `VariantIcon` / `getVariantName` for variant display. Read/write
ownership and wishlist through `useLocalStorageState` on the shared storage keys
so the collection and wishlist pages stay in sync on navigation.

Variants are **grouped by set** into "Master set" and "Grandmaster set" sections
(a section is shown only when the card has variants of that set). Each section
has its own owned count and mark-all/clear-all, scoped via `setVariantSetOwnership`
so editing one set never clears the other.

---

# Wishlist Rules

The wishlist page should show all wishlisted cards.

It should support:

- search,
- sorting,
- summary stats in the header (wishlisted cards, variants owned / total),
- removing cards from wishlist,
- navigation to card detail page.

Reuse the shared `DataViewToolbar` (search + sort) and `Pagination` rather than
building new controls. Resolve wishlisted card IDs to cards with
`getCollectionCardById`. Do not add priority, notes, or "mark collected"
features unless the wishlist data model is expanded beyond a list of card IDs.

If the wishlist is empty, show a clean empty state with a button back to the
collection page. If a search returns no matches, show the standard "no results"
empty state with a clear-search action.

Follow `DESIGN.md` for the wishlist layout and empty state UI.

---

# Product List Rules

The product list page should show products related to the current Pokémon TCG set.

It should support:

- search,
- sorting,
- pagination.

The page is always a card grid — there is no page-size selector and no
grid/list display toggle. The grid uses the shared `useResponsiveGridPageSize`
hook so it shrinks, columns, and paginates like the collection grid, but capped
at 3 columns (product cards carry more horizontal detail than a single card).
See the collection card-grid notes and `DESIGN.md`.

Keep product cards simple.

A product should include:

- name,
- image if available,
- release information if available.

Product cards are a uniform fixed size so the grid stays tidy regardless of
name length.

Some products contain unique promo cards that count toward the grandmaster set
(e.g. the Surprise Box's Eeveelution promos). When a product has a `promos`
field, show a small badge on the card; the promo details (summary + promo
names) stay hidden until the user hovers (desktop) or taps (mobile) the badge,
so they don't clutter the card. Do not show promo info inline by default.

Product images should use centralized image imports when available, and are
normalized (transparent margins trimmed, re-padded to a uniform square) so the
product fills the card frame — see Image Rule.

This app is not a price tracking app unless explicitly expanded later.

---

# Backup / Import-Export Rules

The dashboard quick actions expose **Export Backup** and **Import Collection**,
backed by `src/lib/collectionBackup.ts`.

- **Export Backup** downloads a JSON file of the user's data across every known
  master set: collection (owned variants) + wishlist. Sets with no data are
  omitted.
- **Import Collection** opens a modal that accepts a `.json` file or pasted
  JSON. If existing data is found (`hasExistingCollectionData`), it asks to
  confirm a replace; otherwise it applies immediately. After applying it
  dispatches a same-tab storage-sync event (`notifyLocalStorageChange`) for each
  set's keys so live `useLocalStorageState` consumers re-read; no reload.

The backup is **set-keyed** so it scales to future sets without a format change:

```jsonc
{
  "version": 1,
  "exportedAt": "<ISO timestamp>",
  "sets": {
    "prismatic-evolutions": { "collection": { /* OwnedVariantsByCardId */ }, "wishlist": ["..."] }
  }
}
```

Rules:

- Validate on import with the same type guards used for stored data
  (`isOwnedVariantsByCardId`, `isStringArray`); reject anything without a valid
  `sets` object.
- **Unknown set ids are accepted** on import (forward-compat: a newer backup can
  be restored on an older build).
- Import only overwrites the sets present in the file; sets not in the backup
  are left untouched.
- The backup does not include the `preferences` key (UI state only).

---

# Changelog Rules

The homepage should include a changelog section that previews the latest
entries. Keep the dashboard preview short; the current dashboard should show
the latest 3 entries only.

The full changelog page should live at `#/changelog` and show all changelog
entries.

Use it for changes such as:

- new cards added,
- promo cards added,
- variant corrections,
- product list updates,
- app feature updates.

Keep changelog entries in a typed data file.

---

# UI Rules

For any UI task:

1. Read `DESIGN.md` first.
2. Follow the provided design system.
3. Replicate provided designs as closely as possible.
4. Match layout, spacing, padding, font sizes, font hierarchy, colors, border radius, shadows, alignment, and proportions.
5. Do not approximate unnecessarily.
6. Do not simplify the UI unless explicitly asked.
7. Keep the app clean, soft, modern, and lightweight.
8. Follow the radius hierarchy in `DESIGN.md`: larger corners for outer cards/panels, smaller corners for inner controls, and full pills only for pill-like elements.

The design direction is:

> A modern premium collection management tool, not a gaming HUD.

Do not invent new visual styles unless explicitly asked.

---

# Styling Rules

Use Tailwind CSS classes.

Do not use regular CSS files for component-specific styling unless Tailwind cannot reasonably handle it.

Global CSS should only be used for:

- Tailwind imports,
- CSS variables,
- base styles,
- reusable utility classes,
- app-wide resets.

Prefer reusable class patterns for repeated UI styles.

Follow `DESIGN.md` for exact visual rules.

---

# Image Rule

Use centralized image imports when useful.

1. Check if `src/assets` and an image constants file exist.
2. If not, create one if useful.
3. Import app images there.
4. Use images through the centralized object.

Example:

```ts
import setLogo from "@/assets/images/sv8pt5-logo-2x.webp";

export const images = {
  setLogo,
};
```

Use:

```tsx
<img src={images.setLogo} alt="Prismatic Evolutions logo" />
```

Sets of related images can also be auto-registered with `import.meta.glob`
instead of listing each import (see `eeveelutionHeroImages` and the card glob in
`src/assets/images.ts`).

Do not scatter direct image imports throughout many screens if the same images are reused.

## Product image pipeline

Source product art arrives at varying sizes/formats (PNG/JPG/WebP) with the
product rendered small and centered (wide margins). Two `sharp`-based scripts
normalize it; run them in order after adding new product images to
`src/assets/images/products/`:

1. **`npm run trim-images`** (`scripts/trim-product-images.mjs`) — trims the
   margin and re-pads each image to a uniform square canvas with a small margin
   so products fill the card frame and stay aligned. Handles any raster format
   and outputs normalized **PNGs** (lossless → idempotent; non-PNG sources are
   replaced). Use **`npm run trim-images:new`** (the `--skip-webp` flag) to skip
   already-final `.webp` files and only process newly added PNG/JPG sources —
   much faster when most images are already done (omit it if you dropped in a
   raw `.webp` that still needs normalizing).
2. **`npm run images-to-webp`** (`scripts/product-images-to-webp.mjs`) — converts
   the normalized PNGs to **WebP** to cut file size (like the card images), then
   removes the PNGs. (Only touches PNGs, so finished `.webp` files are already
   skipped.)

Final product images are stored as `.webp`. Both product and card images are
registered via `import.meta.glob` in `src/assets/images.ts`, so new files
**auto-register** — no import edits needed. Resolve a product image by file-name
stem with `getProductImage("sv8pt5-...")`; product data sets an `image` stem and
`createProduct` fills in `imageUrl` (`src/data/products.ts`). Card images resolve
by id via `images.cards.byFileName`.

---

# TypeScript Rules

Use strict TypeScript.

Rules:

- No `any`.
- Prefer clear interfaces and type aliases.
- Keep types simple.
- Avoid overly generic abstractions.
- Type all hardcoded data.
- Type all localStorage parsing results safely.

When unsure, use explicit readable types.

---

# Accessibility Rules

Keep basic accessibility in mind.

- Buttons should be real `<button>` elements.
- Links should be real links.
- Images should have useful `alt` text.
- Modals should be keyboard-friendly where practical.
- Inputs should have labels or accessible names.
- Do not rely on color alone to communicate state.

---

# Performance Rules

This app should stay lightweight.

- Avoid unnecessary libraries.
- Avoid large runtime dependencies.
- Keep data transformations simple.
- Memoize only when there is a real performance issue.
- Do not prematurely optimize.
- Keep images reasonably sized.

---

# GitHub Pages Rules

The app should remain easy to deploy to GitHub Pages.

Use:

- Vite build output,
- HashRouter routing,
- static assets,
- no backend requirement.

Do not introduce server-only features unless explicitly approved.

---

# Secrets

Do not use secret keys in this app.

This is a frontend-only personal app.

If a future feature requires API tokens, server-side work, or private data access, ask before implementing.

Never expose secret keys in client code.

---

# Feature Implementation Workflow

When building a feature:

1. Read this file first.
2. Read `DESIGN.md` if the task involves UI.
3. Identify the files to change.
4. Keep changes focused.
5. Do not rewrite unrelated code.
6. Follow existing project patterns.
7. Follow the design system.
8. Make sure the feature works end to end.
9. Fix lint and type errors before finishing.
10. Explain what changed and how to test it.

---

# Code Quality Rules

Write code that is:

- simple,
- readable,
- typed,
- maintainable,
- easy to modify later.

Avoid:

- clever abstractions,
- large components,
- duplicate logic,
- unnecessary dependencies,
- premature optimization,
- unrelated refactors.

---

# Communication

Be concise.

When finishing a task, explain:

- what changed,
- which files were updated,
- how to test it,
- any assumptions made.

Do not provide long explanations unless asked.

---

# Final Reminder

Before every feature:

- Read this file.
- Read `DESIGN.md` for UI work.
- Follow both files strictly.
- Keep the app simple.
- Use the existing stack.
- Do not add libraries without approval.
- Preserve the premium light dashboard design.
- Build clean, simple, maintainable code.

The final experience should feel like:

> A beautifully organized digital binder for serious Pokémon collectors.
