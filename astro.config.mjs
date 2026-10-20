
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://artificiideli.ro',
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
