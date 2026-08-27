<script setup>
/**
 * 消息
 * 待办：原型此页为整张设计稿截图，需替换为真实 DOM 结构。
 */
</script>

<template>
  <div class="message-page">
    <h2 class="section-title">消息</h2>
    <p class="page-notice">
      本页仍使用设计稿截图，待替换为真实结构。
    </p>
    <img class="message-img" src="/images/news/messages.png" alt="消息列表">
  </div>
</template>

<style scoped>
.message-page {
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

.message-img {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
