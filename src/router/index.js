import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import BlogPage from '@/views/BlogPage.vue'
import BlogDetailPage from '@/views/BlogDetailPage.vue'
import ProjectsPage from '@/views/ProjectsPage.vue'
import ProjectDetailPage from '@/views/ProjectDetailPage.vue'
import ContactPage from '@/views/ContactPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogPage
  },
  {
    path: '/blog/:slug',
    name: 'BlogDetail',
    component: BlogDetailPage
  },
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsPage
  },
  {
    path: '/projects/:slug',
    name: 'ProjectDetail',
    component: ProjectDetailPage
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
