<script setup>
/**
 * 首页：今日幸运花语 + AI 性格
 */
import { luckyFlower, personalities } from '@/data/mock'
</script>

<template>
  <div class="home-page">
    <!-- 今日幸运花语 -->
    <section class="lucky-flower">
      <h2 class="section-title">今日幸运花语</h2>
      <div class="flower-card">
        <img class="butterfly-img" src="/images/butterfly-1.png" alt="">
        <p class="flower-quote">“{{ luckyFlower.quote }}”</p>
        <p class="flower-name">{{ luckyFlower.name }}</p>
      </div>
    </section>

    <!-- AI 性格 -->
    <section class="ai-personality">
      <h2 class="section-title">AI性格</h2>
      <div class="personality-list">
        <div v-for="item in personalities" :key="item.code" class="personality-item">
          <img :src="item.avatar" :alt="`${item.code} 形象`">
          <p class="personality-code">{{ item.code }}</p>
          <p class="personality-trait">{{ item.trait }}</p>
        </div>
      </div>
      <p class="personality-more">更多性格待解锁...</p>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
  padding-bottom: var(--space-7);
}

/* 幸运花语卡片 */
.flower-card {
  position: relative;
  min-height: 180px;
  border-radius: var(--radius-md);
  background: url('/images/flower-quote-bg.jpg') no-repeat center center / cover;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.butterfly-img {
  position: absolute;
  left: 24px;
  top: 24px;
  width: min(440px, 55%);
  height: auto;
  pointer-events: none;
}

.flower-quote {
  position: relative;
  z-index: 1;
  margin: var(--space-6) var(--space-7) 0;
  color: var(--color-white);
  font-size: var(--font-size-lg);
  line-height: 1.5;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

.flower-name {
  position: absolute;
  right: var(--space-7);
  bottom: var(--space-6);
  margin: 0;
  color: var(--color-white);
  font-size: var(--font-size-lg);
  letter-spacing: 2px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

/* AI 性格列表 */
.personality-list {
  display: flex;
  justify-content: space-between;
  gap: var(--space-6);
  margin-bottom: var(--space-7);
}

.personality-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-white);
  text-align: center;
}

.personality-item img {
  width: 100%;
  max-width: 180px;
  height: auto;
  aspect-ratio: 1;
  object-fit: contain;
  margin-bottom: var(--space-2);
}

.personality-code,
.personality-trait {
  margin: 0;
  font-size: var(--font-size-base);
  text-shadow: 0 2px 6px rgba(69, 51, 103, 0.6);
}

.personality-more {
  margin: 0;
  padding: var(--space-4) 0;
  background: var(--color-white);
  color: var(--color-text-subtle);
  font-size: var(--font-size-xl);
  text-align: center;
}
</style>
