import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'highlight.js/styles/github.css'
import 'github-markdown-css/github-markdown.css'

// 引入全局样式
import './assets/styles/global.css'
import './assets/styles/responsive.css'
import './assets/styles/aos-custom.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// 配置 vue-lazyload
app.use(VueLazyload, {
  preLoad: 1.3,
  error: '/aboutme/images/error-image.png', // 加载失败时显示的图片
  loading: '/aboutme/images/loading.png', // 加载中显示的图片
  attempt: 1
})

// 初始化 AOS
AOS.init({
  duration: 800,
  once: true
})

app.mount('#app')
