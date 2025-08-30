<script setup>
import { onMounted } from 'vue'
import { useLanguageStore } from '@/stores/language'
import LanguageSwitch from '@/components/LanguageSwitch.vue'
import AOSConfig from '@/components/AOSConfig.vue'
import AnimationToggle from '@/components/AnimationToggle.vue'

const languageStore = useLanguageStore()

onMounted(() => {
  languageStore.initLanguage()
})
</script>

<template>
  <div id="app">
    <AOSConfig />
    <AnimationToggle />
    <nav>
      <div class="nav-links">
        <router-link to="/">首页</router-link>
        <router-link to="/blog">博客</router-link>
        <router-link to="/projects">作品集</router-link>
        <router-link to="/contact">联系</router-link>
      </div>
      <LanguageSwitch />
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f4f4f4;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

nav a {
  text-decoration: none;
  color: #333;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #666;
}

#app {
  font-family: Arial, sans-serif;
}
</style>
