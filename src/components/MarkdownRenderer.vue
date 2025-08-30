<template>
  <div 
    class="markdown-renderer" 
    :class="[
      'markdown-body', 
      `markdown-${theme}`, 
      { 'markdown-animated': animated }
    ]"
    ref="markdownRef"
  >
    <div 
      v-if="loading" 
      class="markdown-loading"
    >
      加载中...
    </div>
    <div 
      v-else-if="error" 
      class="markdown-error"
    >
      {{ error }}
    </div>
    <div 
      v-else 
      class="markdown-content" 
      v-html="renderedContent"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import 'github-markdown-css/github-markdown.css'
import { performanceConfig } from '@/utils/performance'

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark'].includes(value)
  },
  headerLevel: {
    type: Number,
    default: 2,
    validator: (value) => value >= 1 && value <= 6
  },
  animated: {
    type: Boolean,
    default: true
  }
})

const loading = ref(true)
const error = ref(null)
const markdownRef = ref(null)

// 配置 marked 渲染器
const renderer = new marked.Renderer()

// 自定义代码块渲染，使用 highlight.js
renderer.code = (code, language) => {
  const validLanguage = hljs.getLanguage(language) ? language : 'plaintext'
  const highlightedCode = hljs.highlight(code, { language: validLanguage }).value
  return `<pre><code class="hljs language-${validLanguage}">${highlightedCode}</code></pre>`
}

// 配置 marked 选项
marked.setOptions({
  renderer: renderer,
  highlight: (code, lang) => {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  },
  langPrefix: 'hljs language-',
  breaks: true,
  gfm: true
})

// 渲染 Markdown
const renderedContent = computed(() => {
  try {
    let content = marked(props.content)
    
    // 调整标题级别
    content = adjustHeaderLevels(content)
    
    return content
  } catch (err) {
    error.value = `渲染错误: ${err.message}`
    return ''
  }
})

// 调整标题级别
function adjustHeaderLevels(content) {
  return content.replace(
    /<h(\d)>/g, 
    (match, level) => {
      const newLevel = Math.min(
        Math.max(parseInt(level) + (props.headerLevel - 2), 1), 
        6
      )
      return `<h${newLevel}>`
    }
  ).replace(
    /<\/h(\d)>/g, 
    (match, level) => {
      const newLevel = Math.min(
        Math.max(parseInt(level) + (props.headerLevel - 2), 1), 
        6
      )
      return `</h${newLevel}>`
    }
  )
}

// 添加动画效果
function addAnimation() {
  if (!props.animated || !performanceConfig.shouldAnimate()) return

  const elements = markdownRef.value.querySelectorAll(
    'h1, h2, h3, h4, h5, h6, p, ul, ol, pre, blockquote, img'
  )

  elements.forEach((el, index) => {
    performanceConfig.optimizeAnimation(el, [
      { opacity: 0, transform: 'translateY(20px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], {
      duration: 500,
      delay: index * 100,
      fill: 'forwards'
    })
  })
}

onMounted(() => {
  loading.value = false
  
  // 添加动画
  nextTick(() => {
    addAnimation()
  })
})

// 监听内容变化
watch(() => props.content, () => {
  loading.value = false
  
  nextTick(() => {
    addAnimation()
  })
})
</script>

<style scoped>
.markdown-renderer {
  max-width: 100%;
  line-height: 1.8;
  word-wrap: break-word;
}

.markdown-loading,
.markdown-error {
  text-align: center;
  color: var(--color-gray-600);
  padding: 2rem;
}

.markdown-animated {
  transition: all 0.3s ease;
}

.markdown-light {
  color: var(--color-gray-900);
  background-color: var(--color-white);
}

.markdown-dark {
  color: var(--color-gray-100);
  background-color: var(--color-gray-800);
}

/* 覆盖 github-markdown-css 的一些样式 */
.markdown-body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  padding: 1rem;
  border-radius: var(--radius-md);
}

.markdown-body img {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.markdown-body pre {
  background-color: var(--color-gray-50);
  border-radius: var(--radius-md);
  padding: 1rem;
  overflow-x: auto;
}

.markdown-body code {
  font-family: var(--font-mono);
  background-color: var(--color-gray-100);
  padding: 0.2rem 0.4rem;
  border-radius: var(--radius-sm);
}

.markdown-body blockquote {
  border-left: 4px solid var(--color-emerald-500);
  padding-left: 1rem;
  color: var(--color-gray-600);
  font-style: italic;
}

.markdown-body table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.markdown-body th,
.markdown-body td {
  border: 1px solid var(--color-gray-200);
  padding: 0.5rem;
  text-align: left;
}

.markdown-body th {
  background-color: var(--color-gray-100);
}
</style>