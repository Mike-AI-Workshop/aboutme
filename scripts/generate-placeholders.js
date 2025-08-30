import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createPlaceholderImage(filename, width, height, color) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 填充背景色
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  // 添加文字
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Loading', width / 2, height / 2);

  // 保存图片
  const buffer = canvas.toBuffer('image/png');
  const outputPath = path.join(__dirname, '..', 'public', 'images', filename);
  
  // 确保目录存在
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, buffer);
}

// 创建加载中和错误占位图
createPlaceholderImage('loading.png', 200, 200, '#3498db');
createPlaceholderImage('error-image.png', 200, 200, '#e74c3c');

console.log('占位图片生成成功');