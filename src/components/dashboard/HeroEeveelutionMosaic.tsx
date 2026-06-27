import { useEffect, useRef, useState } from "react";

import { eeveelutionHeroImages } from "../../assets/images";

// Diamond art is 424x712 (tall rhombus).
const DIAMOND_WIDTH_PX = 100;
const DIAMOND_HEIGHT_PX = DIAMOND_WIDTH_PX * (712 / 424);
// Lattice spacing (center-to-center). Spacing > diamond size leaves the gaps;
// alternating rows are nudged half a column for the argyle (bg-pattern) look.
const COL_SPACING_PX = 116;
const ROW_SPACING_PX = 112;

// Left→right fade so the mosaic blends under the hero title. Pixel-based (not a
// percentage) and held transparent through the title region first, so smaller
// heroes fade more strongly (the title is a roughly fixed width on the left)
// while wider heroes still reveal plenty of diamonds on the right.
const FADE_START_PX = 520; // transparent up to here (title region)
const FADE_END_PX = 760; // fully opaque from here on
const FADE_MASK = `linear-gradient(to right, transparent 0px, transparent ${FADE_START_PX}px, #000 ${FADE_END_PX}px)`;

interface Cell {
  left: number;
  top: number;
  src: string;
}

// Deterministic value in [0, 1) derived from a cell's grid position, so the
// mosaic layout stays identical across resizes (each diamond keeps its
// eeveelution) instead of re-randomizing every rebuild.
const MOSAIC_SEED = 0x9e3779b9;
const cellRandom = (row: number, col: number): number => {
  let hash = MOSAIC_SEED ^ Math.imul(row, 374761393) ^ Math.imul(col, 668265263);
  hash = Math.imul(hash ^ (hash >>> 13), 1274126177);
  hash ^= hash >>> 16;
  return (hash >>> 0) / 4294967296;
};

// Build a static diamond lattice that fully covers a `width` x `height` area,
// matching the page's background pattern (offset rows, gaps, no overlap). Each
// cell is assigned an eeveelution that differs from its already-placed neighbors
// (left + the row above), so the same one rarely sits beside itself.
const buildMosaic = (width: number, height: number): Cell[] => {
  const cols = Math.ceil(width / COL_SPACING_PX) + 2;
  const rows = Math.ceil(height / ROW_SPACING_PX) + 2;
  const count = eeveelutionHeroImages.length;
  const cells: Cell[] = [];
  // Track the chosen image index per grid coordinate for neighbor checks.
  const chosen = new Map<string, number>();

  for (let row = 0; row < rows; row += 1) {
    const rowShift = (row % 2) * (COL_SPACING_PX / 2);
    for (let col = -1; col < cols; col += 1) {
      const forbidden = new Set<number>();
      for (const key of [
        `${row}:${col - 1}`, // left
        `${row - 1}:${col - 1}`, // up-left
        `${row - 1}:${col}`, // up
        `${row - 1}:${col + 1}`, // up-right
      ]) {
        const neighbor = chosen.get(key);
        if (neighbor !== undefined) {
          forbidden.add(neighbor);
        }
      }

      const candidates = [];
      for (let i = 0; i < count; i += 1) {
        if (!forbidden.has(i)) {
          candidates.push(i);
        }
      }
      const pool =
        candidates.length > 0 ? candidates : [...Array(count).keys()];
      const choice = pool[Math.floor(cellRandom(row, col) * pool.length)];

      chosen.set(`${row}:${col}`, choice);
      cells.push({
        left: col * COL_SPACING_PX + rowShift - DIAMOND_WIDTH_PX / 2,
        top: row * ROW_SPACING_PX - DIAMOND_HEIGHT_PX / 2,
        src: eeveelutionHeroImages[choice],
      });
    }
  }

  return cells;
};

// A static, full-bleed diamond mosaic for the hero, laid out like the page's
// background pattern and masked with a left→right fade so it blends into the
// title. Neighboring diamonds avoid repeating the same eeveelution.
export function HeroEeveelutionMosaic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cells, setCells] = useState<Cell[]>([]);

  // Rebuild the lattice to cover the container whenever it resizes.
  useEffect(() => {
    const node = containerRef.current;
    if (!node || eeveelutionHeroImages.length === 0) {
      return undefined;
    }

    const rebuild = () => {
      setCells(buildMosaic(node.clientWidth, node.clientHeight));
    };

    rebuild();
    const observer = new ResizeObserver(rebuild);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ WebkitMaskImage: FADE_MASK, maskImage: FADE_MASK }}
    >
      {cells.map((cell, index) => (
        <img
          key={index}
          alt=""
          aria-hidden="true"
          className="absolute object-contain"
          decoding="async"
          src={cell.src}
          style={{
            left: cell.left,
            top: cell.top,
            width: DIAMOND_WIDTH_PX,
            height: DIAMOND_HEIGHT_PX,
          }}
        />
      ))}
    </div>
  );
}
