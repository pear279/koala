<script setup>
/**
 * 左侧导航栏
 * 替代原 6 个 HTML 页面中逐字重复的 .sidebar 区块。
 * 导航项来自 config/navigation.js，激活态由路由自动判定。
 */
import { onMounted } from 'vue'
import { navItems } from '@/config/navigation'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
onMounted(() => userStore.load())
</script>

<template>
  <aside class="sidebar">
    <div class="logo-area">
      <img class="logo-img" src="/images/logo.png" alt="Moodseed 标志">
      <span class="logo-text">Moodseed</span>
    </div>

    <nav class="nav" aria-label="主导航">
      <RouterLink
        v-for="item in navItems"
        :key="item.name"
        :to="item.path"
        class="nav-item"
      >
        {{ item.label }}
      </RouterLink>
    </nav>

    <div v-if="userStore.currentUser" class="user-info">
      <img class="user-avatar" :src="userStore.currentUser.avatar" :alt="`${userStore.currentUser.name} 的头像`">
      <span class="user-name">{{ userStore.currentUser.name }}</span>
      <span class="user-email">{{ userStore.currentUser.email }}</span>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  flex: 0 0 var(--sidebar-width);
  width: var(--sidebar-width);
  height: 100vh;
  background: var(--surface-panel);
  border-right: 2px solid var(--color-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-5) var(--space-3) var(--space-4);
  /* 极矮视口下允许内部滚动，避免用户信息被挤出可视区 */
  overflow-y: auto;
}

/* Logo 区：栏宽收窄时改为纵向排列，避免图标与文字互相挤压 */
.logo-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  width: 100%;
  margin-bottom: var(--space-5);
}

.logo-img {
  width: var(--sidebar-logo-size);
  height: var(--sidebar-logo-size);
  object-fit: contain;
}

/* 渐变文字：background-clip 裁切实现 */
.logo-text {
  font-size: var(--sidebar-brand-size);
  font-weight: bold;
  letter-spacing: 1px;
  background-image: linear-gradient(
    90deg,
    var(--color-primary) 0%,
    var(--color-white) 50%,
    var(--color-primary-darkest) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}

/* 导航 */
.nav {
  display: flex;
  flex-direction: column;
  gap: var(--sidebar-nav-gap);
  width: 100%;
  margin-top: var(--space-3);
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--space-2) var(--space-2);
  color: var(--color-white);
  font-size: var(--sidebar-nav-size);
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  border-radius: var(--radius-pill);
  background: linear-gradient(90deg, var(--color-primary-dark) 0%, var(--color-primary) 100%);
  box-shadow: 0 2px 12px rgba(188, 164, 228, 0.2);
  transition: color var(--transition-base), background var(--transition-base);
}

.nav-item:hover {
  color: var(--color-primary-darkest);
  background: linear-gradient(90deg, var(--color-primary-lightest) 0%, var(--color-primary) 100%);
}

/* vue-router 自动注入的激活类，无需手写 active 判断 */
.nav-item.router-link-exact-active {
  color: var(--color-primary-darkest);
  background: linear-gradient(
    90deg,
    var(--color-primary-light) 0%,
    var(--color-primary-lightest) 100%
  );
  box-shadow: 0 2px 16px rgba(230, 215, 255, 0.4);
}

/* 用户信息：贴底 */
.user-info {
  margin-top: auto;
  padding-top: var(--space-5);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: var(--color-white);
  font-size: var(--font-size-sm);
  text-align: center;
}

.user-avatar {
  width: var(--sidebar-avatar-size);
  height: var(--sidebar-avatar-size);
  border-radius: var(--radius-full);
  object-fit: cover;
  margin-bottom: var(--space-2);
}

.user-name {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 邮箱可能较长，允许在任意字符处断行，避免溢出侧栏 */
.user-email {
  max-width: 100%;
  font-size: var(--font-size-xs);
  line-height: 1.4;
  opacity: 0.85;
  overflow-wrap: anywhere;
}
</style>
