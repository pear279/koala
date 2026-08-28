<script setup>
/**
 * 消息
 * 由设计稿截图 public/images/news/messages.png 还原为真实 DOM 结构。
 * 三组消息之间用留白分隔（对齐截图），每条为「类型徽章 + 文案 + 相对时间」。
 * 徽章宽度随文字自适应，与截图中长短不一的胶囊一致。
 */
import { computed, onMounted } from 'vue'
import { useMessageStore } from '@/stores/message'
import { formatRelativeTime } from '@/utils/datetime'

const messageStore = useMessageStore()
onMounted(() => messageStore.load())

/** 相对时间按当前时间推导，页面进入时结算一次 */
const groups = computed(() => {
  const now = Date.now()
  return messageStore.groups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      ...item,
      time: formatRelativeTime(now - item.minutesAgo * 60 * 1000),
    })),
  }))
})
</script>

<template>
  <div class="message-page">
    <h2 class="section-title">消息</h2>

    <!-- 截图为白底深色字，故用白色卡片承载，避免深色文字落在紫色背景上对比度不足 -->
    <div class="message-panel">
      <section v-for="group in groups" :key="group.key" class="message-group">
        <!-- 截图靠留白分组，标题仅对读屏软件暴露 -->
        <h3 class="visually-hidden">{{ group.title }}</h3>
        <ul class="message-list">
          <li v-for="item in group.items" :key="item.id" class="message-item">
            <span class="message-badge">{{ item.badge }}</span>
            <p class="message-text">{{ item.text }}</p>
            <span class="message-time">{{ item.time }}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.message-page {
  padding-bottom: var(--space-7);
}

.message-panel {
  padding: var(--space-6);
  border-radius: var(--radius-md);
  background: var(--color-white);
  box-shadow: var(--shadow-lg);
}

.message-group + .message-group {
  margin-top: var(--space-7);
}

.message-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.message-item {
  display: flex;
  align-items: center;
  gap: var(--space-5);
}

/* 徽章：宽度随文字自适应，不做统一定宽 */
.message-badge {
  flex-shrink: 0;
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-pill);
  background: var(--color-primary-lightest);
  color: var(--color-primary-darkest);
  font-size: var(--font-size-lg);
  white-space: nowrap;
}

.message-text {
  flex: 1;
  min-width: 0;
  margin: 0;
  color: var(--color-text);
  font-size: var(--font-size-base);
}

.message-time {
  flex-shrink: 0;
  color: var(--color-text-subtle);
  font-size: var(--font-size-xs);
  white-space: nowrap;
}
</style>
