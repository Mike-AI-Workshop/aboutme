<template>
  <div class="project-detail" ref="projectDetailRef">
    <div v-if="project" class="project-content">
      <div class="project-header" ref="projectHeaderRef">
        <h1>{{ project.title }}</h1>
        <div class="project-meta">
          <span class="project-date">项目日期：{{ project.date }}</span>
          <div v-if="project.technologies" class="project-technologies">
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

      <div class="project-gallery" ref="projectGalleryRef">
        <div class="main-cover">
          <img :src="project.cover" :alt="project.title" class="cover-image">
        </div>
        <div 
          v-if="project.screenshots" 
          class="project-screenshots"
        >
          <div 
            v-for="(screenshot, index) in project.screenshots" 
            :key="index" 
            class="screenshot-item"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <img :src="screenshot" :alt="`项目截图 ${index + 1}`">
          </div>
        </div>
      </div>

      <div class="project-body" ref="projectBodyRef">
        <MarkdownRenderer 
          :content="project.content" 
          :header-level="2"
        />
      </div>

      <div class="project-links" ref="projectLinksRef" v-if="project.links">
        <h2>项目链接</h2>
        <div class="links-container">
          <a 
            v-for="(link, name) in project.links" 
            :key="name"
            :href="link"
            target="_blank"
            class="project-link"
          >
            {{ name }}
          </a>
        </div>
      </div>

      <div class="project-navigation" ref="projectNavigationRef">
        <router-link 
          v-if="prevProject" 
          :to="{ name: 'ProjectDetail', params: { slug: prevProject.slug } }" 
          class="nav-link prev-link"
        >
          <span>← 上一个项目</span>
          <p>{{ prevProject.title }}</p>
        </router-link>
        <router-link 
          v-if="nextProject" 
          :to="{ name: 'ProjectDetail', params: { slug: nextProject.slug } }" 
          class="nav-link next-link"
        >
          <span>下一个项目 →</span>
          <p>{{ nextProject.title }}</p>
        </router-link>
      </div>
    </div>
    <div v-else-if="projectStore.isLoading" class="loading">
      加载中...
    </div>
    <div v-else-if="projectStore.error" class="error">
      加载失败：{{ projectStore.error }}
    </div>
    <div v-else class="not-found">
      未找到项目
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '@/stores/project'
import { gsap } from 'gsap'
import AOS from 'aos'
import 'aos/dist/aos.css'
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'

const route = useRoute()
const projectStore = useProjectStore()

const projectDetailRef = ref(null)
const projectHeaderRef = ref(null)
const projectGalleryRef = ref(null)
const projectBodyRef = ref(null)
const projectLinksRef = ref(null)
const projectNavigationRef = ref(null)

const project = computed(() => projectStore.getProjectBySlug(route.params.slug))

const prevProject = computed(() => {
  const currentIndex = projectStore.projects.findIndex(p => p.slug === route.params.slug)
  return currentIndex > 0 ? projectStore.projects[currentIndex - 1] : null
})

const nextProject = computed(() => {
  const currentIndex = projectStore.projects.findIndex(p => p.slug === route.params.slug)
  return currentIndex < projectStore.projects.length - 1 ? projectStore.projects[currentIndex + 1] : null
})

onMounted(() => {
  // 初始化 AOS
  AOS.init({
    duration: 800,
    once: true
  })

  // 如果项目列表为空，先加载项目列表
  if (projectStore.projects.length === 0) {
    projectStore.fetchProjects()
  }

  // GSAP 动画
  if (project.value) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // 头部动画
    tl.fromTo(projectHeaderRef.value, 
      { opacity: 0, y: -50 }, 
      { opacity: 1, y: 0, duration: 0.8 }
    )

    // 画廊动画
    tl.fromTo(projectGalleryRef.value, 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 0.8 },
      '-=0.4'
    )

    // 内容动画
    tl.fromTo(projectBodyRef.value, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.4'
    )

    // 链接动画
    if (projectLinksRef.value) {
      tl.fromTo(projectLinksRef.value, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.6 },
        '-=0.3'
      )
    }

    // 导航动画
    tl.fromTo(projectNavigationRef.value, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.6 },
      '-=0.3'
    )
  }
})
</script>

<style scoped>
.project-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.project-header {
  text-align: center;
  margin-bottom: 2rem;
}

.project-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.project-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: #666;
}

.project-technologies {
  display: flex;
  gap: 0.5rem;
}

.tech-tag {
  background-color: #f4f4f4;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.project-gallery {
  margin-bottom: 2rem;
}

.main-cover {
  margin-bottom: 1rem;
}

.cover-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.project-screenshots {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.screenshot-item img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.screenshot-item img:hover {
  transform: scale(1.05);
}

.project-links {
  margin-top: 2rem;
}

.links-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.project-link {
  text-decoration: none;
  background-color: #333;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.project-link:hover {
  background-color: #555;
}

.project-navigation {
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

@media (max-width: 768px) {
  .project-navigation {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-link {
    max-width: 100%;
  }
}
</style>