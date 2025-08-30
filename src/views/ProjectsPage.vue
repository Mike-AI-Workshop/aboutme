<template>
  <div class="projects-page">
    <h1>我的作品集</h1>
    <div class="projects-list">
      <div v-for="project in projects" :key="project.slug" class="project-item">
        <router-link :to="{ name: 'ProjectDetail', params: { slug: project.slug } }">
          <h2>{{ project.title }}</h2>
          <p>{{ project.date }}</p>
          <img :src="project.cover" :alt="project.title">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const projects = ref([])

onMounted(async () => {
  const projectModules = import.meta.glob('../contents/projects/*.md')
  const loadedProjects = []

  for (const path in projectModules) {
    const module = await projectModules[path]()
    loadedProjects.push({
      slug: path.split('/').pop().replace('.md', ''),
      ...module.attributes
    })
  }

  projects.value = loadedProjects.sort((a, b) => new Date(b.date) - new Date(a.date))
})
</script>

<style scoped>
.projects-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.projects-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.project-item a {
  text-decoration: none;
  color: inherit;
  display: block;
}

.project-item {
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
  transition: transform 0.3s ease;
}

.project-item:hover {
  transform: scale(1.05);
}

.project-item img {
  max-width: 100%;
  height: auto;
}
</style>