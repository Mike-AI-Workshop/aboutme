import { ref } from 'vue';
import { parseMarkdownFiles } from '@/utils/markdownParser';
import path from 'path';

export function useProjects() {
  const projects = ref([]);

  function loadProjects() {
    const projectsDirectory = path.resolve(__dirname, '../contents/projects');
    const parsedProjects = parseMarkdownFiles(projectsDirectory);
    
    projects.value = parsedProjects.map(project => ({
      id: project.filename.replace('.md', ''),
      title: project.metadata.title || '未命名项目',
      date: project.metadata.date || '',
      technologies: project.metadata.technologies || [],
      description: project.metadata.description || '',
      content: project.content,
      links: project.metadata.links || {}
    })).sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return {
    projects,
    loadProjects
  };
}