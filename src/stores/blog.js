import { defineStore } from 'pinia';
import { ref } from 'vue';
import { parseMarkdownFiles } from '@/utils/markdownParser';
import path from 'path';

export const useBlogStore = defineStore('blog', () => {
  const blogs = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  function fetchBlogs() {
    try {
      isLoading.value = true;
      const blogsDirectory = path.resolve(__dirname, '../contents/blogs');
      const parsedBlogs = parseMarkdownFiles(blogsDirectory);
      
      blogs.value = parsedBlogs.map(blog => ({
        slug: blog.filename.replace('.md', ''),
        title: blog.metadata.title || '未命名博客',
        date: blog.metadata.date || '',
        tags: blog.metadata.tags || [],
        excerpt: blog.metadata.summary || '',
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