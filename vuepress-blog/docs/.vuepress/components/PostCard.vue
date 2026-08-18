<template>
  <article class="post-card">
    <h3 class="post-card-title">
      <a :href="post.path">{{ post.title }}</a>
    </h3>
    <p v-if="post.description" class="post-card-desc">{{ post.description }}</p>
    <div class="post-card-meta">
      <span v-if="post.date" class="post-card-date">{{ post.date }}</span>
      <span v-if="post.categories && post.categories.length" class="post-card-cats">
        <a v-for="cat in post.categories" :key="cat" :href="'/pages/categories'">{{ cat }}</a>
      </span>
      <span v-if="post.tags && post.tags.length" class="post-card-tags">
        <a v-for="tag in post.tags" :key="tag" :href="'/pages/tags'">{{ tag }}</a>
      </span>
    </div>
  </article>
</template>

<script setup>
// 文章卡片组件：展示标题、摘要、日期、分类、标签
defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.post-card {
  padding: 1rem 0;
  border-bottom: 1px solid var(--c-border, #eaecef);
}
.post-card-title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
}
.post-card-title a {
  color: var(--c-text, #2c3e50);
  text-decoration: none;
}
.post-card-title a:hover {
  color: var(--c-brand, #3eaf7c);
}
.post-card-desc {
  margin: 0 0 0.5rem;
  color: var(--c-text-light, #3a5169);
  font-size: 0.9rem;
}
.post-card-meta {
  font-size: 0.8rem;
  color: var(--c-text-lighter, #4e6e8e);
}
.post-card-meta span {
  margin-right: 0.75rem;
}
.post-card-meta a {
  color: var(--c-brand, #3eaf7c);
  text-decoration: none;
  margin-right: 0.25rem;
}
</style>
