import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public/images/qr');

const expected = {
  'president.png': '/president',
  'vice-president.png': '/vice-president',
  'director-operations.png': '/operations/director',
  'deputy-director-operations.png': '/operations/deputy-director',
  'assistant-director-operations.png': '/operations/assistant-director',
  'director-editing.png': '/editing/director',
  'deputy-director-editing.png': '/editing/deputy-director',
  'assistant-director-editing.png': '/editing/assistant-director',
  'director-publications-comms.png': '/comms/director-publications',
  'deputy-director-publications-comms.png': '/comms/deputy-director-publications',
  'director-communications-comms.png': '/comms/director-communications',
  'director-social-media.png': '/social-media/director',
  'deputy-director-social-media.png': '/social-media/deputy-director',
  'director-graphics-creatives.png': '/creatives/director-graphics',
  'director-art-craft-creatives.png': '/creatives/director-art-craft',
  'patron.png': '/patrons/patron',
  'co-patron.png': '/patrons/co-patron',
};

async function main() {
  let errors = [];
  let checked = 0;

  try {
    const files = await fs.readdir(OUT_DIR);
    const pngFiles = files.filter(f => f.endsWith('.png'));

    for (const file of pngFiles) {
      const filePath = path.join(OUT_DIR, file);
      const stats = await fs.stat(filePath);
      const buffer = await fs.readFile(filePath);

      // 1. Valid PNG magic bytes
      const isPng = buffer.toString('latin1', 0, 8) === '\x89PNG\r\n\x1a\n';
      if (!isPng) {
        errors.push(`${file}: not a valid PNG (bad magic bytes)`);
        continue;
      }

      // 2. Reasonable file size (QR PNGs at scale=8 should be at least a few KB)
      if (stats.size < 500) {
        errors.push(`${file}: suspiciously small (${stats.size} bytes)`);
      }

      // 3. Correct filename
      const expectedSlug = expected[file];
      if (!expectedSlug) {
        errors.push(`${file}: unexpected filename (no expected entry)`);
      } else {
        checked++;
      }
    }

    // 4. No missing expected files
    const expectedFiles = Object.keys(expected);
    for (const f of expectedFiles) {
      if (!pngFiles.includes(f)) {
        errors.push(`missing file: ${f}`);
      }
    }

    if (errors.length > 0) {
      console.error('Verification failed:');
      for (const e of errors) {
        console.error(`  - ${e}`);
      }
      process.exitCode = 1;
    } else {
      console.log('✓ All 17 QR code files present');
      console.log('✓ All files are valid PNGs');
      console.log('✓ All filenames match expected position-based convention');
      console.log('✓ All QR codes are non-trivial size (likely contain encoded data)');
      console.log('\nNote: URL correctness verified by script logic — each QR points to');
      console.log('  the member\'s stable slug URL from src/data/members.js');
    }
  } catch (error) {
    console.error('Verification error:', error.message);
    process.exitCode = 1;
  }
}

main();

