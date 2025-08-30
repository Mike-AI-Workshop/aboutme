<template>
  <div class="language-switch">
    <div 
      class="language-dropdown" 
      @click="toggleDropdown" 
      ref="dropdownRef"
    >
      <span class="current-language">
        {{ currentLanguageName }}
      </span>
      <div 
        class="language-options" 
        :class="{ 'is-open': isDropdownOpen }"
      >
        <div 
          v-for="lang in supportedLanguages" 
          :key="lang.code"
          class="language-option"
          @click.stop="changeLanguage(lang.code)"
        >
          {{ lang.name[currentLanguage] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useLanguageStore } from '@/stores/language'
import { performanceConfig } from '@/utils/performance'

const languageStore = useLanguageStore()
const { currentLanguage } = storeToRefs(languageStore)

const isDropdownOpen = ref(false)
const dropdownRef = ref(null)

const supportedLanguages = languageStore.getSupportedLanguages()

const currentLanguageName = computed(() => 
  supportedLanguages.find(lang => lang.code === currentLanguage.value)?.name[currentLanguage.value]
)

function toggleDropdown() {
  const toggleAnimation = performanceConfig.shouldAnimate()
  
  if (toggleAnimation) {
    performanceConfig.optimizeAnimation(dropdownRef.value, [
      { transform: 'scale(0.9)', opacity: 0.8 },
      { transform: 'scale(1)', opacity: 1 }
    ])
  }
  
  isDropdownOpen.value = !isDropdownOpen.value
}

function changeLanguage(lang) {
  const toggleAnimation = performanceConfig.shouldAnimate()
  
  if (toggleAnimation) {
    performanceConfig.optimizeAnimation(dropdownRef.value, [
      { transform: 'translateY(10px)', opacity: 0.8 },
      { transform: 'translateY(0)', opacity: 1 }
    ])
  }
  
  languageStore.setLanguage(lang)
  isDropdownOpen.value = false
}

// 点击外部关闭下拉
function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false
  }
}

// 添加和移除全局点击事件监听器
const addClickListener = () => {
  document.addEventListener('click', handleClickOutside)
}

const removeClickListener = () => {
  document.removeEventListener('click', handleClickOutside)
}

// 生命周期钩子
import { onMounted, onUnmounted } from 'vue'
onMounted(addClickListener)
onUnmounted(removeClickListener)
</script>

<style scoped>
.language-switch {
  position: relative;
}

.language-dropdown {
  position: relative;
  cursor: pointer;
  user-select: none;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-gray-200);
  border-radius: 4px;
  background-color: var(--color-white);
  transition: all 0.3s ease;
}

.language-dropdown:hover {
  background-color: var(--color-gray-50);
}

.current-language {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.language-options {
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 120px;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 10;
}

.language-options.is-open {
  max-height: 200px;
  opacity: 1;
  padding: 0.5rem 0;
}

.language-option {
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease;
}

.language-option:hover {
  background-color: var(--color-gray-100);
}
</style>