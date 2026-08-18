import { defineClientConfig } from 'vuepress/client'

// 客户端配置：注册全局组件与暗黑模式初始化
export default defineClientConfig({
  enhance({ app }) {
    // 注册自定义全局组件（按需扩展）
  },
  setup() {
    // 初始化暗黑模式：优先读取本地存储，其次跟随系统偏好
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vuepress-color-scheme')
      if (saved) {
        document.documentElement.classList.toggle('dark', saved === 'dark')
      }
    }
  },
  rootComponents: []
})
