import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 导入语言配置
import zhLocale from '@/locales/zh.json'
import enLocale from '@/locales/en.json'

export const useLanguageStore = defineStore('language', () => {
  // 支持的语言列表
  const supportedLanguages = ['zh', 'en']
  
  // 默认语言为中文
  const currentLanguage = ref('zh')
  
  // 语言配置映射
  const locales = {
    zh: zhLocale,
    en: enLocale
  }

  // 切换语言
  function setLanguage(lang) {
    if (supportedLanguages.includes(lang)) {
      currentLanguage.value = lang
      // 持久化存储
      localStorage.setItem('language', lang)
      // 更新 HTML 语言属性
      document.documentElement.lang = lang
    }
  }

  // 获取当前语言配置
  const currentLocale = computed(() => locales[currentLanguage.value])

  // 初始化时检查本地存储和浏览器语言
  function initLanguage() {
    // 优先读取本地存储
    const savedLang = localStorage.getItem('language')
    if (savedLang && supportedLanguages.includes(savedLang)) {
      setLanguage(savedLang)
      return
    }

    // 检查浏览器语言
    const browserLang = navigator.language.split('-')[0]
    if (supportedLanguages.includes(browserLang)) {
      setLanguage(browserLang)
      return
    }

    // 默认中文
    setLanguage('zh')
  }

  // 翻译函数
  function t(key, params = {}) {
    const keys = key.split('.')
    let result = currentLocale.value

    for (const k of keys) {
      result = result[k]
      if (!result) return key
    }

    // 简单的参数替换
    if (typeof result === 'string') {
      return result.replace(/\{(\w+)\}/g, (match, p1) => 
        params[p1] !== undefined ? params[p1] : match
      )
    }

    return result
  }

  // 获取所有支持的语言
  function getSupportedLanguages() {
    return supportedLanguages.map(lang => ({
      code: lang,
      name: {
        zh: lang === 'zh' ? '中文' : 'English',
        en: lang === 'zh' ? 'Chinese' : 'English'
      }
    }))
  }

  return {
    currentLanguage,
    setLanguage,
    currentLocale,
    initLanguage,
    t,
    getSupportedLanguages
  }
})