# 码霖汤姆的博客

> 一个基于 VuePress 2 的极简个人博客，支持暗黑模式、代码语法高亮、响应式布局。

**博客地址：[https://tom-lee-cn.github.io/tom-blog/](https://tom-lee-cn.github.io/tom-blog/)**

## 技术栈

- **框架**：VuePress 2（Vue 3 + Vite）
- **主题**：自定义极简主题（不依赖默认主题）
- **代码高亮**：Shiki（双主题：dark-plus / github-light）
- **样式**：SCSS + CSS 变量
- **部署**：GitHub Actions → GitHub Pages（推送 main 分支自动部署）

## 功能特性

- 暗黑模式（默认暗色主题，支持亮色切换）
- 代码语法高亮（亮暗双主题自动适配）
- 完全响应式（移动端 / 平板 / 桌面）
- 访问密码锁（纯前端密码保护）
- 文章分类与标签
- 文章归档

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（端口 5172）
npm run docs:dev

# 构建静态文件
npm run docs:build

# 构建产物目录：docs/.vuepress/dist
```

## 项目结构

```
vuepress-blog/
├── docs/
│   ├── .vuepress/
│   │   ├── config.js              # 主配置
│   │   ├── client.js              # 客户端配置
│   │   ├── styles/                # 全局样式
│   │   │   ├── index.scss
│   │   │   └── custom.scss        # 主题变量 + 暗黑模式 + 排版
│   │   ├── theme/                 # 自定义主题
│   │   │   ├── index.js           # 主题定义
│   │   │   ├── client.js          # 客户端配置（暗黑模式初始化）
│   │   │   ├── Layout.vue         # 主布局
│   │   │   ├── NotFound.vue       # 404 页面
│   │   │   └── templates/
│   │   │       └── build.html     # 自定义 HTML 模板（暗黑预设）
│   │   ├── composables/           # Vue 组合式函数
│   │   │   ├── useDarkMode.js     # 暗黑模式逻辑
│   │   │   └── usePosts.js        # 文章数据管理
│   │   ├── components/            # 可复用组件
│   │   │   ├── ThemeToggle.vue
│   │   │   ├── PostCard.vue
│   │   │   └── TableOfContents.vue
│   │   └── public/                # 静态资源
│   │       ├── logo.svg
│   │       └── favicon.svg
│   ├── posts/                     # 文章（YYYY-MM-DD-slug.md）
│   ├── pages/                     # 独立页面（归档/分类/标签/关于）
│   └── README.md                  # 首页
├── .github/workflows/deploy.yml   # GitHub Actions 自动部署
├── DESIGN.md                      # 设计文档
├── package.json
└── README.md                      # 本文件
```

## 部署

推送到 `main` 分支后，GitHub Actions 自动构建并部署到 GitHub Pages。

**首次部署前**：在 GitHub 仓库 Settings → Pages 中，将 Source 设为 **GitHub Actions**。

## 依赖版本

| 依赖 | 版本 |
|------|------|
| vuepress | 2.0.0-rc.31 |
| @vuepress/bundler-vite | 2.0.0-rc.31 |
| @vuepress/plugin-shiki | 2.0.0-rc.132 |
| sass-embedded | 1.102.0 |
| vue | 3.5.41 |

## License

MIT
