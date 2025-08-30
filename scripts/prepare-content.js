import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function prepareMarkdownContent(directory, outputFile) {
  const contentPath = path.resolve(__dirname, '..', directory);
  const outputPath = path.resolve(__dirname, '..', 'dist', outputFile);

  const files = fs.readdirSync(contentPath)
    .filter(file => path.extname(file) === '.md')
    .map(file => {
      const filePath = path.join(contentPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        filename: file.replace('.md', ''),
        ...data,
        content: content.trim()
      };
    });

  fs.writeFileSync(outputPath, JSON.stringify(files, null, 2));
  console.log(`已生成 ${outputFile}`);
}

// 准备博客内容
prepareMarkdownContent('src/contents/blogs', 'blogs.json');

// 准备项目内容
prepareMarkdownContent('src/contents/projects', 'projects.json');