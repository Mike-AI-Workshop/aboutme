<template>
  <div class="contact-page">
    <h1>联系我</h1>
    <div class="contact-info">
      <p>邮箱：your-email@example.com</p>
    </div>
    <div class="social-links">
      <a 
        v-for="social in socialLinks" 
        :key="social.name" 
        :href="social.url" 
        target="_blank" 
        class="social-icon"
      >
        {{ social.name }}
      </a>
    </div>
  </div>
</template>

<script setup>
const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/yourusername' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername' },
  { name: 'Twitter', url: 'https://twitter.com/yourusername' }
]
</script>

<style scoped>
.contact-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.social-icon {
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid #333;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background-color: #333;
  color: white;
  transform: scale(1.1);
}
</style>