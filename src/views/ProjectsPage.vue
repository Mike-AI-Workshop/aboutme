<template>
  <div class="projects-page" ref="projectsPageRef">
    <div class="projects-header" ref="projectsHeaderRef">
      <h1>我的作品集</h1>
      <p>记录技术成长和创造力</p>
    </div>

    <div v-if="projectStore.isLoading" class="loading">
      加载中...
    </div>
    <div v-else-if="projectStore.error" class="error">
      加载失败：{{ projectStore.error }}
    </div>
    <div v-else-if="projectStore.projects.length === 0" class="no-projects">
      暂无项目
    </div>
    <div v-else class="projects-list">
      <div 
        v-for="(project, index) in projectStore.projects" 
        :key="project.slug" 
        class="project-item"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
        ref="projectItemRefs"
      >
        <router-link :to="{ name: 'ProjectDetail', params: { slug: project.slug } }">
          <div class="project-item-content">
            <div class="project-image-wrapper">
              <img :src="project.cover" :alt="project.title" class="project-image">
            </div>
            <div class="project-info">
              <h2>{{ project.title }}</h2>
              <p class="project-date">{{ project.date }}</p>
              <p class="project-excerpt" v-if="project.excerpt">{{ project.excerpt }}</p>
              <div class="project-technologies">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech" 
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useProjectStore } from '@/stores/project'
import { gsap } from 'gsap'
import AOS from 'aos'
import 'aos/dist/aos.css'

const projectStore = useProjectStore()
const projectsPageRef = ref(null)
const projectsHeaderRef = ref(null)
const projectItemRefs = ref([])

onMounted(() => {
  // 初始化 AOS
  AOS.init({
    duration: 800,
    once: true
  })

  // 加载项目列表
  projectStore.fetchProjects()

  // GSAP 动画
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // 页面头部动画
  tl.fromTo(projectsHeaderRef.value, 
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
.projects-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.projects-header {
  text-align: center;
  margin-bottom: 2rem;
}

.projects-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.projects-header p {
  color: #666;
  font-size: 1.1rem;
}

.loading, .error, .no-projects {
  text-align: center;
  color: #666;
  padding: 2rem;
}

.projects-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.project-item {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.project-item a {
  text-decoration: none;
  color: inherit;
  display: block;
}

.project-item-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.project-image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
}

.project-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-item:hover .project-image {
  transform: scale(1.1);
}

.project-info {
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.project-info h2 {
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.project-date {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.project-excerpt {
  color: #666;
  margin-bottom: 0.5rem;
  flex-grow: 1;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tech-tag {
  background-color: #f4f4f4;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .projects-list {
    grid-template-columns: 1fr;
  }
}
</style>