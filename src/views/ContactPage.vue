<template>
  <div class="contact-page" ref="contactPageRef">
    <div class="contact-header" ref="contactHeaderRef">
      <h1>联系我</h1>
      <p>让我们保持联系</p>
    </div>

    <div class="contact-content" ref="contactContentRef">
      <div class="contact-info">
        <div class="contact-email">
          <h2>电子邮件</h2>
          <a href="mailto:your-email@example.com" class="email-link">
            <i class="icon-email"></i>
            your-email@example.com
          </a>
        </div>

        <div class="social-links">
          <h2>社交媒体</h2>
          <div class="social-icons">
            <SocialIcon 
              v-for="social in socialLinks" 
              :key="social.platform"
              :name="social.name"
              :url="social.url"
              :platform="social.platform"
            />
          </div>
        </div>
      </div>

      <div class="contact-form-section">
        <h2>给我留言</h2>
        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">姓名</label>
            <input 
              type="text" 
              id="name" 
              v-model="formData.name" 
              required
            >
          </div>
          <div class="form-group">
            <label for="email">邮箱</label>
            <input 
              type="email" 
              id="email" 
              v-model="formData.email" 
              required
            >
          </div>
          <div class="form-group">
            <label for="message">消息</label>
            <textarea 
              id="message" 
              v-model="formData.message" 
              required
            ></textarea>
          </div>
          <button type="submit" class="submit-btn">发送消息</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import SocialIcon from '@/components/SocialIcon.vue'

const contactPageRef = ref(null)
const contactHeaderRef = ref(null)
const contactContentRef = ref(null)

const socialLinks = [
  { 
    name: 'GitHub', 
    url: 'https://github.com/yourusername', 
    platform: 'github'
  },
  { 
    name: 'LinkedIn', 
    url: 'https://linkedin.com/in/yourusername', 
    platform: 'linkedin'
  },
  { 
    name: 'Twitter', 
    url: 'https://twitter.com/yourusername', 
    platform: 'twitter'
  },
  { 
    name: 'Email', 
    url: 'mailto:your-email@example.com', 
    platform: 'email'
  }
]

const formData = ref({
  name: '',
  email: '',
  message: ''
})

function submitForm() {
  // 这里可以添加表单提交逻辑
  console.log('表单提交', formData.value)
  // 重置表单
  formData.value = { name: '', email: '', message: '' }
}

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // 头部动画
  tl.fromTo(contactHeaderRef.value, 
    { opacity: 0, y: -50 }, 
    { opacity: 1, y: 0, duration: 0.8 }
  )

  // 内容动画
  tl.fromTo(contactContentRef.value, 
    { opacity: 0, y: 50 }, 
    { opacity: 1, y: 0, duration: 0.8 },
    '-=0.4'
  )
})
</script>

<style scoped>
.contact-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.contact-header {
  text-align: center;
  margin-bottom: 2rem;
}

.contact-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.contact-header p {
  color: #666;
  font-size: 1.1rem;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-email h2, 
.social-links h2 {
  margin-bottom: 1rem;
  color: #333;
}

.email-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #3498db;
  transition: color 0.3s ease;
}

.email-link:hover {
  color: #2980b9;
}

.social-icons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.social-icon {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background-color: #333;
  color: white;
  transform: translateY(-5px);
}

.contact-form-section h2 {
  margin-bottom: 1rem;
  color: #333;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  color: #666;
}

.form-group input, 
.form-group textarea {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  min-height: 150px;
  resize: vertical;
}

.submit-btn {
  background-color: #333;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #555;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }

  .social-icons {
    grid-template-columns: 1fr;
  }
}
</style>