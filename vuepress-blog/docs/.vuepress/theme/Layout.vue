<template>
  <div class="minimal-layout">
    <!-- 访问密码锁遮罩 -->
    <div v-if="!unlocked" class="minimal-lock">
      <div class="minimal-lock-card">
        <h1 class="minimal-lock-title">{{ siteData.title }}</h1>
        <p class="minimal-lock-desc">请输入访问密码</p>
        <form class="minimal-lock-form" @submit.prevent="verifyPassword">
          <input
            v-model="passwordInput"
            type="password"
            class="minimal-lock-input"
            placeholder="访问密码"
            autocomplete="off"
            autofocus
          />
          <button type="submit" class="minimal-lock-btn">进入</button>
        </form>
        <p v-if="error" class="minimal-lock-error">{{ error }}</p>
        <p v-if="contact" class="minimal-lock-contact">忘记密码？请输入博主的手机号</p>
      </div>
    </div>

    <!-- 顶部极简导航 -->
    <header class="minimal-header">
      <div class="minimal-header-inner">
        <a class="minimal-brand" href="/">
          <img v-if="siteLogo" :src="siteLogo" :alt="siteData.title" class="minimal-logo" />
          <span class="minimal-brand-name">{{ siteData.title }}</span>
        </a>
        <nav class="minimal-nav">
          <a
            v-for="item in navItems"
            :key="item.link"
            :href="item.link"
            class="minimal-nav-link"
            :class="{ active: isActive(item.link) }"
          >{{ item.text }}</a>
        </nav>
        <button type="button" class="minimal-theme-toggle" @click="toggleDarkMode" :aria-label="isDark ? '切换到亮色' : '切换到暗色'">
          {{ isDark ? '☀' : '☾' }}
        </button>
      </div>
    </header>

    <!-- 内容区：居中限宽，专注排版 -->
    <main class="minimal-main">
      <div class="minimal-content">
        <Content />
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="minimal-footer">
      <div class="minimal-footer-inner">
        <p>© {{ new Date().getFullYear() }} {{ siteData.title }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useSiteData, usePageData, useRoute } from 'vuepress/client'
import { useDarkMode } from '../composables/useDarkMode'

// 极简内容风主布局
// 顶部极简导航 + 居中限宽内容区 + 页脚

const siteData = useSiteData()
const pageData = usePageData()
const route = useRoute()

const { isDark, initDarkMode, toggleDarkMode } = useDarkMode()

// 站点 logo（themeConfig 可能为空，安全读取）
const siteLogo = computed(() => siteData.value.themeConfig?.logo || '/logo.svg')

// 固定导航项（极简博客导航）
const navItems = [
  { text: '首页', link: '/' },
  { text: '归档', link: '/pages/archive' },
  { text: '分类', link: '/pages/categories' },
  { text: '标签', link: '/pages/tags' },
  { text: '关于', link: '/pages/about' }
]

// 判断当前导航是否激活
function isActive(link) {
  if (link === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(link)
}

// 初始化暗黑模式
initDarkMode()

// ===== 访问密码锁 =====
// 密码与联系手机号来自 config.js 的 define 注入（纯前端密码锁，阻挡直接访问）
const BLOG_PASSWORD = typeof __BLOG_PASSWORD__ !== 'undefined' ? __BLOG_PASSWORD__ : ''
const contact = typeof __BLOG_CONTACT__ !== 'undefined' ? __BLOG_CONTACT__ : ''
const STORAGE_KEY = 'blog-unlocked'

// 是否已解锁（从本地存储读取，已解锁则免输入）
const unlocked = ref(false)
const passwordInput = ref('')
const error = ref('')

// 初始化解锁状态
if (typeof window !== 'undefined') {
  unlocked.value = localStorage.getItem(STORAGE_KEY) === 'true'
}

// 验证密码：正确则解锁并记住，错误则提示
function verifyPassword() {
  if (passwordInput.value === BLOG_PASSWORD) {
    unlocked.value = true
    error.value = ''
    localStorage.setItem(STORAGE_KEY, 'true')
  } else {
    error.value = '密码错误，请重试'
    passwordInput.value = ''
  }
}
</script>

<style scoped>
.minimal-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 访问密码锁遮罩 */
.minimal-lock {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c-bg, #ffffff);
}
.minimal-lock-card {
  width: 100%;
  max-width: 320px;
  padding: 2rem;
  text-align: center;
}
.minimal-lock-title {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  color: var(--c-text, #2c3e50);
}
.minimal-lock-desc {
  margin: 0 0 1.5rem;
  color: var(--c-text-light, #4a5568);
  font-size: 0.9rem;
}
.minimal-lock-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.minimal-lock-input {
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--c-border, #eaecef);
  border-radius: 0.375rem;
  background: var(--c-bg-soft, #f7f8fa);
  color: var(--c-text, #2c3e50);
  font-size: 1rem;
  outline: none;
  text-align: center;
}
.minimal-lock-input:focus {
  border-color: var(--c-brand, #3eaf7c);
}
.minimal-lock-btn {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 0.375rem;
  background: var(--c-brand, #3eaf7c);
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.minimal-lock-btn:hover {
  background: var(--c-brand-light, #4abf8a);
}
.minimal-lock-error {
  margin: 0.75rem 0 0;
  color: #e74c3c;
  font-size: 0.85rem;
}
.minimal-lock-contact {
  margin: 1.25rem 0 0;
  color: var(--c-text-lighter, #718096);
  font-size: 0.85rem;
  border-top: 1px solid var(--c-border, #eaecef);
  padding-top: 1rem;
}

/* 顶部导航 */
.minimal-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--c-bg, #ffffff);
  border-bottom: 1px solid var(--c-border, #eaecef);
}
.minimal-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 3.5rem;
}
.minimal-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--c-text, #2c3e50);
  font-weight: 600;
}
.minimal-logo {
  height: 1.75rem;
  width: auto;
}
.minimal-nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}
.minimal-nav-link {
  color: var(--c-text-light, #3a5169);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}
.minimal-nav-link:hover {
  color: var(--c-brand, #3eaf7c);
}
.minimal-nav-link.active {
  color: var(--c-brand, #3eaf7c);
  font-weight: 500;
}
.minimal-theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.1rem;
  color: var(--c-text, #2c3e50);
}

/* 内容区 */
.minimal-main {
  flex: 1;
  width: 100%;
}
.minimal-content {
  max-width: 720px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  line-height: 1.8;
}

/* 页脚 */
.minimal-footer {
  border-top: 1px solid var(--c-border, #eaecef);
}
.minimal-footer-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 1.5rem;
  text-align: center;
  color: var(--c-text-lightest, #6a8bad);
  font-size: 0.85rem;
}

/* 响应式：移动端 */
@media (max-width: 767px) {
  .minimal-nav {
    gap: 0.75rem;
  }
  .minimal-nav-link {
    font-size: 0.85rem;
  }
  .minimal-content {
    padding: 2rem 1.25rem;
  }
}
</style>
