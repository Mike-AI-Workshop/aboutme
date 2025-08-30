<template>
  <div class="aos-config"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import '@/assets/styles/aos-custom.css'

onMounted(() => {
  AOS.init({
    // 全局 AOS 配置
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 120,
    delay: 100,
    disable: false,
    startEvent: 'DOMContentLoaded'
  })
})

onUnmounted(() => {
  AOS.refresh()
})
</script>