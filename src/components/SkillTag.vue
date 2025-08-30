<template>
  <span class="skill-tag">{{ skill }}</span>
</template>

<script setup>
defineProps({
  skill: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.skill-tag {
  display: inline-block;
  background-color: #f4f4f4;
  color: #333;
  padding: 0.25rem 0.5rem;
  margin: 0.25rem;
  border-radius: 4px;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  cursor: default;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.skill-tag:hover {
  background-color: #333;
  color: white;
  transform: scale(1.05);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
</style>