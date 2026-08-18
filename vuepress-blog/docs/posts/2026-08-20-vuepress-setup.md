---
title: "VuePress 博客搭建指南"
date: 2026-08-20
categories: ["技术", "前端"]
tags: ["VuePress", "博客", "搭建"]
description: "详细介绍如何使用 VuePress 2 搭建个人博客"
author: "博主"
pinned: false
draft: false
---

# VuePress 博客搭建指南

本文将详细介绍如何使用 VuePress 2 搭建一个功能完善的个人博客。

## 环境准备

### 安装 Node.js

VuePress 2 需要 Node.js 20.9.0 或更高版本：

```bash
# 检查 Node.js 版本
node --version

# 如果版本过低，请升级 Node.js
```

### 安装包管理器

推荐使用 pnpm：

```bash
# 安装 pnpm
npm install -g pnpm

# 检查 pnpm 版本
pnpm --version
```

## 创建项目

### 方法一：使用命令行（推荐）

```bash
# 使用 pnpm
pnpm create vuepress vuepress-blog

# 使用 npm
npm init vuepress vuepress-blog
```

### 方法二：手动创建

```bash
# 创建项目目录
mkdir vuepress-blog
cd vuepress-blog

# 初始化项目
npm init -y

# 安装依赖
npm install -D vuepress@next vue
npm install -D @vuepress/bundler-vite@next @vuepress/theme-default@next
```

## 项目结构

```
vuepress-blog/
├── docs/
│   ├── .vuepress/
│   │   └── config.js      # 配置文件
│   ├── posts/             # 文章目录
│   ├── pages/             # 页面目录
│   └── README.md          # 首页
├── package.json
└── .gitignore
```

## 配置文件

创建 `docs/.vuepress/config.js`：

```javascript
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    navbar: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' }
    ],
    sidebar: 'auto',
    darkMode: true
  }),
  lang: 'zh-CN',
  title: '码霖汤姆的博客',
  description: '个人技术博客'
})
```

## 添加脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

## 本地开发

```bash
# 启动开发服务器
npm run docs:dev

# 访问 http://localhost:8080
```

## 写文章

在 `docs/posts/` 目录下创建 Markdown 文件：

```markdown
---
title: "文章标题"
date: 2026-08-20
categories: ["技术"]
tags: ["VuePress"]
---

# 文章内容

这里是文章正文...
```

## 构建部署

```bash
# 构建静态文件
npm run docs:build

# 输出目录：docs/.vuepress/dist
```

## 部署到 GitHub Pages

1. 创建 GitHub 仓库
2. 推送代码到仓库
3. 在仓库设置中启用 GitHub Pages
4. 选择 GitHub Actions 作为源

## 总结

VuePress 2 是一个非常适合博客的静态网站生成器，具有以下优点：

- 配置简单
- Markdown 支持良好
- Vue 3 生态
- 优秀的性能
- 丰富的插件生态

在后续文章中，我将介绍如何进一步定制主题和添加更多功能。