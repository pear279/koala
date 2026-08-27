<script setup>
/**
 * 我的种子
 * 由设计稿截图 public/images/story/seed1.png、seed2.png 还原为真实 DOM。
 * 布局：左「相关记录」列表 + 右两张入口卡，下方两张模式卡。
 *
 * 入口卡插画由 seed1.png 裁切为独立素材（public/images/seed/），
 * 模式卡的白色线稿图标改为内联 SVG，可随字号缩放且不受位图分辨率限制。
 */
import { seedEntries, seedModes, seedRecords } from '@/data/mock'
</script>

<template>
  <div class="seed-page">
    <h2 class="section-title">我的种子</h2>

    <div class="seed-body">
      <!-- 相关记录 -->
      <section class="record-panel">
        <h3 class="panel-title">相关记录</h3>
        <ul class="record-list">
          <li v-for="record in seedRecords" :key="record.id" class="record-item">
            <span class="record-tag">#{{ record.tag }}</span>
            <div class="record-card">
              <p class="record-text">{{ record.text }}</p>
              <span class="record-date">{{ record.date }}</span>
            </div>
          </li>
        </ul>
      </section>

      <!-- 右侧入口卡 -->
      <div class="entry-column">
        <button v-for="entry in seedEntries" :key="entry.key" class="entry-card" type="button">
          <img class="entry-image" :src="entry.image" :alt="entry.title">
          <span class="entry-title">{{ entry.title }}</span>
        </button>
      </div>
    </div>

    <!-- 底部模式卡 -->
    <div class="mode-grid">
      <button v-for="mode in seedModes" :key="mode.key" class="mode-card" type="button">
        <span class="mode-title">{{ mode.title }}</span>

        <!-- 合种：双手托起幼苗 -->
        <svg
          v-if="mode.key === 'co-planting'"
          class="mode-icon"
          viewBox="0 0 120 120"
          fill="none"
          stroke="currentColor"
          stroke-width="3.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M60 52V34" />
          <path d="M60 38c0-7 5-13 12-14 0 8-5 13-12 14Z" />
          <path d="M60 46c-6-1-10-6-10-12 7 1 11 6 10 12Z" />
          <path d="M44 74c-2-8 6-16 16-16s18 8 16 16Z" />
          <path d="M44 74c-6-4-9-11-9-19v-6c0-4-6-4-6 0v22c0 6 3 12 8 16l5 4" />
          <path d="M76 74c6-4 9-11 9-19v-6c0-4 6-4 6 0v22c0 6-3 12-8 16l-5 4" />
          <path d="M42 78h36v18H42z" />
          <path d="M60 78v18" />
        </svg>

        <!-- 赠送：手心托起爱心 -->
        <svg
          v-else
          class="mode-icon"
          viewBox="0 0 120 120"
          fill="none"
          stroke="currentColor"
          stroke-width="3.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path
            d="M60 66 42 47c-6-6-6-16 1-21s16-3 20 4c4-7 14-9 20-4s7 15 1 21Z"
          />
          <path d="M30 80h10l8 6h16c4 0 4 6 0 6H50" />
          <path d="M30 80v18h12l30-10 18-8c5-2 8 4 3 7l-26 17c-4 3-9 4-14 4H42" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.seed-page {
  padding-bottom: var(--space-7);
}

/* 左列自适应、右列定宽，与截图 2:1 的比例一致 */
.seed-body {
  display: grid;
  grid-template-columns: minmax(0, 1.9fr) minmax(260px, 1fr);
  gap: var(--space-6);
  align-items: start;
}

/* 相关记录 */
.record-panel {
  padding: var(--space-5);
  border-radius: var(--radius-md);
  background: var(--color-primary-lightest);
  box-shadow: var(--shadow-lg);
}

.panel-title {
  width: fit-content;
  margin: 0 auto var(--space-5);
  padding: var(--space-3) var(--space-7);
  border-radius: var(--radius-pill);
  background: var(--color-white);
  color: var(--color-text);
  font-size: var(--font-size-lg);
  font-weight: bold;
}

.record-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.record-tag {
  display: inline-block;
  margin-bottom: var(--space-2);
  padding: 2px var(--space-3);
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: var(--color-white);
  font-size: var(--font-size-xs);
}

.record-card {
  display: flex;
  align-items: stretch;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background: var(--color-white);
}

.record-text {
  flex: 1;
  min-width: 0;
  margin: 0;
  color: var(--color-text);
  font-size: var(--font-size-sm);
  line-height: 1.7;
}

/* 日期块：定宽换行，与截图右侧灰色方块一致 */
.record-date {
  flex-shrink: 0;
  width: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2);
  border-radius: var(--radius-md);
  background: var(--color-field-bg);
  color: var(--color-text-subtle);
  font-size: var(--font-size-xs);
  text-align: center;
}

/* 右侧入口卡 */
.entry-column {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.entry-card {
  position: relative;
  padding: 0;
  border: none;
  border-radius: var(--radius-md);
  background: none;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  cursor: pointer;
  transition: transform var(--transition-base);
}

.entry-card:hover {
  transform: translateY(-2px);
}

.entry-image {
  width: 100%;
  height: auto;
  display: block;
}

/* 标题为真实文本，覆盖在插画上，替代切图里的胶囊 */
.entry-title {
  position: absolute;
  left: var(--space-4);
  top: var(--space-4);
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-pill);
  background: var(--color-white);
  color: var(--color-text);
  font-size: var(--font-size-base);
  font-family: inherit;
}

/* 底部模式卡 */
.mode-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  margin-top: var(--space-6);
}

.mode-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 240px;
  padding: var(--space-6);
  border: none;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%);
  box-shadow: var(--shadow-lg);
  color: var(--color-white);
  cursor: pointer;
  transition: transform var(--transition-base);
}

.mode-card:hover {
  transform: translateY(-2px);
}

.mode-title {
  position: absolute;
  left: var(--space-4);
  top: var(--space-4);
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-pill);
  background: var(--color-white);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  font-family: inherit;
}

/* 线稿图标用 currentColor，跟随卡片文字色 */
.mode-icon {
  width: 128px;
  height: 128px;
}

/* 窄屏改为单列，避免左右挤压 */
@media (max-width: 1200px) {
  .seed-body,
  .mode-grid {
    grid-template-columns: 1fr;
  }
}
</style>
