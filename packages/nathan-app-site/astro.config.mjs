import nodejs from '@astrojs/node'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import { defineConfig } from 'astro/config'

import packageJson from './package.json' assert { type: 'json' }
import { Language } from './src/types/Language'

// https://astro.build/config
export default defineConfig({
  root: '.',
  srcDir: './src',
  publicDir: './public',
  outDir: './dist',
  integrations: [react(), svelte(), sitemap()],
  trailingSlash: 'ignore',

  // SSR
  adapter: nodejs({ mode: 'standalone' }),
  output: 'server',

  experimental: {
    svg: true,
  },

  site:
    process.env.NODE_ENV === 'production'
      ? packageJson.homepage
      : 'http://localhost:10100',

  server: {
    host: process.env.HOST || '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 10100,
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },

  i18n: {
    locales: Object.values(Language),
    defaultLocale: Language.EN,
    routing: {
      prefixDefaultLocale: true,
    },
  },

  vite: {
    ssr: {
      // https://docs.astro.build/en/guides/styling/#import-a-stylesheet-from-an-npm-package
      // https://vitejs.dev/config/ssr-options.html#ssr-noexternal
      noExternal: ['modern-normalize'],
    },
  },
})
