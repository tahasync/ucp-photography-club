/**
 * Branding + placeholder asset generator.
 *
 *   npm run assets            (uses D:/UPC/Logo-Photography-Club-01.png)
 *   LOGO_PATH=... npm run assets
 *
 * Outputs (all replaceable later without touching components):
 *   public/images/branding/upc-logo.png        optimised official logo (hi-res)
 *   public/images/branding/favicon.svg         complete logo, contain-fit square
 *   public/images/branding/favicon-16.png, favicon-32.png
 *   public/images/branding/apple-touch-icon.png
 *   public/images/branding/icon-192.png, icon-512.png
 *   public/images/branding/og-cover.jpg        Open Graph image (1200x630)
 *   public/images/members/member-placeholder-0{1,2,3}.jpg/.webp
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const LOGO_SOURCE =
  process.env.LOGO_PATH || path.join('D:', 'UPC', 'Logo-Photography-Club-01.png');

const BRAND_DIR = path.join(ROOT, 'public', 'images', 'branding');
const MEMBER_DIR = path.join(ROOT, 'public', 'images', 'members');

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

/**
 * Fit the COMPLETE logo (camera icon + full wordmark) into a square canvas
 * using `contain`, centred, on a solid white background with a little
 * padding — so the entire lockup stays visible and nothing gets cropped,
 * whatever the logo's aspect ratio. Returns a `size x size` PNG.
 */
const squareLogoIcon = async (buffer, size, paddingRatio = 0.1, background = WHITE) => {
  const pad = Math.round(size * paddingRatio);
  const inner = Math.max(8, size - pad * 2);
  const resized = await sharp(buffer)
    .resize({ width: inner, height: inner, fit: 'contain', background })
    .toBuffer();
  const rMeta = await sharp(resized).metadata();
  const left = Math.round((size - rMeta.width) / 2);
  const top = Math.round((size - rMeta.height) / 2);
  return sharp({
    create: { width: size, height: size, channels: 4, background }
  })
    .composite([{ input: resized, left, top }])
    .png({ compressionLevel: 9 })
    .toBuffer();
};

const memberPlaceholderSvg = (variant) => {
  const headY = 520 + variant * 14;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500">
  <rect width="1200" height="1500" fill="#f5f5f5"/>
  <circle cx="600" cy="${headY}" r="200" fill="#e2e2e2"/>
  <path d="M600 700c-152 0-302 132-332 334-12 76-18 210-18 466h700c0-256-6-390-18-466-30-202-180-334-332-334z" fill="#e2e2e2"/>
  <rect x="44" y="44" width="1112" height="1412" fill="none" stroke="#e5e5e5" stroke-width="2"/>
  <rect x="84" y="118" width="88" height="6" fill="#000000"/>
  <rect x="84" y="1372" width="132" height="8" fill="#ff0000"/>
</svg>`;
};

const main = async () => {
  await fs.mkdir(BRAND_DIR, { recursive: true });
  await fs.mkdir(MEMBER_DIR, { recursive: true });

  // ---------------------------------------------------------------- logo
  const source = await fs.readFile(LOGO_SOURCE);
  const trimmedBuffer = await sharp(source).trim({ threshold: 12 }).png().toBuffer();

  const logo = await sharp(trimmedBuffer)
    .resize({ width: 2400, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toBuffer();
  const logoMeta = await sharp(logo).metadata();
  await fs.writeFile(path.join(BRAND_DIR, 'upc-logo.png'), logo);

  // ------------------------------------------------------------ favicons
  // Complete logo (icon + wordmark), contain-fit into a square on a solid
  // white background — never cropped, so the full lockup always shows.
  const logo128 = await squareLogoIcon(trimmedBuffer, 128, 0.08);
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <rect width="128" height="128" fill="#ffffff"/>
  <image href="data:image/png;base64,${logo128.toString('base64')}" width="128" height="128"/>
</svg>
`;
  await fs.writeFile(path.join(BRAND_DIR, 'favicon.svg'), faviconSvg);
  await fs.writeFile(
    path.join(BRAND_DIR, 'favicon-16.png'),
    await squareLogoIcon(trimmedBuffer, 16, 0.06)
  );
  await fs.writeFile(
    path.join(BRAND_DIR, 'favicon-32.png'),
    await squareLogoIcon(trimmedBuffer, 32, 0.06)
  );
  await fs.writeFile(
    path.join(BRAND_DIR, 'apple-touch-icon.png'),
    await squareLogoIcon(trimmedBuffer, 180, 0.12)
  );
  await fs.writeFile(
    path.join(BRAND_DIR, 'icon-192.png'),
    await squareLogoIcon(trimmedBuffer, 192, 0.12)
  );
  await fs.writeFile(
    path.join(BRAND_DIR, 'icon-512.png'),
    await squareLogoIcon(trimmedBuffer, 512, 0.1)
  );

  // ------------------------------------------------------------ OG image
  const ogLogo = await sharp(trimmedBuffer)
    .resize({ height: 430, fit: 'inside', withoutEnlargement: true })
    .png()
    .toBuffer();
  const ogLogoMeta = await sharp(ogLogo).metadata();
  const redBar = Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="630"><rect width="26" height="630" fill="#ff0000"/></svg>'
  );

  await sharp({
    create: { width: 1200, height: 630, channels: 3, background: '#ffffff' }
  })
    .composite([
      { input: redBar, top: 0, left: 0 },
      {
        input: ogLogo,
        top: Math.round((630 - ogLogoMeta.height) / 2),
        left: Math.round((1200 - ogLogoMeta.width) / 2)
      }
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(BRAND_DIR, 'og-cover.jpg'));

  // -------------------------------------------- neutral member portraits
  for (const variant of [1, 2, 3]) {
    const svg = Buffer.from(memberPlaceholderSvg(variant));
    const base = path.join(MEMBER_DIR, `member-placeholder-0${variant}`);
    await sharp(svg).jpeg({ quality: 82, mozjpeg: true }).toFile(`${base}.jpg`);
    await sharp(svg).webp({ quality: 78 }).toFile(`${base}.webp`);
  }

  console.log('Branding assets written to public/images/branding');
  console.log(
    `  logo: ${logoMeta.width}x${logoMeta.height} | favicons: complete logo, contain-fit (uncropped)`
  );
  console.log('Member placeholders written to public/images/members');
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

