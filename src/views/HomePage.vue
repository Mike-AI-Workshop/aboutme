<template>
  <div class="home-page">
    <div class="avatar-section">
      <img src="/path/to/avatar.jpg" alt="个人头像">
    </div>
    <div class="intro-section">
      <h1>{{ name }}</h1>
      <p>{{ description }}</p>
    </div>
    <div class="skills-section">
      <SkillTag v-for="skill in skills" :key="skill" :skill="skill" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SkillTag from '@/components/SkillTag.vue'

const name = ref('您的名字')
const description = ref('个人简介')
const skills = ref([
  'Vue3', 
  'JavaScript', 
  'Web开发', 
  '前端设计'
])
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.avatar-section img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>