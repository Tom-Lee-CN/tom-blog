import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import theme from './theme/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 站点基础配置
// 使用自定义极简主题，dev 端口 5172
export default defineUserConfig({
  bundler: viteBundler(),
  theme,
  // Shiki 代码高亮：双主题（亮色 + 暗色），自动适配当前主题
  plugins: [
    shikiPlugin({
      themes: {
        dark: 'dark-plus',
        light: 'github-light'
      }
    })
  ],
  templateBuild: path.resolve(__dirname, './theme/templates/build.html'),
  head: [['link', { rel: 'icon', href: '/tom-blog/favicon.svg' }]],
  lang: 'zh-CN',
  title: '码霖汤姆的博客',
  description: '个人技术博客',
  // GitHub Pages 项目页部署路径（仓库名为 tom-blog）
  base: '/tom-blog/',
  port: 5172,
  // 访问密码与联系手机号（纯前端密码锁，阻挡直接访问）
  // 手机号显示在密码锁页面，用于访客联系你获取密码
  define: {
    __BLOG_PASSWORD__: '18227325719',
    __BLOG_CONTACT__: '18227325719'
  }
})
