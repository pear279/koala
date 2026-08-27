<script setup>
/**
 * 我的
 * 待办：原型此页为整张设计稿截图，且 archive/prototype-html/my.css 中已备好
 * .profile-details / .detail-item / .action-buttons 等样式，仅缺 DOM 结构，
 * 是下一切片最低成本的替换目标。
 */
import { currentUser } from '@/data/mock'
</script>

<template>
  <div class="my-page">
    <h2 class="section-title">我的</h2>
    <p class="page-notice">
      本页仍使用设计稿截图，待替换为真实结构（{{ currentUser.name }}）。
    </p>
    <img class="profile-img" src="/images/me/profile.png" alt="个人中心">
  </div>
</template>

<style scoped>
.my-page {
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

.profile-img {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
