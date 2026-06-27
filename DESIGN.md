# Masterset Tracker — Design System

This file is the source of truth for the visual design of **Masterset Tracker**.

Use this file for all UI decisions, including:

- colors
- typography
- spacing
- radius
- shadows
- component styling
- page layouts
- responsive behavior
- motion guidelines

If this file conflicts with `AGENTS.md`, follow this file for UI and visual decisions.

---

# 1. Product Feel

Masterset Tracker is a simple and lightweight Pokémon TCG master set tracking web application.

The UI should feel:

- collectible
- organized
- soft
- modern
- premium
- lightweight
- slightly prismatic

The app should feel like:

> A beautifully organized digital binder for serious Pokémon collectors.

It should not feel like:

- a gaming HUD
- a Pokémon fan site
- a flashy TCG simulator
- a neon cyberpunk dashboard
- an anime-themed interface

---

# 2. Core Design Direction

Use a clean premium dashboard style.

The visual language should use:

- white/light surfaces
- pale gray backgrounds
- soft rounded cards
- subtle borders
- minimal shadows
- blue/violet/cyan brand accents
- gradient emphasis
- generous whitespace
- clean data presentation
- card-collection focused layouts

The design should prioritize:

- readability
- scannability
- simple interactions
- clear collection progress
- fast navigation
- calm visual hierarchy

---

# 3. Color System

## Core Tokens

```css
:root {
  --bg: #F8F9FC;

  --surface: #FFFFFF;
  --surface-secondary: #F6F7FB;
  --surface-hover: #F3F4FA;

  --text-primary: #0F172A;
  --text-secondary: #5B6478;
  --text-muted: #8A94A6;

  --border: #EEF2F8;
  --border-strong: #DDE5F0;

  --primary: #5B5CF0;
  --primary-hover: #4B4CE2;
  --primary-light: #EEF0FF;

  --blue: #2F80FF;
  --violet: #7B61FF;
  --purple: #C061FF;
  --cyan: #06B6D4;

  --success: #22C55E;
  --success-bg: #EAFBF1;

  --warning: #F59E0B;
  --warning-bg: #FFF7E7;

  --danger: #F43F5E;
  --danger-bg: #FFF1F3;

  --info: #06B6D4;
  --info-bg: #ECFEFF;

  --gradient-brand:
    linear-gradient(
      135deg,
      #2F80FF 0%,
      #7B61FF 55%,
      #C061FF 100%
    );
}
```

---

## Gradient Usage

Use gradients only for important emphasis.

Good uses:

- primary CTA buttons
- progress indicators
- selected states
- active tabs
- hero emphasis text
- highlighted stats
- important icons

Avoid:

- full-page gradients
- heavy rainbow effects
- neon backgrounds
- gradients on every card
- random accent colors

---

# 4. Typography

## Font Stack

Use a clean geometric sans-serif.

Recommended primary font:

```css
--font-sans:
  Inter,
  ui-sans-serif,
  system-ui,
  sans-serif;
```

Good alternatives:

- Plus Jakarta Sans
- General Sans
- Satoshi

---

## Typography Scale

### Hero Display

```css
font-size: 64px;
font-weight: 800;
line-height: 1;
letter-spacing: -0.04em;
```

Used for large homepage hero titles.

---

### H1

```css
font-size: 48px;
font-weight: 700;
line-height: 1.1;
letter-spacing: -0.03em;
```

---

### H2

```css
font-size: 36px;
font-weight: 700;
line-height: 1.2;
letter-spacing: -0.025em;
```

---

### H3

```css
font-size: 28px;
font-weight: 700;
line-height: 1.3;
letter-spacing: -0.02em;
```

---

### Card Title

```css
font-size: 18px;
font-weight: 600;
line-height: 1.4;
```

---

### Body

```css
font-size: 15px;
font-weight: 500;
line-height: 1.6;
```

---

### Label

```css
font-size: 13px;
font-weight: 600;
line-height: 1.4;
```

---

### Tiny Tag

```css
font-size: 11px;
font-weight: 600;
line-height: 1;
```

---

# 5. Spacing System

Use Tailwind's default spacing scale as the base. Do not replace or redefine the default Tailwind spacing scale in `tailwind.config.ts`.

Prefer standard Tailwind spacing values for component layout:

```txt
gap-3  = 12px
gap-4  = 16px
gap-6  = 24px
p-5    = 20px
px-6   = 24px
py-4   = 16px
py-6   = 24px
```

The project extends spacing only for app-specific values that are repeatedly useful.

## Project Spacing Tokens

```txt
page    = 32px
card    = 24px
section = 48px
```

Avoid arbitrary spacing values unless there is a specific visual reason. Current accepted screenshot-matching exceptions are:

```txt
Dashboard hero diamond tile width ≈ 100px (the eeveelution mosaic)
Wishlist preview card thumbnail = w-24 (96px) below sm, w-28 (112px) at sm+
```

Keep these exceptions local to the layout component that needs them.

---

# 6. Radius System

## Radius Tokens

```css
--radius-sm: 10px;
--radius-md: 14px;
--radius-lg: 18px;
--radius-xl: 24px;
--radius-pill: 999px;
```

---

## Usage Rules

| Component | Radius |
|---|---|
| Inputs/selects | 14px |
| Buttons/nav links/action rows | 14px |
| Dropdown/listbox menus | 14px |
| Dropdown/listbox options | 14px |
| Compact pager buttons (pagination + card-detail prev/next) | 8px (`rounded-lg`) |
| Standard cards | 20px |
| Larger panels | 24px |
| Modals | 24px |
| Tags/Pills | 999px |
| Progress bars | 999px |

The app should feel soft and rounded, not sharp.

Use radius as hierarchy:

- Outer content surfaces use larger corners.
- Inner controls use smaller corners.
- Pills use fully rounded corners.

Do not make every rounded element use the same radius. Cards, panels, and
controls should feel related, but controls inside cards should be slightly
tighter than the card that contains them.

When a dropdown or listbox overlaps nearby inner controls, match the menu
surface to the inner-control radius (`14px`) so the exposed corners feel
consistent. Treat dropdown menus as expanded controls, not as full cards.

Compact pager-style controls use a smaller `rounded-lg` (8px) radius — tighter
than the standard `14px` button so small (~30px) square buttons don't look
overly rounded. This applies to the pagination buttons (prev/next **and** the
numbered/current-page buttons) and the card detail page's prev/next card
navigation, which share the same look. Keep these in sync at `rounded-lg`; don't
spread other one-off radius values through the app.

Current Tailwind radius aliases:

```txt
rounded-button = 14px
rounded-card   = 20px
rounded-modal  = 24px
rounded-pill   = 999px
```

Tailwind's default radius scale should remain available. Do not override default classes like `rounded-xl`; use the app aliases above for design-system surfaces.

---

# 7. Shadow System

Shadows should be extremely subtle but visible enough to create the glass-card
separation shown in the home reference screenshot.

Outer framed surfaces should use the shared shadow helpers instead of one-off
shadow values. This keeps the app consistent as new cards, panels, and modals
are added while avoiding stacked shadows inside a single container.

## Shadow Tokens

```css
--shadow-sm:
  inset 1px 0 0 rgba(148, 163, 184, 0.18),
  inset -1px 0 0 rgba(148, 163, 184, 0.18),
  inset 0 1px 0 rgba(148, 163, 184, 0.14),
  inset 0 1px 0 rgba(255, 255, 255, 0.86),
  0 3px 3px -2px rgba(15, 23, 42, 0.12),
  0 8px 10px -7px rgba(15, 23, 42, 0.2);

--shadow-md:
  inset 1px 0 0 rgba(148, 163, 184, 0.18),
  inset -1px 0 0 rgba(148, 163, 184, 0.18),
  inset 0 1px 0 rgba(148, 163, 184, 0.14),
  inset 0 1px 0 rgba(255, 255, 255, 0.86),
  0 3px 4px -2px rgba(15, 23, 42, 0.14),
  0 10px 14px -9px rgba(15, 23, 42, 0.24);

--shadow-lg:
  inset 1px 0 0 rgba(148, 163, 184, 0.18),
  inset -1px 0 0 rgba(148, 163, 184, 0.18),
  inset 0 1px 0 rgba(148, 163, 184, 0.14),
  inset 0 1px 0 rgba(255, 255, 255, 0.86),
  0 4px 6px -3px rgba(15, 23, 42, 0.16),
  0 12px 18px -11px rgba(15, 23, 42, 0.26);

--inner-ring:
  inset 0 0 0 1px rgba(148, 163, 184, 0.1),
  inset 0 1px 0 rgba(255, 255, 255, 0.86);
```

---

## Shadow Rules

Use shadows to create gentle separation only.

The shared shadow recipe is:

- an inset left and right edge ring,
- a subtle inset top edge ring,
- a soft white top highlight,
- a compact bottom shadow positioned slightly below the surface.

Do not use an outer ring-style `box-shadow` around all four sides. It can render
unevenly on repeated cards because of subpixel alignment. Use the real border
plus the inset edge layers above instead.

Outer framed UI should use one of:

```txt
shadow-soft-sm
shadow-soft-md
shadow-soft-lg
```

Normal standalone cards use `shadow-soft-sm`. Larger panels use
`shadow-soft-md`. Modals use `shadow-soft-lg`.

Nested controls inside an already-shadowed panel should stay flat. This includes
selectors, secondary buttons, icon buttons, inputs, action rows, the navigation
masterset selector, and navigation links. Use `border-border-strong`,
`inner-ring`, background states, and color for these inner pieces instead of
`shadow-soft-*`.

Avoid:

- harsh black shadows
- dramatic floating effects
- dark glows
- heavy elevation
- neumorphism

The interface should feel lightweight and premium.

---

# 8. Layout System

## Core Layout Values

| Property | Value |
|---|---|
| Desktop navigation width | 280px |
| Content max width | 1440px |
| Home page padding | 12px base, 20px desktop horizontal/top |
| Home page outer gap | 12px |
| Dashboard section gap | 12px |
| Dashboard row/card gap | 12px |
| Navigation inner gap | 12px |
| Footer height | 56px |

## Responsive Breakpoints

Use Tailwind's default breakpoints for normal responsive layout. The project
also defines two extra mobile breakpoints:

```txt
2xs = 420px
xs = 560px
```

Use `2xs:` for very narrow phone refinements and `xs:` for small phone
refinements that should start before Tailwind's default `sm` breakpoint at
640px.

The `page` token remains `32px` for generic page shells. The current home layout intentionally uses tighter `px-3` / `py-3` spacing, with `lg:px-5` and `lg:pt-5`, to match the reference screenshot.

The current home page shell uses:

```tsx
mx-auto flex min-h-screen w-full max-w-content flex-col gap-3 px-3 py-3 lg:px-5 lg:pt-5
```

The current desktop home layout uses:

```tsx
grid flex-1 items-stretch gap-3 lg:grid-cols-[280px_minmax(0,1096px)] lg:justify-center
```

`1096px` is not a semantic breakpoint. It is the current maximum dashboard column width inside the 1440px page shell after subtracting page padding, desktop navigation width, and the navigation/dashboard gap.

Above the desktop cap, the home layout should stop stretching and remain centered. Below the cap, the layout should shrink responsively.

The dashboard column should use `self-start` so it keeps its natural content height. The desktop navigation column may stretch to fill the row height.

## Current Home Layout Dimensions

| Section | Current Size / Layout |
|---|---|
| Mobile navigation bar | `h-16`, visible below `lg` |
| Desktop navigation column | `w-navigation`, `gap-3`, hidden below `lg` |
| Navigation header | natural height, `surface-panel`, `gap-2` |
| App brand block | `h-14` |
| Masterset selector button | `h-12` |
| Navigation panel | `h-auto`, `lg:flex-1` |
| Navigation links | four `h-14` rows with `gap-2` |
| Dashboard hero | natural height; eeveelution diamond mosaic on the right, hidden below `md` |
| Dashboard wishlist preview | thumbnail carousel (Embla), viewport capped at 7 cards (`max-w-[744px]` / `sm:max-w-[856px]`), centered, fades in after images load |
| Dashboard cards | stacked below `xl`, `xl:grid-cols-[1fr_0.9fr_1.1fr]` |
| Footer | `h-14` on desktop, `min-h-14` with wrapping on small screens |

---

## Responsive Card Grid

The collection and product card grids share one behavior via the
`useResponsiveGridPageSize` hook (`src/hooks/useResponsiveGridPageSize.ts`), so
they shrink, reflow, and paginate identically. The hook takes a preset and
returns the matching grid classes plus a page size that always fills whole rows.

| Preset | Columns | Page size (cols × rows) |
|---|---|---|
| `FOUR_COLUMN_CARD_GRID` (collection) | 2 → 3 (≥640px) → 4 (≥960px) | 2 rows on mobile, 3 rows otherwise |
| `THREE_COLUMN_CARD_GRID` (products) | 2 → 3 (≥640px) | 2 rows on mobile, 3 rows otherwise |

When a grid spans more than one page, fill the trailing gap with invisible
placeholder tiles so the last page keeps the same row structure. Do not
re-introduce a per-page-size selector; the page size is derived from the column
count.

## Background Rules

The main app background should use:

- pale gray/white
- the repeated texture asset `src/assets/images/bg-pattern-l.jpg`
- `var(--bg)` as the fallback background color
- `background-position: top left`
- `background-repeat: repeat`
- extremely low contrast decorative details

Avoid:

- noisy backgrounds
- dark textures
- oversized decorative graphics
- high contrast patterns
- replacing the global pattern with page-level gradients unless explicitly requested

---

# 9. Component Guidelines

# Buttons

## Primary Button

Used for:

- Save
- Add
- View Collection
- main CTAs

```css
height: 48px;
padding: 0 24px;
border-radius: 14px;
font-weight: 600;

background: var(--gradient-brand);
color: white;
```

Tailwind helper:

```txt
btn-primary = h-12 rounded-button px-6 text-label bg-gradient-brand text-white
```

Primary buttons should feel prominent but not loud.

---

## Secondary Button

Used for secondary actions.

```css
height: 48px;
padding: 0 20px;
border-radius: 14px;
font-weight: 600;

background: white;
border: 1px solid var(--border-strong);
color: var(--text-primary);
```

Tailwind helper:

```txt
btn-secondary = h-12 rounded-button border border-border-strong bg-surface px-5 text-label text-text-primary inner-ring
```

---

## Ghost Button

Used for subtle actions.

```css
height: 40px;
padding: 0 12px;
background: transparent;
border: none;
color: var(--text-secondary);
```

Use ghost buttons sparingly.

---

# Inputs and Selects

## Base Style

```css
height: 48px;
border-radius: 14px;
background: white;
border: 1px solid var(--border-strong);
color: var(--text-primary);
padding: 0 16px;
box-shadow: var(--inner-ring);
```

Use `input-field` and `select-field` for the current shared input styling.

---

## Focus State

```css
border-color: var(--primary);

box-shadow:
  0 0 0 4px rgba(91, 92, 240, 0.12);
```

---

# Cards

## Standard Card

Use `surface-card` for normal cards and blank card placeholders.

```css
background: white;
border: 1px solid var(--border);
border-radius: 20px;
padding: 20px;

box-shadow: var(--shadow-sm);
```

Tailwind helper:

```txt
surface-card = rounded-card border border-border bg-surface p-5 shadow-soft-sm
```

---

## Standard Panel

Use `surface-panel` for larger framed dashboard/navigation sections.

```css
background: white;
border: 1px solid var(--border);
border-radius: 24px;
padding: 24px 16px;

box-shadow: var(--shadow-md);
```

Tailwind helper:

```txt
surface-panel = rounded-modal border border-border bg-surface px-4 py-6 shadow-soft-md
```

---

## Blank Placeholder

Use the `empty-state` utility for empty placeholder sections.

Variants:

```txt
card        -> surface-card
panel       -> surface-panel
placeholder -> inner-ring rounded-button bg-surface-secondary
```

Blank inner blocks may use the `placeholder` variant when grey placeholders are needed to show structure inside a white panel. Placeholder blocks should use `inner-ring`, not `shadow-soft-*`.

---

## Interactive Card Hover

```css
transform: translateY(-2px);
transition: 180ms ease;
```

Hover effects should be subtle.

Avoid large movement or dramatic shadows.

---

## Summary Stat Tile

Compact stat tiles used in page headers/heroes (collection, product list, and
wishlist). Use the shared `StatCard` component for all of them instead of
restyling per screen. Tiles are nested inside a `surface-card`, so they stay flat
(`inner-ring`, not `shadow-soft-*`).

```txt
inner-ring flex h-24 items-center gap-4 rounded-card bg-surface p-4
```

Each tile has a circular icon chip (`h-14 w-14 rounded-full bg-primary-light
text-brand-blue`), a `13px` semibold label, and a `30px` semibold value in
`text-brand-blue`. `StatCard` also accepts a `leading` element to replace the
icon chip with custom content (e.g. the collection progress ring).

### Stat tile responsive ladder

When a header shows a row of stat tiles, use this ladder:

- smallest screens: stacked, full width (one column)
- `xs` and up: side by side, full-width halves
- `lg` and up: each tile a fixed `270px`, flush left (not stretched)

A single stat tile follows the same idea: full width below `lg`, fixed `270px`
flush left at `lg` and up.

---

# Progress Indicators

## Linear Progress

Used for:

- collection progress
- ownership tracking
- dashboard summaries

```css
height: 8px;
border-radius: 999px;
background: #E9ECF3;
```

Progress fill:

```css
background: var(--gradient-brand);
```

---

## Circular Progress

Used in:

- hero stats
- collection summaries
- overview cards

Rules:

- thick stroke
- minimal labels
- clean center
- large percentage number
- small supporting label
- avoid clutter

---

# Tags and Pills

## Base Style

```css
height: 22px;
padding: 0 8px;

font-size: 11px;
font-weight: 600;

border-radius: 999px;
```

---

## Variants (icons)

Card variants render as the shared `VariantIcon` (an 8×8 box, no chip
background). Each variant id resolves to a single mark in this order:

1. **Logo image** — custom artwork in `src/assets/images/logos`, drawn at its
   natural color (no tint). Used for Poké Ball, Master Ball, Play! Pokémon,
   Pokémon TCG Gym, Premier Ball League, Pokémon Day, Professor Program, and
   Pokémon Center.
2. **Letter glyph** — a bold single letter for the foil families: `N` (Non-Holo),
   `H` (Holo), `R` (Reverse Holo). The grandmaster Holo promo also renders `H`.
3. **Lucide icon** — a plain outlined icon (no background chip) for the remaining
   grandmaster variants: Cosmos Holo (`Sparkles`), the Expansion Stamp family
   (`CircleStar`), Jumbo (`Scaling`), Holiday Calendar (`Calendar`).
4. **Labeled pill fallback** — the tone-colored `badge` with the variant's short
   label, for any variant id not covered above. (Currently every variant resolves
   to a mark above, so the pill is a safety fallback.)

| Variant | Mark |
|---|---|
| Non-Holo | letter `N` |
| Holo / Holo (promo) | letter `H` |
| Reverse Holo | letter `R` |
| Poké Ball / Master Ball | logo image |
| Cosmos Holo | `Sparkles` icon |
| Expansion Stamp (all four) | `CircleStar` icon |
| Jumbo | `Scaling` icon |
| Holiday Calendar | `Calendar` icon |
| Play! Pokémon, TCG Gym, Premier Ball League, Pokémon Day, Professor Program, Pokémon Center | logo image |

**Related variants may share one mark on purpose** — the four Expansion Stamp
variants all use `CircleStar`, both Play! Pokémon variants share one logo, both
Premier Ball League variants share one logo. They stay distinguishable by their
full name, which is always exposed via `aria-label` and the hover tooltip.

A few full-bleed logos are size-/alignment-corrected so they read consistently
next to the padded ball icons: Pokémon Day, Pokémon Center, and Professor Program
render slightly smaller (`h-6 w-6`), and a couple of logos get a small vertical
nudge (kept as a tiny per-logo map in `VariantIcon`).

The fallback pill, if reached, uses the variant's tone color
(`badge-variant` / `badge-reverse` / `badge-pokeball` / `badge-masterball`, and
`badge-grandmaster` = `bg-primary-light text-brand-violet` for promo variants).

---

## Variant Overflow

In compact rows that list a card's variants as icons (e.g. the wishlist row, icons
only — no names), cap the number of visible variants and collapse the remainder
into a neutral `+N` chip so the row stays on a single line regardless of how many
variants a set defines.

```txt
+N chip = badge bg-surface-secondary text-text-secondary
```

The `+N` chip uses neutral colors so it reads as "more", not as another variant.
The full variant list still lives on the card detail page.

---

# Modals

Modals should be simple and focused.

## Modal Rules

- centered white card
- dim or blurred backdrop
- 24px radius
- width around 520px on desktop
- clear title
- simple body layout
- obvious save/confirm button
- no excessive decoration
- lock page scroll while open: modals use the shared `useBodyScrollLock` hook
  (`src/hooks/useBodyScrollLock.ts`), which sets `overflow: hidden` on `body`
  and pads for the now-hidden scrollbar so the page behind doesn't shift

## Variant Selector Modal

Used for quick adding/editing card variants from the collection page. Editing is
**instant** — toggling a variant applies and persists immediately (no staged
save), mirroring the card detail page.

Should contain:

- a header matching the card detail page: card image thumbnail, the set eyebrow
  ("Prismatic Evolutions"), the card name, and `#number` / rarity / type pills,
  with a close icon pinned top-right
- a variants-owned progress bar (`progress-track` / `progress-fill`)
- a "Mark all owned" / "Clear all" action
- the variant ownership list using the shared `VariantOwnershipRow` (the same
  instant toggle rows as the card detail page)
- a single primary "Done" button (brand gradient) to dismiss; the modal also
  closes on the close icon, Escape, and backdrop click

There is no Save/Cancel — changes are live, so "Cancel to discard" does not
apply (undo by re-toggling).

The panel caps its height (`max-h-[calc(100vh-2rem)]`) and scrolls its content
so it never runs off-screen on short viewports or for cards with many variants.

## Import Collection Modal

Opened from the dashboard "Import Collection" quick action. Two steps in one
panel:

- **Input step:** a title + short description, a "Choose file" control (hidden
  file input behind a labeled button with an `Upload` icon) showing the picked
  filename, a monospace JSON textarea (file contents populate it; users can also
  paste), an inline error line, and Cancel / Import buttons (Import disabled when
  empty). The brand-gradient Import button is the primary action.
- **Confirm step:** if existing data is found, swap to a "Replace existing
  data?" confirmation with Cancel and a red (`bg-danger`) "Replace data" button.

Closes on the close icon, Escape, and backdrop click. Caps height and scrolls
like other modals. See `AGENTS.md` → Backup / Import-Export Rules for behavior.

---

# 10. Iconography

Use icons from `lucide-react` when icons are added and a matching icon exists.

## Icon Style

Use:

- outlined icons
- rounded strokes
- clean minimal shapes
- stroke width around 1.75–2

Avoid:

- heavy filled icons
- skeuomorphic icons
- colorful icons everywhere

Icons should support the UI, not dominate it.

---

# 11. Illustration Style

Illustrations should be:

- holographic
- glossy
- softly 3D
- prismatic
- blue/violet/pink/cyan
- premium and minimal

Use illustrations in:

- homepage hero
- page headers
- empty states
- product hero sections

Avoid using illustrations in:

- dense card grids
- tables
- modals
- repeated list items

---

# 12. Motion System

Motion should feel:

- smooth
- premium
- responsive
- lightweight

Motion should not feel:

- bouncy
- elastic
- cartoonish
- game-like

---

## Motion Timing

```css
180ms
240ms
320ms
```

---

## Easing

```css
cubic-bezier(0.22, 1, 0.36, 1)
```

---

## Recommended Motion

Use:

- subtle hover lift
- soft fade transitions
- smooth modal scaling
- tab underline movement
- gentle page transitions

Avoid:

- exaggerated bounce
- large rotations
- slow animations
- distracting decorative movement

---

# 13. Page Templates

# Shared Page Header

All route-level page headers/heroes use the shared `PageHeader` component so the
title block looks identical across pages. Do not hand-roll a separate header per
page. The Collection, Wishlist, and Product List heroes are thin wrappers around
`PageHeader`.

Header rules:

- use the `PageHeader` component (a `surface-card` wrapper)
- keep eyebrow, title, and description aligned on the left
- title uses the gradient hero sizing: `mt-1 text-3xl xs:text-[38px]
  sm:text-[42px]`
- pin the page icon to the top right of the card; use the page's nav-bar icon
  (Collection → `Library`, Wishlist → `Heart`, Products → `Package`)
- preserve right padding for the text block so it does not collide with the icon
- on mobile, keep the icon at the top right instead of letting it drop below the text
- page-specific content (summary stat tiles, collection progress) goes in the
  `PageHeader` content slot, rendered full width below the title block

# Dashboard Page

## Purpose

The dashboard gives a quick overview of the user's collection progress.

## Structure

The current home/dashboard implementation matches the reference screenshot proportions while using local static dashboard content.

1. Desktop navigation column with a top section and navigation section
2. Main dashboard column with hero section
3. Wishlist preview carousel
4. Three lower dashboard sections
5. Full-width footer below the navigation/dashboard row

Current layout rules:

- page shell uses `max-w-content`, `px-3`, `py-3`, `lg:px-5`, `lg:pt-5`, and `gap-3`
- navigation/dashboard row uses `gap-3`
- desktop navigation column is `280px`
- desktop dashboard column maxes at `1096px`
- dashboard uses `self-start` so extra vertical viewport space stays below the dashboard
- desktop navigation uses `h-full` and its navigation panel can stretch with `lg:flex-1`
- footer spans the page shell below both columns
- footer uses `surface-card`, shows copyright and the GitHub link on the left, and shows the tagline with a small heart that cycles through blue, violet, purple, and cyan plus the app version on the right. The version is **derived from the newest changelog entry** (`appVersion` in `src/data/changelog.ts`), so it stays in sync automatically — there is no separate version constant

## Hero Rules

- large title
- short description
- prismatic illustration
- max 2 CTA buttons
- generous whitespace
- gradient emphasis text allowed

The current hero uses natural content height. The right-side illustration is an
**eeveelution diamond mosaic** (`HeroEeveelutionMosaic`): a static, full-bleed
argyle lattice of the eeveelution "diamond" images (laid out like the page
background) that fills the hero, with neighboring diamonds avoiding the same
eeveelution. A left→right mask fades it into the title/details, and it's hidden
below `md` to avoid text/image collisions on small screens.

## Wishlist Preview Rules

A `DashboardCardHeader` ("Wishlist") with a top-right **View Wishlist** link, over
a thumbnail carousel of the newest wishlisted cards (each links to its card detail
with `?from=wishlist`). The dashboard no longer shows summary stat cards — progress
lives in the Progress Overview card.

- built on **Embla** (`embla-carousel-react`) with `align: "center"`, `loop: true`,
  and the **autoplay** plugin (3s, pauses on hover, arrow clicks reset the timer)
- a **scale tween** (Embla's scale example) makes the centered card largest and
  shrinks the rest with distance; when nothing overflows, all cards stay full size
- the viewport **shrink-wraps the cards and centers them**, capped at ~7 cards
  (`max-w-[744px]` / `sm:max-w-[856px]`); when they overflow it scrolls/loops
- **prev/next arrows appear only when there is something to scroll** (overflow);
  when the cards fit they're hidden and take no space
- overflow is measured against a hidden full-width reference (minus the arrows'
  footprint); when the cards barely overflow, the set is repeated enough times so
  Embla always has material to loop seamlessly
- **loads cleanly**: all images are preloaded + decoded and the scale applied
  before the carousel **fades in** (framer-motion, same transition as the page
  tables) — no resize jump or per-image flash; it's inert until revealed
- **empty state**: a compact dashed box (no heart icon) with "Your wishlist is
  empty", a hint, and a **Browse Collection** button

## Lower Dashboard Section Rules

- three panels on wide screens
- current wide proportion is `1fr 0.9fr 1.1fr`
- stack on smaller screens
- lower dashboard cards use their component content height

## Changelog Rules

Changelog entries (`src/data/changelog.ts`) are ordered **newest-first**. The
newest entry's `version` is the app's current version (exported as `appVersion`
and shown in the footer), so always add new entries at the top of the array.

Use changelog to show:

- new cards added
- promo cards added
- variant corrections
- product list updates
- app feature updates

Dashboard changelog rules:

- show only the latest 3 entries
- use the compact timeline entry layout
- fade the timeline downward into the "View Full Changelog" button
- link the button to the full changelog page

Timeline entry rules:

- place the calendar icon and date on the left
- place the version number directly below the date
- place the timeline dot in the center column
- keep the vertical line visually behind the dots
- place title and description on the right
- use smaller title and description text below the `xs` breakpoint

Full changelog page rules:

- show all changelog entries
- use the same timeline entry component with the full-size layout
- end the timeline with a quiet "No older changelogs." row
- do not use the dashboard fade ending on the full changelog page

---

# Collection Page

## Purpose

The collection page is the main tracking screen.

## Structure

1. Compact hero
2. Set tabs
3. Search/filter/sort controls
4. Paginated image-first card grid
5. Quick add/edit modal

## Tabs

Use these labels:

```txt
Master Set
Grandmaster Set
```

The two tabs are projections of the same cards by variant set (see `AGENTS.md` →
Variant set model): the **Master** tab grid shows cards with booster-pack
variants; the **Grandmaster** tab grid shows only cards that have promo variants,
each displaying just that set's variants. A card can appear in both. Editing in
one tab never affects the other tab's ownership.

## Hero Rules

- use the shared `PageHeader` (eyebrow, gradient title, description, and the
  `Library` icon pinned top right)
- collection progress renders in the header content slot, below the title block,
  as two shared `StatCard`s (matching the wishlist header): Progress (a small
  gradient progress ring as the card's leading element, with the percentage as
  the value) and Collected (value formatted `collected / total`)
- progress reflects the active tab: the **Master** tab counts master variants;
  the **Grandmaster** tab counts the whole set (master + grandmaster variants),
  so 100% grandmaster requires the full master set too
- the two cards use the same stat tile responsive ladder as the other pages
  (stacked on small screens, side by side at `xs`, fixed `270px` flush left at
  `lg`)

## Card Rules

Collection cards should be image-first.

Default state:

- show only the card image
- preserve the modern Pokemon card aspect ratio
- keep the card, image, and hover overlay the same size
- use lazy-loaded images
- avoid showing text metadata, variant tags, or progress bars by default

Hover/focus overlay (hover-capable devices only — see Interaction rules):

- use a semi-translucent dark layer over the image
- follow the exact image/card shape
- transition in smoothly
- show card number formatted as `#001`
- show card name
- show a full-width wishlist button stacked above a full-width add/edit button
- the wishlist button uses the shared `WishlistButton` component (same chrome as
  the add/edit button: blue text/border, light-blue hover). The button color
  does not change with state — only the heart does: a blue outline when not
  wishlisted, filled blue when wishlisted. The card detail page uses the same
  component (at a larger fixed width so the label swap does not resize it).

Button behavior:

- show `Add` if the user owns zero variants
- show `Edit` if the user owns one or more variants

Variant progress should not be shown on the card grid. Variant ownership lives
in the quick add/edit modal and the future card detail page.

The grid layout (columns, shrink, pagination) uses the shared responsive card
grid, capped at 4 columns — see Layout System → Responsive Card Grid.

Interaction rules:

- clicking the card opens the card detail page
- clicking the wishlist button toggles wishlist
- clicking Add/Edit opens the variant selector modal
- wishlist and Add/Edit should not accidentally trigger card navigation
- hover styles are gated to hover-capable devices (Tailwind
  `hoverOnlyWhenSupported`) to prevent touch "sticky hover". On touch the overlay
  does not appear, so **tapping a card just opens its detail page**; use the
  detail page (or the modal opened from there) for wishlist / Add-Edit on mobile

---

# Card Detail Page

## Purpose

The card detail page shows full information for one card.

## Structure

1. A top row with a back link (left, labeled "Back to Collection" or "Back to
   Wishlist" per the `?from=` context) and a right cluster with the current
   `#number`, previous/next card navigation, and a small browsing-context
   indicator above it ("Grandmaster set 3 / 43") naming the list being cycled and
   the card's position in it. Prev/next are **context-aware**: they cycle only the
   list the user came from (grandmaster / master / wishlist). On a bare deep link
   (no `?from=`) both fall back to the card's own set (Master for `pre-`,
   Grandmaster for `svp-`). On narrow screens the back link stays left while the
   indicator + prev/next center.
2. A `surface-card` with a two-column layout on `lg` (large card image left,
   details right) that stacks on smaller screens
3. Details: set eyebrow, card name, and number/rarity/type as neutral pills
4. A variants-owned progress bar (`progress-track` / `progress-fill`) over **all**
   the card's variants (full-card completion)
5. A wishlist toggle button
6. Variant ownership **grouped by set** — a "Master set" section and, when the
   card has promo variants, a "Grandmaster set" section. Each section header
   shows its own `owned / total` count and a "Mark all owned" / "Clear all"
   action scoped to that section only (the other set's ownership is preserved)

## Variant Ownership Row

Each variant is a full-width toggle button (clicking it edits ownership
immediately and persists). It shows the shared `VariantIcon` and the full
variant name on the left, and an owned-status chip on the right: `badge-success`
with a check and "Owned" when owned, or a neutral "Not owned" chip otherwise.
Use both the icon/text and color so state is not communicated by color alone.

The `VariantIcon` sits in a fixed-width leading slot so every variant name
starts on the same vertical line. ("Non-Holo" = the base texture on commons;
"Holo" = the holo default on cards that only come holo.)

On small screens (below the `xs` breakpoint) the row compacts to minimize name
truncation: the name text steps down to `text-xs` and the gaps/padding tighten,
returning to full size at `xs` and up. This applies in both the modal and the
card detail page (shared component).

## Rules

- variant ownership is editable directly on the page (toggle per variant)
- do not use the quick add/edit popup here
- show all variants clearly
- reuse `VariantIcon` and `getVariantName` for variant display
- keep the layout clean and spacious; use the card image radius
  (`[container-type:inline-size]` + `rounded-[5.25cqw]`) to match the grid

---

# Wishlist Page

## Purpose

The wishlist page shows cards the user wants to collect.

## Structure

1. Header card (`surface-card` bubble) with eyebrow, gradient title, and
   description, followed by summary stat tiles. The header does not use a
   top-right page icon; the stat tiles carry the visual weight.
2. Content card (`surface-card` bubble) containing the shared `DataViewToolbar`
   (search + sort only) and `Pagination`, reusing their existing styling.
3. A single, paginated list of wishlist rows. Use one responsive row layout, not
   a separate desktop table and mobile card layout.

## Summary Stats

Use the shared summary stat tile pattern (see Component Guidelines). The wishlist
shows two tiles: total wishlisted cards and **Variants Owned** across those cards,
formatted `owned / total` (or `0` when there are none).

## Wishlist Row

Each row is a compact horizontal card and should include:

- card image thumbnail (modern Pokémon card aspect ratio)
- card number formatted as `#001`
- card name
- rarity and type
- a read-only owned indicator: a leading count chip (`owned/total`, using
  `badge-success` when complete) followed by the variant icons (`VariantIcon`,
  icons only — no inline names; hovering an icon shows its name in a small
  `Tooltip`), with un-owned icons dimmed (`opacity-40`). Capped with a neutral
  `+N` overflow chip so the row stays a single line (see Variant Overflow). This
  is display only — ownership is not editable from the wishlist.
- a remove-from-wishlist action (a trash icon button; on hover only the icon
  turns red — no red background fill)

Clicking the row navigates to the card detail page; the remove action must not
trigger navigation (use the same stretched-link + raised-action pattern as the
collection card). The action sits at the top-right of the row content so the
variant icons get the full content width.

## Empty States

- **No wishlisted cards:** a clean empty state with an icon, a short message, and
  a primary button back to the collection page.
- **No search matches:** the standard `empty-state` "no results" message with a
  secondary button to clear the search.

---

# Product List Page

## Purpose

The product list page shows products related to the Pokémon TCG set.

## Structure

1. Shared `PageHeader` with the product summary stat tile
2. Search + sort controls (shared `DataViewToolbar`)
3. Product card grid
4. Pagination

Use the shared `DataViewToolbar` for product search and sorting only. There is
**no page-size selector and no grid/list display toggle** — the page is always a
card grid. Keep controls compact and aligned with the collection-management UI
rather than making the page feel like a storefront.

## Product Grid

The product grid uses the shared responsive card grid (see Layout System →
Responsive Card Grid) but **capped at 3 columns** (2 → 3 at 640px), because
product cards carry more horizontal detail and a larger image than a single
collection card. It shrinks, paginates by whole rows, and reflows like the
collection grid.

## Product Cards

Product cards should include:

- product image
- product name
- release info if available

Keep product cards simple and image-first. Cards are a **uniform fixed size**
(`h-56` → `sm:h-64` → `xl:h-60`) so the grid stays aligned regardless of name
length; the image region is `flex-1` and the text block (name + release) is
pinned at the bottom. The product name uses smaller text on small screens
(`text-xs`, stepping up to `text-[15px]` at `sm`) and the release label likewise
(`text-[11px]` → `text-sm`).

Product images are normalized (transparent margins trimmed, re-padded to a
uniform square) so `object-contain` shows a large, tightly-framed product with a
small consistent margin. See `AGENTS.md` → Image Rule.

## Promo Badge

When a product contains promo cards needed for the grandmaster set, pin a small
muted `Info` icon (the lucide glyph's own circle is enough — no extra
border/background) to the card's top-right corner, as a conventional
hover-for-details affordance. The promo details stay hidden until interaction so
the card stays clean:

- on hover (desktop) or tap (mobile), open a small popover anchored to the
  badge showing a "Promos" eyebrow, the summary, and the promo names
  as neutral pills
- the popover is a floating menu surface (`rounded-card`, `shadow-soft-md`) and
  opens below the badge, right-aligned so it stays within the card
- closes on mouse-leave (desktop), and on outside tap / Escape (mobile/keyboard)
- never show promo details inline on the card by default

This app is not a price tracking app unless expanded later.

---

# 14. Responsive Strategy

The app should be responsive below the desktop layout cap, then stop expanding above the cap so dashboard cards do not become overly wide.

## Desktop

Use:

- centered page shell with `max-w-content`
- home grid with a `280px` desktop navigation column and capped dashboard column
- fixed-width desktop navigation column, not sticky or position-fixed
- desktop navigation and dashboard side by side from the `lg` breakpoint
- dashboard content aligned to the top with `self-start`
- a wishlist preview carousel below the hero
- three lower dashboard panels from the `xl` breakpoint
- table layouts where useful on future data-heavy pages

On very wide screens, preserve the default dashboard width instead of stretching cards horizontally.

---

## Tablet

Use:

- smaller hero layouts
- reduced stats density
- 2-column stat grids where useful
- stacked header sections
- stacked navigation/dashboard layout below `lg`

---

## Mobile

Use:

- drawer or compact navigation
- single-column grids
- stacked cards instead of tables
- smaller or hidden hero illustrations
- full-width filters and controls
- no horizontal clipping
- reduced page padding when needed

---

# 15. Tailwind Direction

Use Tailwind CSS utility classes.

Use Tailwind's default theme as the base and extend it with app-specific tokens. Do not replace Tailwind defaults for spacing or radius unless there is a strong reason.

Current token-backed Tailwind extensions:

```ts
colors: {
  background: "#F8F9FC",
  surface: {
    DEFAULT: "#FFFFFF",
    secondary: "#F6F7FB",
    hover: "#F3F4FA",
  },
  border: {
    DEFAULT: "#EEF2F8",
    strong: "#DDE5F0",
  },
  primary: "#5B5CF0",
  brand: {
    blue: "#2F80FF",
    violet: "#7B61FF",
    purple: "#C061FF",
    cyan: "#06B6D4",
  },
  text: {
    primary: "#0F172A",
    secondary: "#5B6478",
    muted: "#8A94A6",
  }
},
borderRadius: {
  pill: "999px",
  button: "14px",
  card: "20px",
  modal: "24px",
},
boxShadow: {
  "soft-sm": [
    "inset 1px 0 0 rgba(148, 163, 184, 0.18)",
    "inset -1px 0 0 rgba(148, 163, 184, 0.18)",
    "inset 0 1px 0 rgba(148, 163, 184, 0.14)",
    "inset 0 1px 0 rgba(255, 255, 255, 0.86)",
    "0 3px 3px -2px rgba(15, 23, 42, 0.12)",
    "0 8px 10px -7px rgba(15, 23, 42, 0.2)",
  ].join(", "),
  "soft-md": [
    "inset 1px 0 0 rgba(148, 163, 184, 0.18)",
    "inset -1px 0 0 rgba(148, 163, 184, 0.18)",
    "inset 0 1px 0 rgba(148, 163, 184, 0.14)",
    "inset 0 1px 0 rgba(255, 255, 255, 0.86)",
    "0 3px 4px -2px rgba(15, 23, 42, 0.14)",
    "0 10px 14px -9px rgba(15, 23, 42, 0.24)",
  ].join(", "),
  "soft-lg": [
    "inset 1px 0 0 rgba(148, 163, 184, 0.18)",
    "inset -1px 0 0 rgba(148, 163, 184, 0.18)",
    "inset 0 1px 0 rgba(148, 163, 184, 0.14)",
    "inset 0 1px 0 rgba(255, 255, 255, 0.86)",
    "0 4px 6px -3px rgba(15, 23, 42, 0.16)",
    "0 12px 18px -11px rgba(15, 23, 42, 0.26)",
  ].join(", "),
},
spacing: {
  page: "32px",
  card: "24px",
  section: "48px",
},
maxWidth: {
  content: "1440px",
},
width: {
  navigation: "280px",
}
```

Reusable class patterns are allowed for repeated UI styles.

Example:

```tsx
<button className="btn-primary">
  View Collection
</button>
```

---

# 16. Current Tailwind Implementation

The implemented Tailwind design system uses a small token layer plus global utility classes.

## Token Files

Use these files as the implementation source for Tailwind and global CSS:

```txt
src/theme/tokens.ts
src/theme/index.ts
tailwind.config.ts
src/index.css
```

Rules:

- keep `src/theme/tokens.ts` aligned with the CSS variables in `src/index.css`
- keep the global `body` background in `src/index.css` set to the repeated `src/assets/images/bg-pattern-l.jpg` texture over `var(--bg)`
- keep Tailwind theme values token-backed where practical
- extend Tailwind defaults instead of replacing default spacing/radius scales
- do not hardcode new repeated colors, shadows, radius values, typography sizes, or spacing values in components
- use component-level Tailwind classes for one-off layout needs
- use global utility classes for repeated design-system patterns
- keep `src/theme/index.ts` as a small re-export for theme tokens

## Font Loading

Inter is loaded from `index.html` with weights:

```txt
400
500
600
700
800
```

Use this stack everywhere:

```css
Inter, ui-sans-serif, system-ui, sans-serif
```

## Global Utility Classes

The following global classes are approved design-system helpers:

```txt
page-shell
section-shell
surface-card
surface-panel
interactive-card
inner-ring
btn
btn-primary
btn-secondary
btn-ghost
icon-button
input-field
select-field
field-label
badge
badge-variant
badge-reverse
badge-pokeball
badge-masterball
badge-success
progress-track
progress-fill
modal-backdrop
modal-panel
empty-state
heading-display
heading-1
heading-2
heading-3
card-title
body-copy
label-text
tiny-tag
gradient-text
prismatic-border
```

Prefer these classes when they match the component being built.

Current helper details:

```txt
page-shell      = max 1440px page container, gap-section, px-4, sm:px-page, py-8
section-shell   = grid gap-6
surface-card    = 20px radius, 1px border, white surface, p-5, soft-sm shadow
surface-panel   = 24px radius, 1px border, white surface, px-4, py-6, soft-md shadow
interactive-card = surface-card with 180ms hover transition
inner-ring      = 1px strong border with a subtle inset ring for nested controls
modal-panel     = 24px radius, 1px border, white surface, soft-lg shadow, max 520px
empty-state     = min-h-80, dashed border, surface-secondary, p-8, centered content
```

## Responsive Typography Helpers

The typography token values remain the canonical sizes.

The heading helper classes may step down at smaller breakpoints so pages remain readable and unclipped on mobile:

```txt
heading-display: H2 on mobile, H1 on small screens, Hero Display on large screens
heading-1: H2 on mobile, H1 on small screens and up
heading-2: H3 on mobile, H2 on small screens and up
heading-3: H3
```

Do not use viewport-width typography such as `vw` sizing.

---

# 17. UI Do and Do Not

## Do

- prioritize readability
- keep spacing generous
- keep data scannable
- use gradients sparingly
- make actions obvious
- maintain blue/violet consistency
- preserve soft rounded visual language
- keep the app lightweight and calm

## Do Not

- overuse glassmorphism
- add heavy shadows
- clutter cards
- introduce unrelated colors
- overanimate the interface
- make it feel like a gaming HUD
- use random spacing or radius values
- add visual decoration that reduces clarity

---

# 18. Final Design Goal

Masterset Tracker should combine:

- modern SaaS dashboard UX
- collectible binder aesthetics
- premium minimal design
- lightweight productivity tooling
- subtle prismatic visual identity

The final experience should feel like:

> A beautifully organized digital binder for serious Pokémon collectors.
