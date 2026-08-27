<script setup>
/**
 * 三栏布局壳
 * 左侧导航固定存在；资源条与对话面板由各页面通过路由 meta 显式声明，
 * 解决原型中 my.html 缺失这两个区块究竟是设计意图还是漏改的歧义。
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from './AppSidebar.vue'
import ResourceBar from './ResourceBar.vue'
import ChatPanel from './ChatPanel.vue'

const route = useRoute()

// 默认显示，页面可通过 meta 关闭
const showResourceBar = computed(() => route.meta.showResourceBar !== false)
const showChatPanel = computed(() => route.meta.showChatPanel !== false)
</script>

<template>
  <div class="app-layout">
    <AppSidebar />

    <main class="app-main">
      <ResourceBar v-if="showResourceBar" />
      <div class="app-content">
        <slot />
      </div>
    </main>

    <ChatPanel v-if="showChatPanel" />
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  width: 100%;
  max-width: var(--layout-max-width);
  min-width: var(--layout-min-width);
  height: 100vh;
  margin: 0 auto;
}

/* 中间区：宽度自适应，替代原来的 1220px 硬编码 */
.app-main {
  flex: 1;
  min-width: 0;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: var(--space-7) var(--content-gutter) 0;
}

.app-content {
  flex: 1;
  min-width: 0;
}
</style>
