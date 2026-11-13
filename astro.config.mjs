// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';
// ETAPA 2 · Casos de éxito (fuera de alcance en la Etapa 1)
// import { cases } from './src/data/cases.mjs';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const SITE = (env.PUBLIC_SITE_URL || 'https://connexis.mx').replace(/\/$/, '');

// Páginas que no deben indexarse (y por lo tanto no van al sitemap).
const NOINDEX = [
  '/gracias',
  '/evaluacion',
  '/404',
  // ETAPA 2 · Los casos marcados como ejemplo quedan fuera del índice hasta que se reemplacen por casos reales.
  // ...cases.filter((c) => c.ejemplo).map((c) => `/casos-exito/${c.slug}`),
  // ...(cases.every((c) => c.ejemplo) ? ['/casos-exito'] : []),
];

export default defineConfig({
  site: SITE,
  // URLs limpias sin diagonal final: /servicios/ciberseguridad
  trailingSlash: 'never',
  build: { format: 'file' },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  image: {
    responsiveStyles: true,
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\/$/, '');
        if (NOINDEX.includes(path)) return false;
        return true;
      },
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        const path = new URL(item.url).pathname;
        if (path === '/' || path === '') item.priority = 1.0;
        else if (path.startsWith('/servicios')) item.priority = 0.9;
        // ETAPA 3 · else if (path.startsWith('/blog/')) item.priority = 0.8;
        return item;
      },
    }),
  ],
});
