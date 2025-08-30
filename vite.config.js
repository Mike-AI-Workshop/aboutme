import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/aboutme/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // 确保 CSS 文件有正确的路径
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
      // 使用绝对路径导入 CSS
      'aos/dist/aos.css': '/node_modules/aos/dist/aos.css',
      'highlight.js/styles/github.css': '/node_modules/highlight.js/styles/github.css',
      'github-markdown-css/github-markdown.css': '/node_modules/github-markdown-css/github-markdown.css'
    }
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `
          @import "/node_modules/aos/dist/aos.css";
          @import "/node_modules/highlight.js/styles/github.css";
          @import "/node_modules/github-markdown-css/github-markdown.css";
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
    ]
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.{test,spec}.{js,vue}']
  }
})
