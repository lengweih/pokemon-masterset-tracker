# Manual Testing Checklist

A follow-along checklist for manually verifying the app's features after a
deploy (especially mobile / production on GitHub Pages). Mobile-specific and
persistence cases are flagged because they're the easiest to miss.

## 1. App chrome & navigation
- [ ] Mobile nav bar shows below `lg`; tap each destination — Dashboard, Collection, Wishlist, Products, Changelog — all load.
- [ ] Active nav item is highlighted for the current page.
- [ ] Footer renders: copyright + GitHub link (left), tagline heart + version (right); heart cycles colors.
- [ ] Forward navigation into a page starts scrolled at the top; browser **Back** preserves the previous scroll position.
- [ ] No horizontal scrolling/clipping on any page at phone width.

## 2. Dashboard
- [ ] Hero renders; hero illustration is hidden on phone (below `xl`).
- [ ] Wishlist preview carousel fades in (after images load), shows newest cards; tapping a card opens its detail; "View Wishlist" link works. Empty wishlist shows the dashed "Your wishlist is empty" box with a Browse Collection button.
- [ ] Wishlist carousel: prev/next arrows appear only when the cards overflow; arrows loop seamlessly; autoplay advances and pauses on hover.
- [ ] "Missing Cards" hero CTA and "View Missing Cards" quick action both deep-link to Collection with the **Missing** ownership filter pre-applied.
- [ ] Changelog preview shows the latest **3** entries; "View Full Changelog" opens the full page.

## 3. Collection — tabs & grid
- [ ] **Master Set** / **Grandmaster Set** tabs switch correctly.
- [ ] Tab choice persists after navigating away and back (and after reload).
- [ ] Progress ring/percentage reflects the active tab: Master counts master variants; Grandmaster counts the whole set (master + grandmaster).
- [ ] Grid is image-first, correct card aspect ratio, 2 columns on phone, paginates by whole rows; last page padded with invisible tiles (no layout jump).
- [ ] Search filters cards; filters and sort work; results paginate correctly.
- [ ] Ownership filter (All / Owned / Missing) works, including via the dashboard deep-link.

## 4. Collection — card interactions (tap targets on phone)
- [ ] Tapping a card body opens the **card detail page**.
- [ ] Tapping the **wishlist** button toggles wishlist and does **not** open detail.
- [ ] Tapping **Add/Edit** opens the variant modal and does **not** open detail.
- [ ] Overlay button reads **Add** when you own 0 variants, **Edit** when you own ≥1.

## 5. Variant selector modal (quick add/edit)
- [ ] Header matches: thumbnail, "Prismatic Evolutions" eyebrow, name, #number/rarity/type pills, close icon.
- [ ] Toggling a variant applies **instantly** (no save step); progress bar updates live.
- [ ] "Mark all owned" / "Clear all" works.
- [ ] Closes via close icon, **Escape** (if keyboard), backdrop tap, and "Done".
- [ ] Page behind doesn't shift/scroll while open (scroll lock).
- [ ] For a card with many variants, the modal scrolls internally and never runs off-screen.

## 6. Variant icons
- [ ] Letters render: **N** (Non-Holo), **H** (Holo), **R** (Reverse Holo), and **H** for the grandmaster Holo promo.
- [ ] Lucide icons render with **no background chip**: Cosmos Holo (Sparkles), Expansion Stamp family (CircleStar), Jumbo (Scaling), Holiday Calendar (Calendar).
- [ ] Logo images render: Poké Ball, Master Ball, Play! Pokémon (+ Cosmos), TCG Gym, Premier Ball League (+ Judge), Pokémon Day, Professor Program, Pokémon Center.
- [ ] **No corner/top-right badges** anywhere.
- [ ] All icons are vertically aligned on one line — check **play-pokemon** and **professor-program** specifically, and that Pokémon Day / Center / Professor Program aren't oversized.
- [ ] Related variants sharing a mark (Expansion Stamp ×4, both Play! Pokémon, both Premier Ball League) are still distinguishable by name.

## 7. Card detail page
- [ ] Set eyebrow correct: "Prismatic Evolutions" for PRE, "Scarlet Violet Promo" for SVP cards.
- [ ] Card number shows with `#`; rarity/type pills correct (SVP cards show **Promo** rarity).
- [ ] Variants grouped into **Master set** / **Grandmaster set** sections; a section only appears if the card has that set's variants.
- [ ] Each section's owned count + **Mark all / Clear all** works and **does not** wipe the other section.
- [ ] Toggling a variant persists immediately; progress bar (over all variants) updates.
- [ ] Wishlist toggle works.

## 8. Card detail — context-aware prev/next
- [ ] Enter detail from **Master** tab → prev/next cycle only the master list; indicator reads "Master set X / N"; current `#number` shown.
- [ ] Enter from **Grandmaster** tab → cycles only grandmaster cards (including the SVP promos); never jumps into the master-only secret rares.
- [ ] Enter from **Wishlist** → prev/next cycle only wishlisted cards; back link says "Back to Wishlist" and returns there.
- [ ] Prev arrow disabled on the first item, next disabled on the last.
- [ ] On phone: back link stays left while the indicator + prev/next are centered; nothing overlaps.

## 9. Grandmaster / SVP cards
- [ ] Grandmaster tab lists the 10 SVP promo cards (#167–176) after the PRE cards.
- [ ] SVP cards show the **placeholder image** (no art yet) and don't break the grid.
- [ ] A "Promo" option appears in the rarity filter and filters correctly.

## 10. Wishlist page
- [ ] Header shows two stat tiles (wishlisted cards, total variants) with correct counts.
- [ ] Each row: thumbnail, `#number`, name, rarity·type, owned `count/total` chip (green when complete), variant icons.
- [ ] **Variant overflow**: all icons fit on one line when there's room; a neutral **+N** chip appears only when they actually overflow (try rotating the phone).
- [ ] Un-owned variant icons are dimmed (`opacity-40`).
- [ ] Hover/long-press a variant icon shows the name tooltip (hover is desktop-oriented — verify it at least doesn't misbehave on touch).
- [ ] Tapping a row opens detail; the **trash** button removes from wishlist and does **not** navigate (icon turns red, no red fill).
- [ ] Search + sort work; pagination works.
- [ ] Empty wishlist shows the empty state with a button back to Collection; a no-match search shows the "no results" state with clear-search.

## 11. Products page
- [ ] Grid renders, capped at fewer columns than collection; search + sort + pagination work.
- [ ] Product cards are uniform size; images fill the frame; name + release pinned at bottom.
- [ ] Promo products show the small **Info** badge top-right.
- [ ] **Tap** the badge (mobile) → popover opens with "Promos" eyebrow, summary, and promo name pills; closes on outside tap / Escape.
- [ ] Promo names in the popover match expectations (e.g. Surprise Box Eeveelutions; prize packs).

## 12. Changelog
- [ ] Full page lists all entries; ends with "No older changelogs."; dashboard fade ending not present here.

## 13. Backup import/export
- [ ] **Export Backup** downloads a JSON file; sets with no data are omitted.
- [ ] **Import Collection**: choose-file and paste-JSON both work; invalid JSON shows an inline error.
- [ ] Import with existing data prompts a **Replace** confirmation (red button); import with no existing data applies immediately.
- [ ] After import the page reloads and the imported collection/wishlist appear everywhere.

## 14. Persistence & cross-page sync
- [ ] Mark variants in the modal → open the same card's detail page → state matches.
- [ ] Wishlist a card on Collection → it appears on the Wishlist page.
- [ ] Reload the page (or close/reopen the tab) → all owned variants, wishlist, and active tab survive.
- [ ] Toggle in detail → go back to Collection → the Add/Edit label reflects the new ownership.

## 15. Production / deploy sanity (GitHub Pages)
- [ ] Hash routing works: opening a deep URL like `…/#/collection/pre-005?from=grandmaster` loads that card.
- [ ] Hard refresh on a deep URL stays on that page (no blank screen / 404).
- [ ] All images load (cards, products, logos, background texture) — no broken-image icons.
- [ ] No console errors (via remote debugging if available).
