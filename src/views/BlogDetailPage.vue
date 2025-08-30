<template>
  <div class="blog-detail" ref="blogDetailRef">
    <div v-if="blog" class="blog-content">
      <div class="blog-header" ref="blogHeaderRef">
        <h1>{{ blog.title }}</h1>
        <div class="blog-meta">
          <span class="blog-date">发布日期：{{ blog.date }}</span>
          <div v-if="blog.tags" class="blog-tags">
            <span 
              v-for="tag in blog.tags" 
              :key="tag" 
              class="tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <div class="blog-body" ref="blogBodyRef">
        <MarkdownRenderer 
          :content="blog.content" 
          :header-level="2"
        />
      </div>

      <div class="blog-navigation" ref="blogNavigationRef">
        <router-link 
          v-if="prevBlog" 
          :to="{ name: 'BlogDetail', params: { slug: prevBlog.slug } }" 
          class="nav-link prev-link"
        >
          <span>← 上一篇</span>
          <p>{{ prevBlog.title }}</p>
        </router-link>
        <router-link 
          v-if="nextBlog" 
          :to="{ name: 'BlogDetail', params: { slug: nextBlog.slug } }" 
          class="nav-link next-link"
        >
          <span>下一篇 →</span>
          <p>{{ nextBlog.title }}</p>
        </router-link>
      </div>
    </div>
    <div v-else-if="blogStore.isLoading" class="loading">
      加载中...
    </div>
    <div v-else-if="blogStore.error" class="error">
      加载失败：{{ blogStore.error }}
    </div>
    <div v-else class="not-found">
      未找到博客文章
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import { gsap } from 'gsap'
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'

const route = useRoute()
const blogStore = useBlogStore()

const blogDetailRef = ref(null)
const blogHeaderRef = ref(null)
const blogBodyRef = ref(null)
const blogNavigationRef = ref(null)

const blog = computed(() => blogStore.getBlogBySlug(route.params.slug))

const prevBlog = computed(() => {
  const currentIndex = blogStore.blogs.findIndex(b => b.slug === route.params.slug)
  return currentIndex > 0 ? blogStore.blogs[currentIndex - 1] : null
})

const nextBlog = computed(() => {
  const currentIndex = blogStore.blogs.findIndex(b => b.slug === route.params.slug)
  return currentIndex < blogStore.blogs.length - 1 ? blogStore.blogs[currentIndex + 1] : null
})

onMounted(() => {
  // 如果博客列表为空，先加载博客列表
  if (blogStore.blogs.length === 0) {
    blogStore.fetchBlogs()
  }

  // GSAP 动画
  if (blog.value) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // 头部动画
    tl.fromTo(blogHeaderRef.value, 
      { opacity: 0, y: -50 }, 
      { opacity: 1, y: 0, duration: 0.8 }
    )

    // 内容动画
    tl.fromTo(blogBodyRef.value, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.4'
    )

    // 导航动画
    tl.fromTo(blogNavigationRef.value, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.6 },
      '-=0.3'
    )
  }
})
</script>

<style scoped>
.blog-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-header {
  margin-bottom: 2rem;
  text-align: center;
}

.blog-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.blog-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: #666;
}

.blog-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  background-color: #f4f4f4;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.blog-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  max-width: 45%;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #666;
}

.prev-link {
  text-align: left;
}

.next-link {
  text-align: right;
}

.nav-link span {
  display: block;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.nav-link p {
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.loading, .error, .not-found {
  text-align: center;
  color: #666;
  padding: 2rem;
}
</style>