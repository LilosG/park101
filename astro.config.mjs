// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://park101carlsbad.com',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap(), keystatic(), react()],

  adapter: vercel()
});
