import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://artificiideli.ro',
  base: '/ArtificiiDeli.ro',
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
