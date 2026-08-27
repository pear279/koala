<script setup>
/**
 * 左侧导航栏
 * 替代原 6 个 HTML 页面中逐字重复的 .sidebar 区块。
 * 导航项来自 config/navigation.js，激活态由路由自动判定。
 */
import { navItems } from '@/config/navigation'
import { currentUser } from '@/data/mock'
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

    <div class="user-info">
      <img class="user-avatar" :src="currentUser.avatar" :alt="`${currentUser.name} 的头像`">
      <span class="user-name">{{ currentUser.name }}</span>
      <span class="user-email">{{ currentUser.email }}</span>
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
  padding: var(--space-7) var(--space-4) 0;
}

/* Logo 区 */
.logo-area {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: var(--space-7);
}

.logo-img {
  width: 72px;
  height: 72px;
  object-fit: contain;
  margin-right: var(--space-3);
}

/* 渐变文字：background-clip 裁切实现 */
.logo-text {
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 2px;
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-pill);
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
  gap: var(--space-5);
  width: 100%;
  margin-top: var(--space-6);
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--space-3) 0;
  color: var(--color-white);
  font-size: var(--font-size-xl);
  font-weight: bold;
  text-decoration: none;
  text-align: center;
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
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-white);
  font-size: var(--font-size-md);
  text-align: center;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-full);
  object-fit: cover;
  margin-bottom: var(--space-2);
}

.user-email {
  font-size: var(--font-size-sm);
  opacity: 0.85;
}
</style>
