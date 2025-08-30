<template>
  <div class="home-page" ref="homePageRef">
    <div class="home-container" ref="homeContainerRef">
      <div class="avatar-section" ref="avatarSectionRef">
        <div class="avatar-wrapper">
          <img 
            v-lazy="'/aboutme/images/avatar.png'" 
            alt="个人头像" 
            class="avatar"
          />
        </div>
      </div>
      
      <div class="intro-section" ref="introSectionRef">
        <h1 class="name">{{ name }}</h1>
        <p class="description">{{ description }}</p>
        
        <div class="contact-links">
          <a href="mailto:your-email@example.com" class="contact-link">
            <i class="icon-email"></i>
            联系我
          </a>
          <a href="/blog" class="contact-link">
            <i class="icon-blog"></i>
            我的博客
          </a>
        </div>
      </div>
      
      <div class="skills-section" ref="skillsSectionRef">
        <h2>技能</h2>
        <div class="skills-grid">
          <SkillTag 
            v-for="(skill, index) in skills" 
            :key="skill" 
            :skill="skill"
            :ref="el => setSkillRefs(el, index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import SkillTag from '@/components/SkillTag.vue'

const homePageRef = ref(null)
const homeContainerRef = ref(null)
const avatarSectionRef = ref(null)
const introSectionRef = ref(null)
const skillsSectionRef = ref(null)
const skillRefs = ref([])

const setSkillRefs = (el, index) => {
  skillRefs.value[index] = el
}

const name = ref('您的名字')
const description = ref('热爱技术，专注于前端开发和用户体验')
const skills = ref([
  'Vue3', 
  'React', 
  'TypeScript', 
  'JavaScript', 
  'Node.js', 
  'Web开发', 
  '前端设计', 
  'UI/UX'
])

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // 整体页面淡入
  tl.fromTo(homePageRef.value, 
    { opacity: 0, y: 50 }, 
    { opacity: 1, y: 0, duration: 1 }
  )

  // 头像从左侧滑入
  tl.fromTo(avatarSectionRef.value, 
    { opacity: 0, x: -100 }, 
    { opacity: 1, x: 0, duration: 0.8 },
    '-=0.5'
  )

  // 介绍文字从右侧滑入
  tl.fromTo(introSectionRef.value, 
    { opacity: 0, x: 100 }, 
    { opacity: 1, x: 0, duration: 0.8 },
    '-=0.6'
  )

  // 技能标签逐个弹出
  skillRefs.value.forEach((skillRef, index) => {
    tl.fromTo(skillRef, 
      { opacity: 0, scale: 0.5 }, 
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.5,
        ease: 'back.out(1.7)'
      },
      `-=${index % 2 === 0 ? 0.3 : 0.2}` // 交错动画
    )
  })
})

onUnmounted(() => {
  // 清理动画
  gsap.killTweensOf(homePageRef.value)
  gsap.killTweensOf(avatarSectionRef.value)
  gsap.killTweensOf(introSectionRef.value)
  skillRefs.value.forEach(ref => gsap.killTweensOf(ref))
})
</script>

<style scoped>
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
  background-color: #f4f4f4;
  padding: 2rem;
}

.home-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas: 
    "avatar intro"
    "avatar skills";
  gap: 2rem;
  max-width: 1200px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 3rem;
}

.avatar-section {
  grid-area: avatar;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-wrapper {
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.avatar-wrapper:hover .avatar {
  transform: scale(1.1);
}

.intro-section {
  grid-area: intro;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.name {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.contact-links {
  display: flex;
  gap: 1rem;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: white;
  background-color: #333;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.contact-link:hover {
  background-color: #555;
}

.skills-section {
  grid-area: skills;
}

.skills-section h2 {
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .home-container {
    grid-template-columns: 1fr;
    grid-template-areas: 
      "avatar"
      "intro"
      "skills";
    text-align: center;
  }

  .contact-links {
    justify-content: center;
  }
}
</style>