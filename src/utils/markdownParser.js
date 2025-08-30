import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

/**
 * 解析 Markdown 文件的 Front Matter
 * @param {string} filePath - Markdown 文件路径
 * @returns {Object} 包含 Front Matter 和内容的对象
 */
export function parseMarkdownFile(filePath) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      metadata: data,
      content: content.trim()
    };
  } catch (error) {
    console.error(`解析 Markdown 文件 ${filePath} 时出错:`, error);
    return {
      metadata: {},
      content: ''
    };
  }
}

/**
 * 批量解析指定目录下的 Markdown 文件
 * @param {string} directory - 包含 Markdown 文件的目录
 * @returns {Array} 解析后的 Markdown 文件列表
 */
export function parseMarkdownFiles(directory) {
  const files = fs.readdirSync(directory)
    .filter(file => path.extname(file) === '.md')
    .map(file => {
      const filePath = path.join(directory, file);
      return {
        filename: file,
        ...parseMarkdownFile(filePath)
      };
    });
  
  return files;
}