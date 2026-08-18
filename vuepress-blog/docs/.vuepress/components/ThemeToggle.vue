<template>
  <button class="theme-toggle" type="button" @click="toggleDarkMode" :aria-label="isDark ? '切换到亮色模式' : '切换到暗色模式'">
    <span class="theme-toggle-icon">{{ isDark ? '☀️' : '🌙' }}</span>
  </button>
</template>

<script setup>
import { onMounted } from 'vue'
import { useDarkMode } from '../composables/useDarkMode'

// 暗黑模式切换按钮组件
const { isDark, initDarkMode, toggleDarkMode } = useDarkMode()

onMounted(() => {
  initDarkMode()
})
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 0.25rem;
}
.theme-toggle:hover {
  background: var(--c-bg-sidebar, #f0f0f0);
}
.theme-toggle-icon {
  font-size: 1.25rem;
  line-height: 1;
}
</style>
