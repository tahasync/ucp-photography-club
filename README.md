# UCP Photography Club — 2026–27

Digital identity and hierarchy website for the **UCP Photography Club, 2026–27 tenure**.

Each leadership position has a **stable URL** (`/vice-president`, `/editing/director`, …) that a
printed UPC hierarchy card can point to via QR code. Scanning a card opens an editorial
digital identity page: name, position, tenure, portrait, approved links, and a route back
into the club hierarchy.

This site documents **only the current 2026–27 tenure**.

---

## 1. Tech stack

| Concern | Choice |
| --- | --- |
| Framework | React 18 + Vite 5 |
| Routing | React Router 6 (BrowserRouter, `basename` aware) |
| Motion | Framer Motion 11 (fast, ease-out, reduced-motion aware) |
| Styling | Plain CSS with custom properties (`src/styles`) — no UI kit |
| Theme | Light + dark, CSS-token based, toggle in the header, `prefers-color-scheme` aware |
| Fonts | Inter Variable, self-hosted through `@fontsource-variable/inter` |
| Build assets | `sharp` (logo, favicons, OG image, portrait compression) |
| Hosting | GitHub Pages (auto-deployed on every push to `main`) |

No backend, no database, no CMS.

---

## 1b. Light & dark theme

The site ships with two themes that share one layout and one set of semantic CSS tokens
(`--bg`, `--fg`, `--line`, `--surface`, `--muted`, `--inverse-*`).

* The header has a **sun / moon switch** (44×44px, keyboard accessible, `aria-pressed`).
* The choice is stored in `localStorage` under `upc-theme`; with no stored preference the
  operating system setting wins.
* `index.html` sets `data-theme` **before the first paint**, so there is no flash.
* The browser `<meta name="theme-color">` follows the active theme.
* Inverted sections (footer, manifesto band, mobile menu) keep their dark-panel identity in
  both themes via the `--inverse-*` tokens.

To tweak a theme, edit `:root` and the `[data-theme='dark']` block at the top of
`src/styles/globals.css` — no component changes needed.

---

## 2. Install & run

```bash
npm install        # install dependencies
npm run dev        # dev server on http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # preview the production build on http://localhost:4173
```

Optional content tasks:

```bash
npm run assets   # regenerate logo / favicons / OG image / placeholder portraits
npm run images   # optimise official portraits (after the photoshoot)
```

Both are one-off maintenance commands and are not part of the build or deployment.

---

## 3. QR code generation

```bash
npm run qr   # generate QR codes from src/data/members.js
```

### Naming convention

QR PNG filenames follow a position-based convention:

- **Positions without a department** (unique): the position alone.
  - `president.png`, `vice-president.png`, `patron.png`, `co-patron.png`
- **Duplicate positions inside a department**: `position-departmentSlug`.
  - `director-operations.png`, `director-editing.png`, `director-social-media.png`
  - `deputy-director-publications-comms.png`, `deputy-director-social-media.png`, etc.

Example: if two members share the same position `Director` but belong to
different departments, they get distinct filenames:

- `director-operations.png`  (Operations Director)
- `director-editing.png`     (Editing Director)
- `director-social-media.png`(Social Media Director)

### How it works

1. Reads every member from `src/data/members.js` (the single source of truth for
   both slugs and QR URLs).
2. Uses a `position` + `departmentSlug` combination to detect duplicates.
3. Generates one PNG per member in `public/images/qr/` with the naming above.
4. Each QR code encodes a **permanent URL** pointing to the member's stable slug
   (e.g. `/president`, `/operations/director`). Never rename a slug after cards
   are printed — QR codes must keep pointing to the same URL.

### Configuration

Generate QR codes for a specific host via the `QR_BASE_URL` environment variable:

```bash
# Local development (Vite dev server)
QR_BASE_URL=http://localhost:5173 npm run qr

# Production (GitHub Pages)
QR_BASE_URL=https://tahasync.github.io/ucp-photography-club npm run qr
```

### Print-safe settings

The script uses `errorCorrectionLevel: 'H'` (high error correction), `scale: 8`
(pixel-doubling for crisp print), and `margin: 2` (quiet zone) so the cards
print cleanly.



```text
├── index.html                  # shell, boot state, base-aware asset links
├── vite.config.js              # base path handling + 404.html deep-link emitter
├── public/
│   ├── robots.txt
│   ├── site.webmanifest
│   └── images/
│       ├── branding/           # logo, favicons, apple-touch-icon, og-cover
│       ├── members/            # portraits (placeholders until the shoot)
│       └── qr/                 # generated QR codes (17 PNGs, source: scripts/generate-qr-codes.mjs)
├── scripts/
│   ├── 404.template.html       # static-host deep-link fallback template (used by the build)
│   ├── generate-assets.mjs     # branding + placeholder generation
│   ├── generate-qr-codes.mjs   # QR code generation (17 PNGs)
│   └── optimize-images.mjs     # portrait optimisation for the official shoot
└── src/
    ├── components/             # Navigation, MobileMenu, PersonHero, Portrait, Arrow, …
    ├── data/
    │   ├── site.js             # club identity, tenure, branding paths
    │   ├── members.js          # every person + QR slug (single source of truth)
    │   ├── hierarchy.js        # the five teams, order and placeholder intros
    │   ├── patrons.js          # Patron and Co-Patron directory
    │   └── navigation.js       # primary nav items + active-state rules
    ├── lib/motion.js           # shared easing/duration/stagger tokens
    ├── pages/                  # Home, PresentBody, Patrons, Hierarchy, Department, Person, 404
    ├── styles/                 # fonts.css, globals.css, animations.css
    ├── App.jsx                 # route table generated from the data layer
    └── main.jsx                # router bootstrap + deep-link restore
```

**Rule of thumb:** never hard-code a person, position or team in a component. Everything
comes from `src/data`.

---

## 4. How to change members

All people live in [`src/data/members.js`](src/data/members.js). The object key **is** the URL slug.

```js
'vice-president': {
  slug: 'vice-president',
  path: '/vice-president',        // what the QR code points to
  name: 'Taha Naeem',
  position: 'Vice President',
  positionLines: ['Vice', 'President'], // how the position stacks visually
  body: 'President Body',
  group: 'present-body',          // 'present-body' | 'hierarchy' | 'patrons'
  departmentSlug: null,           // 'operations' | 'editing' | 'comms' | …
  order: 2,                       // position order inside the team
  image: '/images/members/taha-naeem.jpg',
  imageWebp: '/images/members/taha-naeem.webp',
  imagePlaceholder: false,
  bio: 'Approved introduction…',
  bioIsPlaceholder: false,        // set false once the copy is official
  role: '',                       // optional extra line, hidden when empty
  links: { instagram: '', linkedin: '', email: '', portfolio: '' }
}
```

* **Add a member** – add a record (key = slug) to `members.js`; the route, the department
  listing and the page are generated automatically.
* **Rename someone** – change `name` only. Never change `slug` after cards are printed.
* **Reorder positions** – change `order`.
* **Team intros & names** – `src/data/hierarchy.js` (`name`, `index`, `intro`, `introIsPlaceholder`).
  Display names may change freely; the `slug`/`route` must not. Current display names:

  | slug | Display name | Route |
  | --- | --- | --- |
  | `operations` | Operations | `/operations` |
  | `editing` | Editing | `/editing` |
  | `comms` | Comms | `/comms` |
  | `social-media` | Social Media | `/social-media` |
  | `creatives` | Creatives | `/creatives` |

  The slug, the member `departmentSlug` and the URL stay `comms` / `creatives` so already
  printed QR codes keep working — only the visible team name changed.
* **Patrons** – `src/data/members.js` (`patrons/patron`, `patrons/co-patron`). Official names
  and introductions supplied by the club for the 2026–27 tenure.

After editing, rebuild (`npm run build`) and open any QR URL with `npm run preview` to confirm it
still resolves.

---

## 5. Update portraits

Each current member record points to an optimized portrait in `public/images/members/`.
When replacing or adding a portrait:

When real portraits arrive:

1. Put the full-resolution originals (JPG/PNG) in `assets-source/members/`, named with the
   person, e.g. `taha-naeem.jpg`, `mateen-kashif.jpg`.
2. Run:

   ```bash
   npm run images
   ```

   The script writes `public/images/members/<slug>.jpg` (max 1600px wide) and a `.webp`
   version, then prints the exact data snippet to paste.
3. In `src/data/members.js`, set that member's image fields to:

   ```js
   image: '/images/members/taha-naeem.jpg',
   imageWebp: '/images/members/taha-naeem.webp',
   imagePlaceholder: false,
   ```

   Setting `imagePlaceholder: false` also removes the "Placeholder portrait" caption.

**Photo guidance** (for the shoot): portrait orientation, 4:5 crop, consistent background and
lighting, high resolution, face positioned safely for responsive cropping. No filters are
applied by the site — the photographer's original work is preserved.

If an image file is ever missing, the page falls back to a neutral panel instead of a broken
image.

---

## 6. Replace the logo and favicons

The official logo (`Logo-Photography-Club-01.png`) is already integrated as a trimmed,
optimised PNG:

```text
public/images/branding/upc-logo.png
```

* Keep the same filename and nothing else needs to change.
* If the club supplies a **vector** logo later, drop it in as `upc-logo.svg` and point
  `BRANDING.logo` in `src/data/site.js` at it — components never hard-code the path.
* Regenerate every derived asset (favicons, Apple touch icon, PWA icons, OG image) with:

  ```bash
  npm run assets           # uses D:\UPC\Logo-Photography-Club-01.png
  LOGO_PATH=/path/to/logo.png npm run assets   # or point at another file
  ```

  Outputs: `favicon.svg`, `favicon-16/32/48.png`, `apple-touch-icon.png`, `icon-192/512.png`
  and `og-cover.jpg` (1200×630 social preview).

The header and home cover use the supplied logo image. Its rendered size is reserved in the
markup so a slow image or stylesheet load cannot make it expand over the navigation.

---

## 7. Add social links

Links are per-member and optional in `src/data/members.js`:

```js
links: {
  instagram: 'https://www.instagram.com/…',
  linkedin: 'https://www.linkedin.com/in/…',
  email: 'name@example.com',      // rendered as mailto:name@example.com
  portfolio: 'https://…'
}
```

* Only non-empty values are rendered, in the order Instagram → LinkedIn → Portfolio → Email.
* External links open with `target="_blank" rel="noopener noreferrer"`.
* While a member has no links, the page shows a neutral note instead of an empty list.

Do not invent links — leave them empty until the club supplies approved accounts.

---

## 8. QR URLs — the printed card flow

```text
printed UPC card (name, position, 2026–27, QR)
        ↓
https://<domain>/vice-president
        ↓
digital identity page
        ↓
hierarchy / present body
```

The site never generates QR codes and never passes data through the code — the QR simply
opens a stable URL.

### Stable destinations (2026–27)

```text
/                        /president
/present-body            /vice-president
/patrons                 /operations/director
/hierarchy               /operations/deputy-director
/operations              /operations/assistant-director
/editing                 /editing/director · /editing/deputy-director · /editing/assistant-director
/comms                   /comms/director-publications · /comms/deputy-director-publications · /comms/director-communications
/social-media            /social-media/director · /social-media/deputy-director
/creatives               /creatives/director-graphics · /creatives/director-art-craft
/patrons/patron          /patrons/co-patron
```

**Rule:** once a card is printed, never change that URL. To update a person, edit
`src/data/members.js` — the URL stays the same.

### Testing before printing

```bash
npm run build
npm run preview   # then open each destination, e.g. http://localhost:4173/vice-president
```

Or open any URL directly in a browser and refresh — direct loads and hard refreshes both work on
GitHub Pages because every route is pre-rendered (see below) with `dist/404.html` as a fallback.

Every QR destination is also **pre-rendered as a real folder** at build time: the Vite plugin
in `vite.config.js` writes `dist/vice-president/index.html`, `dist/editing/director/index.html`,
and so on for all 25 non-root routes. That means a scanned QR link returns **HTTP 200** with no
404 request in the browser console — `dist/404.html` is then only a safety net for unknown URLs.

---

## 9. Deploy (GitHub Pages only)

Every push to `main` automatically rebuilds and republishes the site.

1. Push the repository to `main`.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions** (already set).
3. The included workflow (`.github/workflows/deploy.yml`) runs `npm run build:gh` (which sets
   `VITE_BASE=/ucp-photography-club/` from `.env.github`) and publishes `dist/`.
4. Site: `https://tahasync.github.io/ucp-photography-club/`

To use a custom domain later, add it under **Settings → Pages** and a `CNAME` file to
`public/` — the rest of the build needs no change.

Local check of the GitHub Pages build (base path + deep links):

```bash
npm run build:gh    # then serve dist/ with any static server and open a QR URL
```

### Custom domain / repository rename

If the site moves to a root domain or the repo is renamed, update `VITE_BASE` in `.env.github`
(or add a `.env.production` with `VITE_BASE=/`). The router `basename`, asset URLs, manifest
and `404.html` all follow that single value.

---

## 10. Accessibility & performance

Implemented:

* semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, skip link
* keyboard support everywhere; visible red focus outlines; ~44px minimum touch targets
* mobile menu traps focus, closes on `Escape`, locks background scroll
* descriptive `alt` text; placeholders are announced as placeholders, never as real photos
* full `prefers-reduced-motion` support (CSS + Framer Motion)
* route-level code splitting, lazy portraits, WebP sources, `width`/`height` to avoid CLS
* single 48 kB Latin font subset, no blocking third-party requests

Targets: Lighthouse Performance 90+ and Accessibility 90+ on the QR profile pages.

---

## 11. Content status

| Item | Where | Current state |
| --- | --- | --- |
| Portraits (17 records) | `public/images/members/` + `members.js` | optimized JPG and WebP portraits in use |
| Bios | `src/data/members.js` (`bio`, `bioIsPlaceholder`) | supplied and copy-edited |
| Public links | `src/data/members.js` (`links`) | supplied for all current members |
| Team introductions | `src/data/hierarchy.js` (`intro`, `introIsPlaceholder`) | approved copy still needed |
| Patron & Co-Patron names | `src/data/members.js` (`patrons/*`) | supplied |
| Vector logo | `public/images/branding/` | optimised raster logo in use |
| Custom domain | hosting dashboard | not set |

---

## 12. Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| Deep link (e.g. `/vice-president`) shows a server 404 | Build the GitHub Pages variant (`npm run build:gh`) so the route folders are generated, and confirm Pages uses the **GitHub Actions** source |
| Blank page or 404s for assets on GitHub Pages | Base path mismatch — rebuild with `npm run build:gh`, or fix `VITE_BASE` |
| Portrait not showing | File name/path must match `image` in `members.js`; missing files fall back to a neutral panel |
| Old content after editing data | Rebuild (`npm run build`) — data is bundled at build time |
| A QR URL 404s after a data edit | A slug was renamed. Restore it, or keep the old path as a redirect |

---

## 13. Scope notes

Deliberately **not** included: previous-tenure archives, historical leadership, invented
members, invented social accounts, generated QR images, admin dashboards, or an on-screen
replica of the printed card. The design language (black/white/red editorial, large type,
photographic crops, restrained motion) follows the club's 2026–27 hierarchy document.


