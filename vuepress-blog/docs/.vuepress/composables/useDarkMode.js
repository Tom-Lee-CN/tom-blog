import { ref, watch } from 'vue'

// 暗黑模式组合式函数
// 提供读取、切换、持久化暗黑模式的能力，与默认主题的 darkMode 协同
const STORAGE_KEY = 'vuepress-color-scheme'

// 全局共享的暗黑状态
const isDark = ref(false)

// 初始化：默认暗色（黑色底色），除非用户明确选择过亮色
function initDarkMode() {
  if (typeof window === 'undefined') return
  const saved = localStorage.getItem(STORAGE_KEY)
  isDark.value = saved !== 'light'
  applyTheme()
}

// 应用主题到 html 根节点
// 同时设置 data-theme 属性（Shiki 双主题切换依赖此属性）
function applyTheme() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('dark', isDark.value)
  if (isDark.value) {
    root.setAttribute('data-theme', 'dark')
  } else {
    root.removeAttribute('data-theme')
  }
}

// 切换暗黑模式并持久化
function toggleDarkMode() {
  isDark.value = !isDark.value
  localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
  applyTheme()
}

// 监听状态变化自动应用主题
watch(isDark, applyTheme)

// 暴露组合式函数接口
export function useDarkMode() {
  return {
    isDark,
    initDarkMode,
    toggleDarkMode
  }
}
