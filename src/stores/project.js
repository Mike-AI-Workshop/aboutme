import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import matter from 'gray-matter'
import { marked } from 'marked'

export const useProjectStore = defineStore('project', () => {
  // 项目列表
  const projects = ref([])
  
  // 加载状态
  const isLoading = ref(false)
  const error = ref(null)

  // 加载项目列表
  async function fetchProjects() {
    isLoading.value = true
    error.value = null

    try {
      // 动态导入所有项目 Markdown 文件
      const projectModules = import.meta.glob('../contents/projects/*.md')
      const loadedProjects = []

      for (const path in projectModules) {
        try {
          const module = await projectModules[path]()
          const projectFile = await fetch(module.default).then(res => res.text())
          const { data, content } = matter(projectFile)

          loadedProjects.push({
            slug: path.split('/').pop().replace('.md', ''),
            ...data,
            content: marked(content)
          })
        } catch (moduleError) {
          console.error(`加载项目文件 ${path} 失败`, moduleError)
        }
      }

      // 按日期降序排序
      projects.value = loadedProjects.sort((a, b) => new Date(b.date) - new Date(a.date))
    } catch (fetchError) {
      error.value = fetchError
      console.error('获取项目列表失败', fetchError)
    } finally {
      isLoading.value = false
    }
  }

  // 获取单个项目详情
  function getProjectBySlug(slug) {
    return projects.value.find(project => project.slug === slug)
  }

  // 计算属性：项目总数
  const projectCount = computed(() => projects.value.length)

  // 计算属性：最新项目（前3个）
  const latestProjects = computed(() => projects.value.slice(0, 3))

  // 按技术类型过滤项目
  function getProjectsByTechnology(tech) {
    return projects.value.filter(project => 
      project.technologies && project.technologies.includes(tech)
    )
  }

  return {
    projects,
    isLoading,
    error,
    fetchProjects,
    getProjectBySlug,
    projectCount,
    latestProjects,
    getProjectsByTechnology
  }
})