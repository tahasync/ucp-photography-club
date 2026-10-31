/**
 * Theme (light / dark) helpers.
 *
 * The chosen theme is stored in localStorage; with no stored preference the
 * system setting wins. `initTheme()` runs before React mounts (see main.jsx)
 * and `initThemeInline` runs inside index.html to avoid a flash of the
 * wrong theme.
 */

export const THEME_KEY = 'upc-theme';

export const THEME_META = {
  light: '#ffffff',
  dark: '#0b0b0c'
};

const systemTheme = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const storedTheme = () => {
  try {
    const saved = window.localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* storage unavailable — fall back to the system setting */
  }
  return null;
};

export const hasStoredTheme = () => storedTheme() !== null;

export const readStoredTheme = () => storedTheme() || systemTheme();

export const applyTheme = (theme, { persist = true } = {}) => {
  const resolved = theme === 'dark' ? 'dark' : 'light';
  const root = document.documentElement;

  root.dataset.theme = resolved;
  root.style.colorScheme = resolved;

  if (persist) {
    try {
      window.localStorage.setItem(THEME_KEY, resolved);
    } catch {
      /* ignore */
    }
  }

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEME_META[resolved]);
};

const listen = (media, handler) => {
  if (media.addEventListener) {
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }
  media.addListener(handler);
  return () => media.removeListener(handler);
};

/** Apply the saved/system theme and keep following the OS until the user picks one. */
export const initTheme = () => {
  applyTheme(readStoredTheme(), { persist: false });

  if (typeof window === 'undefined' || !window.matchMedia) return;

  const media = window.matchMedia('(prefers-color-scheme: dark)');
  listen(media, (event) => {
    if (!hasStoredTheme()) {
      applyTheme(event.matches ? 'dark' : 'light', { persist: false });
    }
  });
};
