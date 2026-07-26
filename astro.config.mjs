import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || 'https://YOUR_USERNAME.github.io',
  base: process.env.BASE_PATH || '',
  output: 'static',
  integrations: [mdx(), sitemap()],
});
