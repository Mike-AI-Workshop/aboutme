<template>
  <div class="blog-page" ref="blogPageRef">
    <div class="blog-header" ref="blogHeaderRef">
      <h1>博客文章</h1>
      <p>记录技术成长和思考</p>
    </div>

    <div v-if="blogStore.isLoading" class="loading">
      加载中...
    </div>
    <div v-else-if="blogStore.error" class="error">
      加载失败：{{ blogStore.error }}
    </div>
    <div v-else-if="blogStore.blogs.length === 0" class="no-blogs">
      暂无博客文章
    </div>
    <div v-else class="blog-list">
      <div 
        v-for="(blog, index) in blogStore.blogs" 
        :key="blog.slug" 
        class="blog-item"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
        ref="blogItemRefs"
      >
        <router-link :to="{ name: 'BlogDetail', params: { slug: blog.slug } }">
          <div class="blog-item-content">
            <h2>{{ blog.title }}</h2>
            <p class="blog-date">{{ blog.date }}</p>
            <p class="blog-excerpt" v-if="blog.excerpt">{{ blog.excerpt }}</p>
            <div class="blog-tags" v-if="blog.tags">
              <span 
                v-for="tag in blog.tags" 
                :key="tag" 
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useBlogStore } from '@/stores/blog'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AOS from 'aos'
import 'aos/dist/aos.css'

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger)

const blogStore = useBlogStore()
const blogPageRef = ref(null)
const blogHeaderRef = ref(null)
const blogItemRefs = ref([])

onMounted(() => {
  // 初始化 AOS
  AOS.init({
    duration: 800,
    once: true
  })

  // 加载博客列表
  blogStore.fetchBlogs()

  // GSAP 动画
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // 页面头部动画
  tl.fromTo(blogHeaderRef.value, 
    { opacity: 0, y: -50 }, 
    { opacity: 1, y: 0, duration: 0.8 }
  )
})

onUnmounted(() => {
  // 销毁 AOS
  AOS.refresh()
})
</script>

<style scoped>
.blog-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-header {
  text-align: center;
  margin-bottom: 2rem;
}

.blog-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.blog-header p {
  color: #666;
  font-size: 1.1rem;
}

.loading, .error, .no-blogs {
  text-align: center;
  color: #666;
  padding: 2rem;
}

.blog-list {
  display: grid;
  gap: 1.5rem;
}

.blog-item {
  border-bottom: 1px solid #eee;
  padding-bottom: 1.5rem;
  transition: transform 0.3s ease;
}

.blog-item:hover {
  transform: translateX(10px);
}

.blog-item a {
  text-decoration: none;
  color: inherit;
  display: block;
}

.blog-item-content h2 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
}

.blog-date {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.blog-excerpt {
  color: #666;
  margin-bottom: 0.5rem;
}

.blog-tags {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag {
  background-color: #f4f4f4;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}
</style>