import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/aboutme/' : '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['aos/dist/aos.css'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'aos.css') {
            return 'assets/aos.css'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "aos/dist/aos.css";`
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.{test,spec}.{js,vue}']
  }
})
