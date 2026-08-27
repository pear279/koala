import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * 路由表
 * 使用 hash 模式：静态托管（GitHub Pages 等）无需服务端重写规则。
 * meta.showResourceBar / showChatPanel 用于显式声明布局区块，默认为 true。
 */
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/forest',
    name: 'forest',
    component: () => import('@/pages/ForestPage.vue'),
  },
  {
    path: '/story',
    name: 'story',
    component: () => import('@/pages/StoryPage.vue'),
  },
  {
    path: '/seed',
    name: 'seed',
    component: () => import('@/pages/SeedPage.vue'),
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('@/pages/MessagePage.vue'),
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/pages/MyPage.vue'),
    // 「我的」页面为全宽个人中心，不显示资源条与对话面板
    meta: { showResourceBar: false, showChatPanel: false },
  },
  // 兜底：未匹配路径回首页，避免白屏
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
