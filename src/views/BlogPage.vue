<template>
  <div class="blog-page">
    <h1>博客文章</h1>
    <div class="blog-list">
      <div v-for="blog in blogs" :key="blog.slug" class="blog-item">
        <router-link :to="{ name: 'BlogDetail', params: { slug: blog.slug } }">
          <h2>{{ blog.title }}</h2>
          <p>{{ blog.date }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const blogs = ref([])

onMounted(async () => {
  const blogModules = import.meta.glob('../contents/blogs/*.md')
  const loadedBlogs = []

  for (const path in blogModules) {
    const module = await blogModules[path]()
    loadedBlogs.push({
      slug: path.split('/').pop().replace('.md', ''),
      ...module.attributes
    })
  }

  blogs.value = loadedBlogs.sort((a, b) => new Date(b.date) - new Date(a.date))
})
</script>

<style scoped>
.blog-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-list {
  display: grid;
  gap: 1rem;
}

.blog-item a {
  text-decoration: none;
  color: inherit;
}

.blog-item {
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
  transition: transform 0.3s ease;
}

.blog-item:hover {
  transform: translateX(10px);
}
</style>