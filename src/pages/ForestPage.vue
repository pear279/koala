<script setup>
/**
 * 我的森林：植物图鉴 + 培育进度
 */
import { plants } from '@/data/mock'
import GrowthProgress from '@/components/GrowthProgress.vue'
</script>

<template>
  <div class="forest-page">
    <section>
      <h2 class="section-title">植物图鉴</h2>
      <div class="plant-grid">
        <div
          v-for="plant in plants"
          :key="plant.id"
          class="plant-item"
          :class="{ locked: !plant.unlocked }"
        >
          <img :src="plant.image" :alt="plant.name">
          <p class="plant-name">{{ plant.name }}</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="section-title">培育进度</h2>
      <GrowthProgress />
    </section>
  </div>
</template>

<style scoped>
.forest-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
  padding-bottom: var(--space-7);
}

.plant-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-5);
}

.plant-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-white);
  text-align: center;
}

.plant-item img {
  width: 100%;
  height: auto;
}

.plant-item.locked {
  opacity: 0.7;
}

.plant-name {
  margin: var(--space-2) 0 0;
  font-size: var(--font-size-base);
  text-shadow: 0 2px 6px rgba(69, 51, 103, 0.6);
}
</style>
