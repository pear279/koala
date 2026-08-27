<script setup>
/**
 * 养成资源进度条（阳光 / 水 / 肥料）
 * 替代原 5 个页面中重复的 .progress-group 区块。
 * 百分比数值与标签文字由同一份数据推导，不再分别硬编码在 CSS 和 HTML 中。
 */
import { resources } from '@/data/mock'
</script>

<template>
  <div class="resource-group">
    <section class="resource-bar-area">
      <div v-for="item in resources" :key="item.key" class="resource-bar">
        <div class="resource-bar-track">
          <!-- 进度宽度由数据驱动 -->
          <div
            class="resource-bar-fill"
            :class="`fill-${item.key}`"
            :style="{ width: `${item.value}%` }"
            role="progressbar"
            :aria-label="item.label"
            :aria-valuenow="item.value"
            aria-valuemin="0"
            aria-valuemax="100"
          />
          <img class="resource-icon" :src="item.icon" alt="">
        </div>
        <span class="resource-label">{{ item.label }}{{ item.value }}%</span>
      </div>
    </section>
    <hr class="resource-divider">
  </div>
</template>

<style scoped>
.resource-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--space-7);
}

.resource-bar-area {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-5);
}

.resource-bar {
  position: relative;
  flex: 1;
  max-width: 280px;
  height: 40px;
  background: var(--color-white);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
}

.resource-bar-track {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: var(--radius-sm);
}

.resource-bar-fill {
  height: 100%;
  border-radius: var(--radius-sm) 0 0 var(--radius-sm);
  transition: width 0.4s ease;
}

.fill-sun {
  background: linear-gradient(90deg, var(--color-sun-from) 0%, var(--color-sun-to) 100%);
}

.fill-water {
  background: linear-gradient(90deg, var(--color-water-from) 0%, var(--color-water-to) 100%);
}

.fill-fertilizer {
  background: linear-gradient(
    90deg,
    var(--color-fertilizer-from) 0%,
    var(--color-fertilizer-to) 100%
  );
}

.resource-icon {
  position: absolute;
  right: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
}

.resource-label {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -24px;
  text-align: center;
  color: var(--color-white);
  font-size: var(--font-size-sm);
  font-weight: bold;
  letter-spacing: 1px;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}

.resource-divider {
  width: 100%;
  border: none;
  border-top: 2px solid var(--color-divider);
  opacity: 0.5;
  margin: var(--space-6) 0 0;
}
</style>
