import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
        },
      },
      plugins: [
        prerender({
          routes: [
            '/',
            '/welcome',
            '/uninstall',
            '/changelog',
            '/privacy',
            '/terms'
          ],
          renderer: '@prerenderer/renderer-puppeteer',
          rendererOptions: {
            maxConcurrentRoutes: 1,
            renderAfterTime: 500,
          },
        }),
      ],
    },
  },
})