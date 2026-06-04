import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'
import { themeIds }     from './src/data/themes.js'
import { wallpaperIds } from './src/data/wallpapers.js'
import { newsSlugs }    from './src/data/news.js'

const routes = [
  // Static pages
  '/', '/welcome', '/uninstall', '/changelog', '/privacy', '/terms',
  '/themes', '/wallpapers', '/news',
  // Dynamic theme pages
  ...themeIds.map(id => `/themes/${id}`),
  // Dynamic wallpaper pages
  ...wallpaperIds.map(id => `/wallpapers/${id}`),
  // News posts
  ...newsSlugs.map(slug => `/news/${slug}`),
]

export default defineConfig({
  plugins: [react()],
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
            renderAfterTime: 1200,
          },
        }),
      ],
    },
  },
})