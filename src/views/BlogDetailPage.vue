<template>
  <div v-if="blog" class="blog-detail">
    <h1>{{ blog.title }}</h1>
    <p class="blog-meta">发布日期：{{ blog.date }}</p>
    <div class="blog-content" v-html="blogContent"></div>
  </div>
  <div v-else>
    加载中...
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import matter from 'gray-matter'

const route = useRoute()
const blog = ref(null)
const blogContent = ref('')

onMounted(async () => {
  try {
    const blogModule = await import(`../contents/blogs/${route.params.slug}.md`)
    const blogFile = await fetch(blogModule.default).then(res => res.text())
    const { data, content } = matter(blogFile)
    
    blog.value = data
    blogContent.value = marked(content)
  } catch (error) {
    console.error('博客加载失败', error)
  }
})
</script>

<style scoped>
.blog-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-meta {
  color: #666;
  margin-bottom: 1rem;
}

.blog-content {
  line-height: 1.6;
}
</style>