import { ref } from 'vue'

// 检测是否支持 Web Animations API
const supportsWebAnimations = 'animate' in document.body

// 检测是否启用了减少动画设置
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// 性能优化配置
export const performanceConfig = {
  // 是否启用动画
  animationsEnabled: ref(!prefersReducedMotion),
  
  // Web Animations API 支持
  supportsWebAnimations,

  // 减少动画偏好
  prefersReducedMotion,

  // 动画性能优化方法
  optimizeAnimation(element, keyframes, options = {}) {
    // 如果不支持 Web Animations API 或禁用动画，直接应用最终状态
    if (!supportsWebAnimations || !this.animationsEnabled.value) {
      Object.assign(element.style, keyframes[keyframes.length - 1])
      return null
    }

    // 默认动画配置
    const defaultOptions = {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    }

    // 合并配置
    const mergedOptions = { ...defaultOptions, ...options }

    // 执行动画
    return element.animate(keyframes, mergedOptions)
  },

  // 节流函数
  throttle(func, limit) {
    let inThrottle
    return function() {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  },

  // 防抖函数
  debounce(func, delay) {
    let timeoutId
    return function() {
      const context = this
      const args = arguments
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(context, args), delay)
    }
  },

  // 检查是否需要渲染动画
  shouldAnimate() {
    return supportsWebAnimations && this.animationsEnabled.value
  },

  // 切换动画状态
  toggleAnimations() {
    this.animationsEnabled.value = !this.animationsEnabled.value
    localStorage.setItem('animationsEnabled', this.animationsEnabled.value)
  },

  // 初始化动画设置
  initAnimationSettings() {
    // 从本地存储读取动画设置
    const storedSetting = localStorage.getItem('animationsEnabled')
    if (storedSetting !== null) {
      this.animationsEnabled.value = JSON.parse(storedSetting)
    }

    // 监听系统减少动画偏好变化
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.prefersReducedMotion = e.matches
      if (e.matches) {
        this.animationsEnabled.value = false
      }
    })
  }
}

// 初始化动画设置
performanceConfig.initAnimationSettings()