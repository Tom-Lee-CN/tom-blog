<template>
  <div class="minimal-404">
    <header class="minimal-header">
      <div class="minimal-header-inner">
        <a class="minimal-brand" href="/">
          <span class="minimal-brand-name">{{ siteData.title }}</span>
        </a>
      </div>
    </header>
    <main class="minimal-main">
      <div class="minimal-content">
        <h1>404</h1>
        <p>页面不存在，可能已被移动或删除。</p>
        <a href="/" class="minimal-back">返回首页</a>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useSiteData } from 'vuepress/client'

// 404 页面：极简风格，提供返回首页入口
const siteData = useSiteData()
</script>

<style scoped>
.minimal-404 {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.minimal-header {
  border-bottom: 1px solid var(--c-border, #eaecef);
}
.minimal-header-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
}
.minimal-brand {
  text-decoration: none;
  color: var(--c-text, #2c3e50);
  font-weight: 600;
}
.minimal-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.minimal-content h1 {
  font-size: 4rem;
  margin: 0 0 1rem;
  color: var(--c-brand, #3eaf7c);
}
.minimal-back {
  display: inline-block;
  margin-top: 1rem;
  color: var(--c-brand, #3eaf7c);
  text-decoration: none;
}
</style>
