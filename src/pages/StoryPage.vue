<script setup>
/**
 * 故事库
 * 待办：原型此页为整张设计稿截图，需替换为真实 DOM 结构。
 */
</script>

<template>
  <div class="story-page">
    <h2 class="section-title">故事库</h2>
    <p class="page-notice">
      本页仍使用设计稿截图，待替换为真实结构。
    </p>
    <div class="image-stack">
      <RouterLink to="/seed">
        <img src="/images/story/community-1.png" alt="故事库社区内容一">
      </RouterLink>
      <img src="/images/story/community-2.png" alt="故事库社区内容二">
    </div>
  </div>
</template>

<style scoped>
.story-page {
  padding-bottom: var(--space-7);
}

.page-notice {
  margin: 0 0 var(--space-5);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.75);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.image-stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-7);
}

.image-stack img {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
