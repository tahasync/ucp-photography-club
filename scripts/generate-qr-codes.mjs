/**
 * QR code generator for printed UPC hierarchy cards.
 *
 * Generates a permanent QR code PNG for every member.
 * The QR code points to the member's stable URL, which is their `slug`
 * in `src/data/members.js` (e.g. /president, /vice-president, /operations/director).
 *
 * Filename convention:
 *   - Positions without a department (departmentSlug: null):
 *     president.png, vice-president.png, patron.png, co-patron.png
 *   - Duplicate positions inside a department: position-departmentSlug
 *     (e.g., director-operations.png, deputy-director-editing.png,
 *      director-social-media.png, etc.)
 *
 *   QR_BASE_URL=http://localhost:5173 npm run qr
 *   QR_BASE_URL=https://tahasync.github.io/ucp-photography-club npm run qr
 *
 * In production (printed cards), use the GitHub Pages base URL. Local dev cards
 * use the Vite dev server URL. The QR codes are generated at build time, so
 * re-run this script whenever a member is added, renamed, or their URL changes.
 *
 * Requirements: `qrcode` (dev dependency).
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'images', 'qr');

/** Base URL used in generated QR codes.
 *  Override with the QR_BASE_URL env var when generating for a specific host.
 */
const BASE_URL = process.env.QR_BASE_URL || 'https://tahasync.github.io/ucp-photography-club';

/**
 * Sanitize a string for use as a filename segment:
 * lowercase, collapse whitespace/repeated punctuation to a single hyphen,
 * strip remaining non-alphanumeric characters, trim hyphens.
 */
const sanitize = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const main = async () => {
  // ---------------------------------------------------------------- read data
  let memberList = [];
  try {
    // Dynamic import with timestamp query ensures fresh data on every run.
    const module = await import(`../src/data/members.js?timestamp=${Date.now()}`);
    const { members } = module;
    if (!members || typeof members !== 'object') {
      throw new Error('members.js does not export a members object');
    }
    memberList = Object.values(members);
    if (memberList.length === 0) {
      throw new Error('No members found in members.js');
    }
  } catch (error) {
    console.error('Failed to read member data:', error.message);
    process.exitCode = 1;
    return;
  }

  // ----------------------------------------------------------------- prepare
  await fs.mkdir(OUT_DIR, { recursive: true });

  // ------------------------------------------------------------ group by slug
  // Positions without a departmentSlug belong to a unique "root" group.
  const byKey = new Map();
  for (const member of memberList) {
    const position = member.position || 'Unknown';
    const normalized = sanitize(position);
    const departmentSlug = member.departmentSlug || '__root__';
    const key = `${normalized}|${departmentSlug}`;
    if (!byKey.has(key)) {
      byKey.set(key, []);
    }
    byKey.get(key).push(member);
  }

  // -------------------------------------------------------------- generate
  // Sort by position then department for deterministic output order.
  const entries = Array.from(byKey.entries()).sort((a, b) => {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
  });

  for (const [, members] of entries) {
    const member = members[0];
    const position = member.position || 'Unknown';
    const normalizedPosition = sanitize(position);
    const departmentSlug = member.departmentSlug;
    const slug = member.slug;
    const url = `${BASE_URL}/${slug}`;

    // Position without department → use position alone.
    // Position inside a department → append departmentSlug for uniqueness.
    const fileName = departmentSlug
      ? `${normalizedPosition}-${sanitize(departmentSlug)}.png`
      : `${normalizedPosition}.png`;
    const filePath = path.join(OUT_DIR, fileName);

    try {
      const pngBuffer = await QRCode.toBuffer(url, {
        errorCorrectionLevel: 'H', // High error correction for printed cards
        type: 'png',
        scale: 8,                    // 8x scale for crisper print
        margin: 2,                   // Quiet zone around the code
      });
      await fs.writeFile(filePath, pngBuffer);
      console.log(`Generated ${filePath}`);
    } catch (error) {
      console.error(`Failed to generate QR for "${position}" (${slug}):`, error.message);
      process.exitCode = 1;
    }
  }

  // ------------------------------------------------------------- summary
  console.log(`\nDone. Generated ${entries.length} QR code${entries.length === 1 ? '' : 's'} in public/images/qr/`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

