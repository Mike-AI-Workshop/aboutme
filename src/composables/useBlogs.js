import { ref } from 'vue';
import { parseMarkdownFiles } from '@/utils/markdownParser';
import path from 'path';

export function useBlogs() {
  const blogs = ref([]);

  function loadBlogs() {
    const blogsDirectory = path.resolve(__dirname, '../contents/blogs');
    const parsedBlogs = parseMarkdownFiles(blogsDirectory);
    
    blogs.value = parsedBlogs.map(blog => ({
      id: blog.filename.replace('.md', ''),
      title: blog.metadata.title || '未命名博客',
      date: blog.metadata.date || '',
      tags: blog.metadata.tags || [],
      summary: blog.metadata.summary || '',
      content: blog.content
    })).sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return {
    blogs,
    loadBlogs
  };
}