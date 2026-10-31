/**
 * Site-wide constants: club identity, tenure and branding paths.
 *
 * NOTE: only touch CLUB / TENURE when the club asks for it — the tenure string
 * appears on every printed card's QR destination page.
 */

export const CLUB = {
  name: 'UCP Photography Club',
  // Rendered as two editorial lines on covers and headings.
  coverLines: ['UCP', 'Photography', 'Club'],
  statement: 'Framing UCP beyond the ordinary',
  description:
    'UCP Photography Club Executive Body and Leadership, 2026–27',
  // Tenure is written with an en dash, matching the club's own documents.
  tenure: '2026–27'
};

/** Branding assets (replace the files, not the components). */
export const BRANDING = {
  // Official club logo supplied by the club (raster). Drop a vector version at
  // the same path to upgrade it — nothing else needs to change.
  logo: '/images/branding/upc-logo.png',
  logoAlt: 'UCP Photography Club logo',
  ogImage: '/images/branding/og-cover.jpg'
};

/**
 * The club's own official accounts, shown in the footer.
 * Add more channels by extending this object.
 */
export const CLUB_LINKS = {
  instagram: 'https://www.instagram.com/upcofficials'
};

/** Build a public/ asset URL that survives a GitHub Pages base path. */
export const asset = (p) =>
  `${import.meta.env.BASE_URL}${String(p || '').replace(/^\//, '')}`;
