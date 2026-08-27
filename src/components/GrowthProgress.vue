<script setup>
/**
 * 培育进度
 * 由设计稿截图 public/images/plant/growth-progress-0.png 还原为真实 DOM。
 * 三栏结构：植物大图 / 资源栏（养护动作 + 领取入口）/ 植物信息。
 *
 * 资源条沿用设计稿切图（sun-alt / water-alt / fertilizer-alt），
 * 这三张图自带渐变与图标，作为装饰性背景使用。
 */
import { growthActions, growthPlant, growthResourceButtons } from '@/data/mock'

/** 进度百分比做区间收敛，避免异常数据把进度条撑破 */
const progress = Math.min(100, Math.max(0, Number(growthPlant.progress) || 0))
</script>

<template>
  <div class="growth">
    <!-- 我的植物 -->
    <section class="growth-col growth-plant">
      <h3 class="growth-col-title">我的植物</h3>
      <img class="plant-photo" :src="growthPlant.image" :alt="growthPlant.name">
    </section>

    <!-- 资源栏 -->
    <section class="growth-col growth-resource">
      <h3 class="growth-col-title">资源栏</h3>

      <ul class="action-list">
        <li v-for="action in growthActions" :key="action.key" class="action-item">
          <button class="action-btn" type="button">
            <span class="action-label">{{ action.label }}</span>
            <span class="action-amount">{{ action.resource }} {{ action.amount }}</span>
          </button>
          <img class="action-bar" :src="action.bar" alt="">
        </li>
      </ul>

      <div class="resource-actions">
        <button
          v-for="button in growthResourceButtons"
          :key="button.key"
          class="resource-btn"
          :class="{ 'is-disabled': !button.enabled }"
          type="button"
          :disabled="!button.enabled"
        >
          {{ button.label }}
        </button>
      </div>
    </section>

    <!-- 植物信息 -->
    <section class="growth-col growth-info">
      <h3 class="growth-col-title">植物信息</h3>

      <p class="info-name">{{ growthPlant.name }}</p>

      <dl class="info-rows">
        <div class="info-row">
          <dt class="info-key">种植时间</dt>
          <dd class="info-value">{{ growthPlant.plantedAt }}</dd>
        </div>

        <div class="info-row">
          <dt class="info-key">情绪标签</dt>
          <dd class="info-value info-tags">
            <span v-for="tag in growthPlant.moodTags" :key="tag" class="info-tag">
              #{{ tag }}
            </span>
          </dd>
        </div>
      </dl>

      <div class="info-record">
        <div class="record-head">
          <span class="info-key">记录内容</span>
          <span class="record-meta">
            {{ growthPlant.record.date }}（{{ growthPlant.record.order }}）
          </span>
        </div>
        <p class="record-text">{{ growthPlant.record.text }}</p>
      </div>

      <div class="info-stage">
        <span class="stage-label">成长阶段：{{ growthPlant.stage }}</span>
        <div class="stage-track">
          <div
            class="stage-fill"
            :style="{ width: `${progress}%` }"
            role="progressbar"
            aria-label="成长进度"
            :aria-valuenow="progress"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span class="stage-percent">{{ progress }}%</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 三栏：大图列按图片原始比例定宽，其余两列分配剩余空间 */
.growth {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) minmax(200px, 0.9fr) minmax(320px, 1.9fr);
  border-radius: var(--radius-md);
  background: var(--color-primary);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.growth-col {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: var(--space-4);
}

.growth-col-title {
  margin: 0 0 var(--space-4);
  color: var(--color-white);
  font-size: var(--font-size-md);
  font-weight: 400;
  text-align: center;
  text-shadow: 0 2px 6px rgba(69, 51, 103, 0.5);
}

/* 大图列：无内边距，让图片铺满 */
.growth-plant {
  padding: 0;
  position: relative;
}

.growth-plant .growth-col-title {
  position: absolute;
  top: var(--space-4);
  left: 0;
  right: 0;
  z-index: 1;
  margin: 0;
}

.plant-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 资源栏 */
.growth-resource {
  background: var(--color-primary-light);
}

.action-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.action-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-4);
  border: none;
  border-radius: var(--radius-pill);
  background: var(--color-primary-dark);
  color: var(--color-white);
  font-family: inherit;
  cursor: pointer;
  transition: opacity var(--transition-base);
}

.action-btn:hover {
  opacity: 0.85;
}

.action-label {
  font-size: var(--font-size-md);
}

.action-amount {
  font-size: var(--font-size-xs);
}

/* 资源条为设计稿切图，含渐变与图标 */
.action-bar {
  width: 100%;
  height: auto;
  display: block;
}

.resource-actions {
  margin-top: auto;
  padding-top: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.resource-btn {
  padding: var(--space-3) var(--space-4);
  border: none;
  border-radius: var(--radius-pill);
  background: var(--color-white);
  color: var(--color-primary-darkest);
  font-size: var(--font-size-md);
  font-family: inherit;
  cursor: pointer;
  transition: opacity var(--transition-base);
}

.resource-btn:hover:not(:disabled) {
  opacity: 0.85;
}

/* 未到时间的按钮：保持可读，仅弱化 */
.resource-btn.is-disabled {
  color: var(--color-text-muted);
  cursor: not-allowed;
}

/* 植物信息 */
.growth-info {
  gap: var(--space-3);
  background: var(--color-primary-dark);
}

.info-name {
  align-self: flex-start;
  margin: 0;
  padding: var(--space-2) var(--space-6);
  border-radius: var(--radius-pill);
  background: var(--color-white);
  color: var(--color-primary-darkest);
  font-size: var(--font-size-md);
}

.info-rows {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.info-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.info-key {
  flex-shrink: 0;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-sm);
  background: var(--color-white);
  color: var(--color-primary-darkest);
  font-size: var(--font-size-sm);
}

.info-value {
  flex: 1;
  min-width: 0;
  margin: 0;
  padding: var(--space-1) var(--space-4);
  border-radius: var(--radius-pill);
  background: var(--color-white);
  color: var(--color-text);
  font-size: var(--font-size-sm);
}

.info-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.info-tag {
  color: var(--color-primary-darkest);
}

/* 记录内容 */
.info-record {
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background: var(--color-white);
}

.record-head {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-2);
}

.record-meta {
  color: var(--color-text-subtle);
  font-size: var(--font-size-xs);
}

/* 长文正文限高滚动，避免整块把三栏高度撑得过长 */
.record-text {
  margin: 0;
  max-height: 96px;
  overflow-y: auto;
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  line-height: 1.7;
}

/* 成长阶段 */
.info-stage {
  margin-top: auto;
  padding-top: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.stage-label {
  align-self: flex-start;
  padding: var(--space-1) var(--space-4);
  border-radius: var(--radius-pill);
  background: var(--color-white);
  color: var(--color-primary-darkest);
  font-size: var(--font-size-sm);
}

.stage-track {
  height: 28px;
  border-radius: var(--radius-pill);
  background: var(--color-white);
  overflow: hidden;
}

.stage-fill {
  height: 100%;
  min-width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: var(--color-white);
  transition: width 0.4s ease;
}

.stage-percent {
  font-size: var(--font-size-sm);
}

/* 窄屏改为纵向堆叠，避免三栏挤压到不可读 */
@media (max-width: 1200px) {
  .growth {
    grid-template-columns: 1fr;
  }

  .plant-photo {
    max-height: 320px;
  }
}
</style>
