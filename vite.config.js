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
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // 确保 CSS 文件有正确的路径
          if (assetInfo.name?.endsWith('.css')) {
            return `assets/[name]-[hash][extname]`
          }
          // 处理图片和其他静态资源
          if (['png', 'jpg', 'jpeg', 'gif', 'svg'].some(ext => assetInfo.name?.endsWith(ext))) {
            return `images/[name][extname]`
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
    ]
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.{test,spec}.{js,vue}']
  }
})
