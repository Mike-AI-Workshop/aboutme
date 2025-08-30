<template>
  <a 
    :href="url" 
    :title="name"
    class="social-icon" 
    :class="[platform, { 'social-icon-hover': hover }]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    target="_blank"
  >
    <div class="social-icon-wrapper">
      <i :class="iconClass"></i>
      <span class="social-icon-name">{{ name }}</span>
    </div>
  </a>
</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true,
    validator: (value) => ['github', 'linkedin', 'twitter', 'email'].includes(value)
  }
})

const hover = ref(false)
const iconRef = ref(null)

const iconClass = computed(() => {
  const iconMap = {
    github: 'icon-github',
    linkedin: 'icon-linkedin',
    twitter: 'icon-twitter',
    email: 'icon-email'
  }
  return iconMap[props.platform]
})

function onMouseEnter(event) {
  hover.value = true
  
  gsap.to(event.currentTarget, {
    scale: 1.1,
    rotation: 5,
    duration: 0.3,
    ease: 'power1.out'
  })
}

function onMouseLeave(event) {
  hover.value = false
  
  gsap.to(event.currentTarget, {
    scale: 1,
    rotation: 0,
    duration: 0.3,
    ease: 'power1.out'
  })
}
</script>

<style scoped>
.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.social-icon-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.social-icon i {
  font-size: 1.2rem;
}

.social-icon-name {
  font-size: 0.9rem;
}

/* 平台特定颜色 */
.github {
  background-color: #f4f4f4;
  color: #333;
}

.github:hover {
  background-color: #333;
  color: white;
}

.linkedin {
  background-color: #0077b5;
  color: white;
}

.linkedin:hover {
  background-color: #005582;
}

.twitter {
  background-color: #1da1f2;
  color: white;
}

.twitter:hover {
  background-color: #0c85d0;
}

.email {
  background-color: #ea4335;
  color: white;
}

.email:hover {
  background-color: #c0392b;
}
</style>