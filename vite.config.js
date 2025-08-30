import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/aboutme/' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (['aos.css', 'github.css', 'github-markdown.css'].includes(assetInfo.name)) {
            return `assets/${assetInfo.name}`
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      // 添加 CSS 文件的别名
      'aos/dist/aos.css': '/node_modules/aos/dist/aos.css',
      'highlight.js/styles/github.css': '/node_modules/highlight.js/styles/github.css',
      'github-markdown-css/github-markdown.css': '/node_modules/github-markdown-css/github-markdown.css'
    }
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `
          @import "aos/dist/aos.css";
          @import "highlight.js/styles/github.css";
          @import "github-markdown-css/github-markdown.css";
        `
      }
    }
  },
  optimizeDeps: {
    include: [
      'gsap', 
      'marked', 
      'highlight.js', 
      'aos'
    ],
    // 添加 CSS 文件到预构建依赖
    entries: [
      'aos/dist/aos.css',
      'highlight.js/styles/github.css',
      'github-markdown-css/github-markdown.css'
    ]
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.{test,spec}.{js,vue}']
  }
})
