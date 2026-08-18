import { defineClientConfig } from 'vuepress/client'
import Layout from './Layout.vue'
import NotFound from './NotFound.vue'

// 自定义极简主题客户端配置
// 注册布局组件，初始化暗黑模式
export default defineClientConfig({
  setup() {
    // 初始化暗黑模式：默认暗色（黑色底色），除非用户明确选择过亮色
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vuepress-color-scheme')
      const dark = saved !== 'light'
      const root = document.documentElement
      root.classList.toggle('dark', dark)
      // 同步设置 data-theme 属性（Shiki 双主题切换依赖此属性）
      if (dark) {
        root.setAttribute('data-theme', 'dark')
      } else {
        root.removeAttribute('data-theme')
      }
    }
  },
  layouts: {
    Layout,
    NotFound
  }
})
