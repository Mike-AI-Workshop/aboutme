<script setup>
// 可以在这里添加全局状态或其他设置
</script>

<template>
  <div id="app">
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/blog">博客</router-link>
      <router-link to="/projects">作品集</router-link>
      <router-link to="/contact">联系</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f4f4f4;
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
