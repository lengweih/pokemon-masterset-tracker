// Converts the normalized product PNGs to WebP to cut file size (same as the
// card images). Run after `npm run trim-images`.
//
// Run with: npm run images-to-webp

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

const files = (await readdir(PRODUCTS_DIR)).filter(
  (file) => extname(file).toLowerCase() === ".png",
);

for (const file of files) {
  const inputPath = join(PRODUCTS_DIR, file);
  const outputPath = join(PRODUCTS_DIR, `${basename(file, ".png")}.webp`);
  const input = await readFile(inputPath);

  const output = await sharp(input)
    .webp({ quality: 82, effort: 6 })
    .toBuffer();

  await writeFile(outputPath, output);
  await unlink(inputPath);
  console.log(`converted ${file} -> ${basename(outputPath)}`);
}

console.log(`\nDone — converted ${files.length} product image(s) to WebP.`);
