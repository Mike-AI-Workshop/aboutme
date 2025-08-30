<template>
  <div v-if="project" class="project-detail">
    <h1>{{ project.title }}</h1>
    <p class="project-meta">项目日期：{{ project.date }}</p>
    <img :src="project.cover" :alt="project.title" class="project-cover">
    <div class="project-technologies">
      <span 
        v-for="tech in project.technologies" 
        :key="tech" 
        class="tech-tag"
      >
        {{ tech }}
      </span>
    </div>
    <div class="project-content" v-html="projectContent"></div>
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
const project = ref(null)
const projectContent = ref('')

onMounted(async () => {
  try {
    const projectModule = await import(`../contents/projects/${route.params.slug}.md`)
    const projectFile = await fetch(projectModule.default).then(res => res.text())
    const { data, content } = matter(projectFile)
    
    project.value = data
    projectContent.value = marked(content)
  } catch (error) {
    console.error('项目加载失败', error)
  }
})
</script>

<style scoped>
.project-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.project-meta {
  color: #666;
  margin-bottom: 1rem;
}

.project-cover {
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

.project-technologies {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  background-color: #f4f4f4;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.project-content {
  line-height: 1.6;
}
</style>