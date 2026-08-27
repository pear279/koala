<script setup>
/**
 * 故事库
 * 由设计稿截图 public/images/story/community-1.png、community-2.png 还原为真实 DOM。
 * 上半部分为心情日历（抽成 MoodCalendar 组件），下半部分为社区入口卡。
 */
import { ref } from 'vue'
import { calendarView, communityEntries, createCalendarRecords } from '@/data/mock'
import MoodCalendar from '@/components/MoodCalendar.vue'

/** 日历默认展示当前月，翻月时按月加载对应记录 */
const records = ref({})

function loadRecords(month) {
  records.value = createCalendarRecords(month)
}
</script>

<template>
  <div class="story-page">
    <section>
      <h2 class="section-title">心情日历</h2>
      <MoodCalendar
        :records="records"
        :slot-rows="calendarView.slotRows"
        :record-icon="calendarView.recordIcon"
        @month-change="loadRecords"
      />
    </section>

    <section>
      <h2 class="section-title">故事库</h2>
      <div class="community-grid">
        <!-- 未配置目标路由的入口渲染为 div，避免出现无效链接 -->
        <component
          :is="entry.to ? 'RouterLink' : 'div'"
          v-for="entry in communityEntries"
          :key="entry.key"
          class="community-card"
          :to="entry.to || undefined"
        >
          <div class="community-label">
            <img class="community-icon" :src="entry.icon" alt="">
            <span class="community-name">{{ entry.name }}</span>
          </div>
          <img class="community-cover" :src="entry.cover" :alt="`${entry.name}封面`">
        </component>
      </div>
    </section>
  </div>
</template>

<style scoped>
.story-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
  padding-bottom: var(--space-7);
}

.community-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

.community-card {
  display: flex;
  min-width: 0;
  border-radius: var(--radius-md);
  background: var(--color-primary-lightest);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  transition: transform var(--transition-base);
}

/* 仅可点击的入口给出悬停反馈 */
a.community-card:hover {
  transform: translateY(-2px);
}

/* 竖排标题栏 */
.community-label {
  flex: 0 0 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-5) var(--space-2);
}

.community-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.community-name {
  color: var(--color-primary-darkest);
  font-size: var(--font-size-2xl);
  letter-spacing: 4px;
  writing-mode: vertical-rl;
}

.community-cover {
  flex: 1;
  min-width: 0;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
