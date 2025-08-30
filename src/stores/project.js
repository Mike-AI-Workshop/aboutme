import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProjectStore = defineStore('project', () => {
  const projects = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  async function fetchProjects() {
    try {
      isLoading.value = true;
      const response = await fetch('/projects.json');
      const loadedProjects = await response.json();
      
      projects.value = loadedProjects.map(project => ({
        slug: project.filename,
        title: project.title || '未命名项目',
        date: project.date || '',
        technologies: project.technologies || [],
        description: project.description || '',
        content: project.content,
        links: project.links || {}
      })).sort((a, b) => new Date(b.date) - new Date(a.date));

      error.value = null;
    } catch (fetchError) {
      error.value = fetchError;
      console.error('获取项目列表失败', fetchError);
    } finally {
      isLoading.value = false;
    }
  }

  function getProjectBySlug(slug) {
    return projects.value.find(project => project.slug === slug);
  }

  return {
    projects,
    isLoading,
    error,
    fetchProjects,
    getProjectBySlug
  };
});