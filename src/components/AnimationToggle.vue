<template>
  <div class="animation-toggle">
    <button 
      @click="toggleAnimations" 
      class="animation-toggle-btn"
      :aria-label="animationLabel"
      :title="animationLabel"
    >
      <span v-if="performanceConfig.animationsEnabled.value">
        <i class="icon-animation-on"></i>
        动画开启
      </span>
      <span v-else>
        <i class="icon-animation-off"></i>
        动画关闭
      </span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { performanceConfig } from '@/utils/performance'

const animationLabel = computed(() => 
  performanceConfig.animationsEnabled.value 
    ? '关闭动画以提高性能' 
    : '开启动画'
)

function toggleAnimations() {
  performanceConfig.toggleAnimations()
}
</script>

<style scoped>
.animation-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.animation-toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--color-gray-100);
  color: var(--color-gray-800);
  border: 1px solid var(--color-gray-300);
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.animation-toggle-btn:hover {
  background-color: var(--color-gray-200);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.animation-toggle-btn i {
  font-size: 1.2rem;
}
</style>