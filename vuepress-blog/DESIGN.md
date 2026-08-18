# VuePress 2 个人博客项目设计文档

> **版本**：v1.0.0
> **更新日期**：2026-08-19
> **项目定位**：技术 + 生活混合的个人博客
> **项目性质**：纯前端无后端，Git 推送自动部署到 GitHub Pages

## 一、项目概述

基于 VuePress 2 的纯前端个人博客，使用 Vue 3 + Vite 技术栈。内容为技术 + 生活混合，支持 Markdown 写作、暗黑模式、完全响应式、多页面传统博客布局。通过 GitHub Actions 在推送到 main 分支时自动构建并部署到 GitHub Pages。

**核心设计原则**：
- 纯前端无后端，所有数据来源于 Markdown 文件与静态配置
- 技术文档风格，注重内容可读性与排版
- 暗黑模式 + 完全响应式
- 多页面传统博客（首页/归档/分类/标签/关于）
- 基础功能即可，搜索、评论等作为后续扩展预留

## 二、技术栈选择

| 类别 | 选型 | 说明 |
|---|---|---|
| 核心框架 | VuePress 2 | 基于 Vue 3 + Vite |
| 主题系统 | @vuepress/theme-default | 默认主题 + 自定义样式覆盖 |
| 打包器 | @vuepress/bundler-vite | Vite 打包 |
| 代码高亮 | Shiki | VuePress 默认 |
| Markdown 渲染 | markdown-it | VuePress 内置 |
| 状态管理 | Pinia | VuePress 内置支持 |
| 包管理器 | npm | 项目当前使用 npm（package-lock.json） |
| 部署 | GitHub Pages + GitHub Actions | 推送到 main 分支自动部署 |

## 三、项目结构设计

```
vuepress-blog/
├── docs/                          # VuePress 源文件目录
│   ├── .vuepress/                 # VuePress 配置目录
│   │   ├── config.js              # 主配置文件
│   │   ├── client.js              # 客户端配置（暗黑模式等）
│   │   ├── styles/                # 自定义样式
│   │   │   ├── index.scss         # 全局样式
│   │   │   └── custom.scss        # 主题变量覆盖（含暗黑模式变量）
│   │   ├── components/            # 自定义 Vue 组件
│   │   │   ├── ThemeToggle.vue    # 暗黑模式切换
│   │   │   ├── PostCard.vue       # 文章卡片
│   │   │   └── TableOfContents.vue # 文章目录
│   │   ├── composables/           # Vue 组合式函数
│   │   │   ├── useDarkMode.js     # 暗黑模式逻辑
│   │   │   └── usePosts.js        # 文章数据管理
│   │   └── public/                # 静态资源
│   │       ├── favicon.ico
│   │       └── logo.png
│   ├── posts/                     # 文章目录（按 YYYY-MM-DD-slug.md 命名）
│   ├── pages/                     # 独立页面
│   │   ├── archive.md             # 归档页
│   │   ├── categories.md          # 分类页
│   │   ├── tags.md                # 标签页
│   │   └── about.md               # 关于页
│   └── README.md                  # 首页
├── package.json                   # 项目配置
├── package-lock.json              # 依赖锁文件
├── .gitignore                     # Git 忽略文件
├── .github/                       # GitHub 配置
│   └── workflows/
│       └── deploy.yml             # GitHub Actions 部署配置
└── DESIGN.md                      # 本设计文档
```

## 四、核心功能设计

### 4.1 文章管理

**文件命名**：`YYYY-MM-DD-slug.md` 格式，日期与 frontmatter 的 date 字段一致。

**Frontmatter 字段**：

```yaml
---
title: "文章标题"
date: 2026-08-19
categories: ["技术", "前端"]
tags: ["VuePress", "博客"]
description: "文章摘要"
author: "作者名"          # 可选
cover: "/images/cover.jpg" # 可选，封面图
pinned: false             # 可选，置顶
draft: false              # 可选，草稿（为 true 时不发布）
---
```

**自动分类**：根据 frontmatter 的 categories 和 tags 自动生成分类/标签页。

### 4.2 暗黑模式

- **实现方式**：VuePress 默认主题内置支持，自定义组件通过 CSS 变量适配
- **切换逻辑**：
  - 系统偏好检测（prefers-color-scheme）
  - 用户手动切换
  - 本地存储记忆（localStorage）
- **样式方案**：CSS 变量 + 主题类名切换，严禁硬编码颜色值

### 4.3 页面结构

| 页面 | 功能 |
|---|---|
| 首页 | 文章列表 + 分页 |
| 文章详情 | Markdown 渲染 + 目录导航 + 上一篇/下一篇 |
| 归档 | 按时间线展示所有文章 |
| 分类 | 按分类分组展示 |
| 标签 | 按标签分组展示，支持标签云 |
| 关于 | 个人介绍页面 |

### 4.4 响应式设计

**断点设计**：
- 移动端：< 768px
- 平板：768px - 1024px
- 桌面：> 1024px

**布局适配**：
- 移动端：单列布局，汉堡菜单
- 桌面：侧边栏 + 内容区

## 五、配置设计

### 5.1 主配置（config.js）

```javascript
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    logo: '/logo.png',
    navbar: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/pages/archive' },
      { text: '分类', link: '/pages/categories' },
      { text: '标签', link: '/pages/tags' },
      { text: '关于', link: '/pages/about' }
    ],
    sidebar: 'auto',
    darkMode: true,
    sidebarDepth: 2,
    editLink: false,
    lastUpdated: false,
    contributors: false
  }),
  lang: 'zh-CN',
  title: '我的博客',
  description: '个人技术博客',
  base: '/',
  public: 'public'
})
```

### 5.2 客户端配置（client.js）

```javascript
import { defineClientConfig } from 'vuepress/client'
import ThemeToggle from './components/ThemeToggle.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // 注册全局组件
    app.component('ThemeToggle', ThemeToggle)
  },
  setup() {
    // 初始化暗黑模式
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }
  },
  rootComponents: []
})
```

## 六、开发流程

### 6.1 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 访问 http://localhost:8080
```

### 6.2 构建部署

```bash
# 构建静态文件
npm run docs:build

# 构建输出目录: docs/.vuepress/dist
```

### 6.3 GitHub Pages 部署

- **触发条件**：推送到 main 分支
- **构建命令**：`npm run docs:build`
- **部署目录**：`docs/.vuepress/dist`
- **自动配置**：GitHub Actions 工作流（.github/workflows/deploy.yml）

## 七、性能优化

### 7.1 构建优化
- 代码分割
- 静态资源压缩
- 图片懒加载

### 7.2 运行时优化
- 路由懒加载
- 组件异步加载
- 本地缓存策略

## 八、测试计划

### 8.1 功能测试
- Markdown 渲染正确性
- 分类标签功能
- 暗黑模式切换
- 响应式布局

### 8.2 性能测试
- 首屏加载时间
- 页面切换速度
- 构建时间

### 8.3 兼容性测试
- 主流浏览器（Chrome, Firefox, Safari, Edge）
- 移动端浏览器
- 不同屏幕尺寸

## 九、部署清单

### 9.1 环境准备
- Node.js >= 20.9.0
- npm 包管理器
- Git 版本控制

### 9.2 仓库配置
- 创建 GitHub 仓库
- 启用 GitHub Pages
- 配置 Actions 权限

### 9.3 持续集成
- 自动构建
- 自动部署
- 预览部署（可选）

## 十、后续扩展（预留）

### 10.1 功能扩展
- 全文搜索（Algolia 或本地搜索）
- RSS 订阅
- 评论系统（Giscus）
- 访问统计

### 10.2 主题定制
- 自定义主题开发
- 多主题支持
- 主题切换动画

### 10.3 内容增强
- 图片画廊
- 视频嵌入
- 代码演示
- 交互式示例
