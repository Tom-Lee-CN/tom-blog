<template>
  <nav v-if="headings.length" class="toc">
    <p class="toc-title">目录</p>
    <ul>
      <li v-for="heading in headings" :key="heading.slug" :class="'toc-level-' + heading.level">
        <a :href="'#' + heading.slug">{{ heading.title }}</a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
// 文章目录组件：根据页面标题生成锚点导航
import { computed } from 'vue'
import { usePageData } from 'vuepress/client'

const pageData = usePageData()

// 提取 h2/h3 标题生成目录
const headings = computed(() => {
  const headers = pageData.value?.headers || []
  return headers
    .filter((h) => h.level === 2 || h.level === 3)
    .map((h) => ({
      slug: h.slug,
      title: h.title,
      level: h.level
    }))
})
</script>

<style scoped>
.toc {
  padding: 0.75rem 1rem;
  border: 1px solid var(--c-border, #eaecef);
  border-radius: 0.25rem;
  background: var(--c-bg, #ffffff);
}
.toc-title {
  margin: 0 0 0.5rem;
  font-weight: 600;
  color: var(--c-text, #2c3e50);
}
.toc ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.toc li {
  margin: 0.25rem 0;
}
.toc a {
  color: var(--c-text-light, #3a5169);
  text-decoration: none;
}
.toc a:hover {
  color: var(--c-brand, #3eaf7c);
}
.toc-level-3 {
  padding-left: 1rem;
}
</style>
