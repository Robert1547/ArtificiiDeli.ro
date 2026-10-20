import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://Robert1547.github.io',
  base: '/ArtificiiDeli.ro',
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
