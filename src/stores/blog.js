import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBlogStore = defineStore('blog', () => {
  const blogs = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  async function fetchBlogs() {
    try {
      isLoading.value = true;
      const response = await fetch('/blogs.json');
      const loadedBlogs = await response.json();
      
      blogs.value = loadedBlogs.map(blog => ({
        slug: blog.filename,
        title: blog.title || '未命名博客',
        date: blog.date || '',
        tags: blog.tags || [],
        excerpt: blog.summary || '',
        content: blog.content
      })).sort((a, b) => new Date(b.date) - new Date(a.date));

      error.value = null;
    } catch (fetchError) {
      error.value = fetchError;
      console.error('获取博客列表失败', fetchError);
    } finally {
      isLoading.value = false;
    }
  }

  function getBlogBySlug(slug) {
    return blogs.value.find(blog => blog.slug === slug);
  }

  return {
    blogs,
    isLoading,
    error,
    fetchBlogs,
    getBlogBySlug
  };
});