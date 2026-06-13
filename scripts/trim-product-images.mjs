// Asset normalizer for product images.
//
// Source product art ships at varying sizes/formats (PNG/JPG/WebP) with the
// product rendered small and centered, leaving wide margins. This trims that
// margin, then re-pads every image to a uniform small margin on a square canvas
// so the product fills the card frame and all products stay aligned in the grid.
//
// Outputs normalized PNGs (lossless, so re-running is idempotent). Convert to
// WebP afterwards with `npm run images-to-webp`.
//
// Run with: npm run trim-images
// Pass --skip-webp to skip already-final .webp files and only process newly
// added PNG/JPG sources (faster when most images are already done):
//   npm run trim-images -- --skip-webp

import { readdir, readFile, unlink, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const PRODUCTS_DIR = join(
  scriptDir,
  "..",
  "src",
  "assets",
  "images",
  "products",
);

const CANVAS_SIZE = 640; // output square edge in px
const CONTENT_SIZE = 600; // longest content edge -> ~3% margin per side
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
const MARGIN = (CANVAS_SIZE - CONTENT_SIZE) / 2;
const RASTER_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

// Skip already-final .webp files so only newly added PNG/JPG sources are
// reprocessed. (Raw .webp inputs that still need normalizing would be skipped
// too, so omit this flag for those.)
const skipWebp = process.argv.includes("--skip-webp");

const files = (await readdir(PRODUCTS_DIR)).filter((file) => {
  const extension = extname(file).toLowerCase();
  if (!RASTER_EXTENSIONS.has(extension)) {
    return false;
  }
  return !(skipWebp && extension === ".webp");
});

for (const file of files) {
  const inputPath = join(PRODUCTS_DIR, file);
  const outputPath = join(PRODUCTS_DIR, `${basename(file, extname(file))}.png`);
  const input = await readFile(inputPath);

  // Trim the margin, fit the bare product into a square content box, then pad
  // to the final canvas with a uniform transparent margin.
  const trimmed = await sharp(input).trim({ threshold: 10 }).toBuffer();
  const output = await sharp(trimmed)
    .resize(CONTENT_SIZE, CONTENT_SIZE, {
      fit: "contain",
      background: TRANSPARENT,
    })
    .extend({
      top: MARGIN,
      bottom: MARGIN,
      left: MARGIN,
      right: MARGIN,
      background: TRANSPARENT,
    })
    .png()
    .toBuffer();

  await writeFile(outputPath, output);
  // Drop the original when it wasn't already a PNG (e.g. .jpg/.webp source).
  if (inputPath !== outputPath) {
    await unlink(inputPath);
  }
  console.log(`normalized ${file}`);
}

console.log(
  `\nDone — normalized ${files.length} product image(s)${
    skipWebp ? " (skipped existing .webp)" : ""
  }.`,
);
