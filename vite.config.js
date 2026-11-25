import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'
import { themeIds }     from './src/data/themes.js'
import { wallpaperIds } from './src/data/wallpapers.js'
import { newsSlugs }    from './src/data/news.js'
import { changelog } from './src/data/changelog.js'
import { docsSlugs }    from './src/data/docs.js'

import { products } from './src/data/products.js'

const pageErrors = new WeakMap()

const routes = [
  // Static pages
  '/', '/welcome', '/uninstall', '/browser/changelog', '/privacy', '/terms', '/firefox',
  '/themes', '/theme/', '/wallpapers', '/wallpapers/guide', '/news', '/docs',
  ...changelog.map(({ version }) => `/browser/changelog/${version}`),
  ...products.map(product => product.href),
  // Docs sections
  ...products.map(({ id }) => `/docs/${id}`),
  ...docsSlugs.map(slug => `/docs/${slug}`),
  // Dynamic theme pages
  ...themeIds.map(id => `/themes/${id}`),
  // Dynamic wallpaper pages
  ...wallpaperIds.map(id => `/wallpapers/${id}`),
  // News posts
  ...newsSlugs.map(slug => `/news/${slug}`),
]

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'legacy-changelog-redirects',
      closeBundle() {
        for (const suffix of ['', ...changelog.map(({ version }) => '/' + version)]) {
          const directory = resolve('dist/changelog' + suffix)
          const target = '/browser/changelog' + suffix
          mkdirSync(directory, { recursive: true })
          writeFileSync(resolve(directory, 'index.html'), `<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>VKify</title><link rel="canonical" href="https://vkify.ru${target}"><script>location.replace(${JSON.stringify(target)} + location.search + location.hash)</script><meta http-equiv="refresh" content="0;url=${target}"></head><body><a href="${target}">VKify</a></body></html>`)
        }
      },
    },
  ],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        // rolldown/Vite 8 requires manualChunks as a function (the object
        // form throws "manualChunks is not a function").
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) {
            return 'vendor'
          }
          if (id.includes('framer-motion')) return 'animations'
        },
      },
      plugins: [
        prerender({
          routes,
          renderer: '@prerenderer/renderer-puppeteer',
          rendererOptions: {
            maxConcurrentRoutes: 4,
            // The HTML snapshot only needs the local app and its route metadata.
            skipThirdPartyRequests: true,
            inject: { isPrerender: true },
            pageSetup(page) {
              const errors = []
              pageErrors.set(page, errors)
              page.on('pageerror', error => errors.push(error.message))
            },
            async pageHandler(page, route) {
              try {
                const ready = await page.waitForFunction(
                  () => window.__VKIFY_PRERENDER_READY && document.head.querySelector('meta[property="og:title"]'),
                  { polling: 100, timeout: 30_000 },
                )
                await ready.dispose()
              } catch (error) {
                const details = pageErrors.get(page).join('; ')
                throw new Error(`Could not prerender ${route}: ${details || error.message}`, { cause: error })
              }
            },
          },
        }),
      ],
    },
  },
})
