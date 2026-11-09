import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ted0103.github.io',
  output: 'static',
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
