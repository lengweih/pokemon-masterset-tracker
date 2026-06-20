# Pokémon Masterset Tracker

A lightweight, personal-use React app for tracking Pokémon TCG master sets —
currently the **Prismatic Evolutions** master set and grandmaster (promo) set.
It's a small static dashboard: card data lives in typed files, ownership/wishlist
state lives in `localStorage`, and it's built to deploy easily to GitHub Pages.


## Tech stack

- React + Vite + TypeScript
- Tailwind CSS
- React Router (`HashRouter`, for GitHub Pages)
- Framer Motion (small UI animations)
- Embla Carousel (dashboard wishlist preview)
- State persisted in `localStorage`

## Getting started

Requires Node 22+ (CI builds on Node 22).

```bash
npm install
npm run dev        # local dev server
```

## Scripts

```bash
npm run dev              # start dev server
npm run build            # type-check + production build to dist/
npm run lint             # eslint
npm run preview          # preview the production build
npm run trim-images      # normalize product images (see Images)
npm run images-to-webp   # convert normalized product PNGs to WebP
```

## Updating content (the important bit)

Where to change things when adding/editing content later:

- **Cards (images):** drop `PRE-<number>.webp` into `src/assets/images/cards/`.
  They auto-register by filename via a glob — no import needed.
- **Card / variant data:** `src/data/masterSet.ts` (booster-pack variants) and
  `src/data/grandmasterSet.ts` (promo variants + SVP black-star promos). They're
  joined into the rendered cards in `src/data/collectionCards.ts`.
- **Products:** add entries in `src/data/products.ts` and art in
  `src/assets/images/products/`. Each product's promo card list is **derived**
  from `grandmasterSet.ts`, so you don't hand-maintain it.
- **A new set:** add it to `src/data/mastersetOptions.ts` (the set selector) and
  set `CURRENT_SET_ID` in `src/lib/storageKeys.ts` (storage keys are scoped per
  set so sets don't share ownership data).
- **Changelog & app version:** edit `src/data/changelog.ts`. Entries are
  **newest-first**; the top entry's `version` automatically becomes the version
  shown in the footer (there is no separate version constant to update).

## Images

- Everything shipped is **WebP** (cards, products, logos, hero, background); the
  favicon is a small PNG.
- Card files must be named `PRE-<number>.webp` (master set) or
  `SVP-<number>.webp` (Scarlet & Violet promos) — that naming is how they map to
  card data.
- New **product** images: run `npm run trim-images` then `npm run images-to-webp`
  to normalize + compress them.
- One-off images (logos, hero, decorative): just convert to WebP and keep them
  sized close to how they're displayed (they're not auto-processed).

## Deployment

- Work on the `develop` branch; **merge/push to `main` to release.**
- `.github/workflows/deploy.yml` runs on pushes to `main`: it builds the Vite app
  and publishes `dist/` to GitHub Pages. In GitHub, `Settings → Pages → Source`
  must be set to **GitHub Actions**.
- `HashRouter` is used so deep links work on Pages; the Vite `base` path is set
  automatically from the repo name in CI.
- Production URL: `https://lengweih.github.io/pokemon-masterset-tracker/`

## Project docs

- `AGENTS.md` — architecture, folder structure, data model, coding conventions.
  Read before changing structure or behavior.
- `DESIGN.md` — the design system (colors, spacing, components, page layouts).
  Read before UI changes.
- `TESTING.md` — a manual test checklist to run through after changes.
