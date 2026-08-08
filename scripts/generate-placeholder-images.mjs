/**
 * Generates the placeholder photography that ships with this repo.
 *
 *   npm run placeholders
 *
 * The real photos have to be exported from the Wix media manager and the old
 * Google Site by a human (spec §9). Until that happens these abstract gradients
 * stand in, so every <Image> has a real file with real dimensions behind it and
 * nothing 404s or shifts layout.
 *
 * To replace one: drop your own file in with the same name and delete nothing
 * else. To replace all of them: delete this script and public/images once the
 * real assets are in.
 *
 * Writes 24-bit PNGs with no dependencies — zlib and a CRC table are all it
 * takes, and adding an image library to a site this small is not worth it.
 */

import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "images");

/* --- minimal PNG encoder ------------------------------------------------ */

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf) {
  let c = 0xffffffff;
  for (const byte of buf) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

function encodePng(width, height, pixel) {
  const stride = width * 3 + 1;
  const raw = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y++) {
    let offset = y * stride + 1; // leave filter byte 0 (None)
    for (let x = 0; x < width; x++) {
      const [r, g, b] = pixel(x, y);
      raw[offset++] = r;
      raw[offset++] = g;
      raw[offset++] = b;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type: truecolour
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* --- the placeholder look ----------------------------------------------- */

// Palette anchors, kept in step with the @theme block in app/globals.css.
const INK = [0x0a, 0x1e, 0x33];
const BLUE = [0x00, 0x27, 0x4c];
const SLATE = [0x5b, 0x66, 0x74];
const RULE = [0xe2, 0xe5, 0xea];

const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

/**
 * A quiet diagonal gradient with a soft band across it. `seed` shifts the
 * gradient ends and the band position so the images are distinguishable
 * without any of them shouting.
 */
function makeGradient(seed, dark) {
  const wobble = ((seed * 37) % 100) / 100;
  const from = dark
    ? mix(INK, BLUE, wobble)
    : mix(SLATE, RULE, 0.15 + wobble * 0.3);
  const to = dark
    ? mix(BLUE, SLATE, 0.35 + wobble * 0.3)
    : mix(RULE, [255, 255, 255], wobble);
  const bandAt = 0.25 + ((seed * 17) % 50) / 100;

  return (width, height) => (x, y) => {
    const t = (x / width) * 0.65 + (y / height) * 0.35;
    const base = mix(from, to, t);
    const band = Math.max(0, 1 - Math.abs(t - bandAt) * 9) * 0.12;
    return mix(base, [255, 255, 255], band);
  };
}

function write(relativePath, width, height, seed, dark = false) {
  const shader = makeGradient(seed, dark)(width, height);
  const file = join(outDir, relativePath);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, encodePng(width, height, shader));
  return relativePath;
}

/* --- the manifest ------------------------------------------------------- */

const targets = [
  // Hero and feature imagery. The homepage hero sits under a 55% ink overlay,
  // so it is generated dark to begin with.
  ["hero/home.png", 1920, 1080, 1, true],
  ["hero/purpose.png", 1200, 900, 2],
  ["hero/strategy.png", 1152, 720, 3],
  ["hero/finance.png", 1152, 720, 4],

  // Investment sectors (§7.4).
  ["sectors/consumer-goods.png", 800, 600, 11],
  ["sectors/energy.png", 800, 600, 12],
  ["sectors/healthcare.png", 800, 600, 13],
  ["sectors/tmt.png", 800, 600, 14],
  ["sectors/industrials.png", 800, 600, 15],
  ["sectors/prediction-market.png", 800, 600, 16],
  ["sectors/fig.png", 800, 600, 17],

  // Three-photo strips on /strategy and /finance.
  ...[1, 2, 3].map((n) => [`gallery/strategy-${n}.png`, 1200, 900, 20 + n]),
  ...[1, 2, 3].map((n) => [`gallery/finance-${n}.png`, 1200, 900, 30 + n]),

  // The /about community gallery — 17 images, matching the Wix site.
  ...Array.from({ length: 17 }, (_, i) => [
    `gallery/community-${String(i + 1).padStart(2, "0")}.png`,
    1200,
    900,
    40 + i,
  ]),
];

let count = 0;
for (const [path, width, height, seed, dark] of targets) {
  write(path, width, height, seed, dark);
  count++;
}

console.log(`Wrote ${count} placeholder images to public/images/`);
