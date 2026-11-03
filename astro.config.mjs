// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://run4ev.github.io',
  base: '/Irka-Porfolio',
  trailingSlash: 'always',
  integrations: [sitemap()],
  // Astro 7 defaults to 'jsx', which can drop spaces between inline elements.
  // `true` keeps normal HTML whitespace rules (important for small editorial text).
  compressHTML: true,
});
