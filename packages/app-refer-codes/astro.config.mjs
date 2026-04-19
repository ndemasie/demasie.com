import node from '@astrojs/node'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import packageJson from './package.json' assert { type: 'json' }

// https://astro.build/config
export default defineConfig({
  root: '.',
  srcDir: './src',
  publicDir: './public',
  outDir: './dist',
  integrations: [vue()],
  trailingSlash: 'ignore',

  // SSR
  adapter: node({ mode: 'standalone' }),

  output: 'server',

  site:
    process.env.NODE_ENV === 'production'
      ? packageJson.homepage
      : 'http://localhost:10400',

  server: {
    host: process.env.HOST || '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 10400,
  },

  vite: {
    plugins: [tailwindcss()],
  },
})
