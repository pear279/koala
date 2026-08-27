<script setup>
/**
 * 我的（个人资料）
 * 由设计稿截图 public/images/me/profile.png 还原为真实 DOM 结构。
 * 类名沿用 archive/prototype-html/my.css 的语义，但布局按截图实际形态实现
 * （截图为「标签在上、控件在下」的表单，而非原 my.css 猜测的左右分列）。
 */
import { computed, reactive, ref } from 'vue'
import {
  currentUser,
  genderOptions,
  profileActions,
  userEmails,
  userProfile,
} from '@/data/mock'

/** 表单为本地草稿，编辑态才可修改 */
const form = reactive({ ...userProfile })
const isEditing = ref(false)
const emails = ref([...userEmails])

/** 顶栏日期，跟随系统时间 */
const today = computed(() =>
  new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date()),
)

function toggleEditing() {
  isEditing.value = !isEditing.value
}

/** 新增邮箱：原型阶段以当前主邮箱占位，接入接口后替换为真实流程 */
function addEmail() {
  const address = currentUser.email
  // 去重：同一地址不重复绑定
  if (emails.value.some((mail) => mail.address === address)) return

  emails.value.push({
    id: Date.now(),
    address,
    boundAt: '刚刚',
  })
}
</script>

<template>
  <div class="my-page">
    <!-- 顶栏：日期 / 搜索 / 通知 / 头像 -->
    <header class="topbar">
      <span class="topbar-date">{{ today }}</span>
      <div class="topbar-search">
        <span class="search-icon" aria-hidden="true">○</span>
        <label class="visually-hidden" for="profile-search">搜索</label>
        <input id="profile-search" class="search-input" type="search" placeholder="搜索">
      </div>
      <div class="topbar-right">
        <button class="icon-btn" type="button" aria-label="通知">
          <span aria-hidden="true">🔔</span>
        </button>
        <img class="topbar-avatar" :src="currentUser.avatar" :alt="`${currentUser.name} 的头像`">
      </div>
    </header>

    <!-- 渐变标题条 -->
    <div class="page-banner">
      <h1 class="page-banner-title">个人资料</h1>
    </div>

    <div class="profile-body">
      <!-- 左列：资料表单 -->
      <div class="profile-left">
        <section class="profile-section">
          <div class="profile-avatar">
            <img :src="currentUser.avatar" alt="">
          </div>
          <div class="profile-info">
            <span class="name">{{ currentUser.name }}</span>
            <span class="email">{{ currentUser.email }}</span>
          </div>
          <button class="edit-button" type="button" @click="toggleEditing">
            {{ isEditing ? '完成' : '编辑' }}
          </button>
        </section>

        <div class="profile-details">
          <div class="detail-item">
            <label class="label" for="field-nickname">昵称</label>
            <input
              id="field-nickname"
              v-model="form.nickname"
              class="field-control"
              type="text"
              placeholder="你的昵称"
              :disabled="!isEditing"
            >
          </div>

          <div class="detail-item">
            <label class="label" for="field-gender">性别</label>
            <div class="field-wrapper">
              <select
                id="field-gender"
                v-model="form.gender"
                class="field-control field-select"
                :disabled="!isEditing"
              >
                <option v-for="option in genderOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              <span class="arrow" aria-hidden="true">⌄</span>
            </div>
          </div>

          <div class="detail-item">
            <label class="label" for="field-phone">手机号</label>
            <div class="field-wrapper">
              <input
                id="field-phone"
                v-model="form.phone"
                class="field-control"
                type="tel"
                inputmode="numeric"
                placeholder="绑定手机号"
                :disabled="!isEditing"
              >
              <span class="arrow" aria-hidden="true">⌄</span>
            </div>
          </div>
        </div>

        <section class="email-address-section">
          <h2 class="label section-label">My email Address</h2>
          <div v-for="mail in emails" :key="mail.id" class="email-info">
            <span class="email-icon" aria-hidden="true">✉</span>
            <div class="email-text">
              <span class="email-value">{{ mail.address }}</span>
              <span class="time">{{ mail.boundAt }}</span>
            </div>
          </div>
          <button class="add-email" type="button" @click="addEmail">
            +添加邮箱地址
          </button>
        </section>
      </div>

      <!-- 右列：操作按钮 -->
      <div class="action-buttons">
        <button
          v-for="action in profileActions"
          :key="action.key"
          class="action-button"
          :class="{ 'is-disabled': !action.enabled }"
          type="button"
          :disabled="!action.enabled"
        >
          {{ action.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 该页为白底卡片，与全站紫色玻璃风格不同，遵循设计稿 */
.my-page {
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  margin-bottom: var(--space-7);
}

/* 屏幕阅读器专用文本 */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* 顶栏 */
.topbar {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  padding: var(--space-4) var(--space-6);
}

.topbar-date {
  color: var(--color-text-subtle);
  font-size: var(--font-size-sm);
  white-space: nowrap;
}

.topbar-search {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}

.search-icon {
  color: var(--color-text-subtle);
  font-size: var(--font-size-md);
}

.search-input {
  width: 140px;
  border: none;
  outline: none;
  background: transparent;
  color: var(--color-text);
  font-size: var(--font-size-sm);
  font-family: inherit;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.icon-btn {
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  font-size: var(--font-size-md);
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.topbar-avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  object-fit: cover;
}

/* 渐变标题条 */
.page-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  background: linear-gradient(
    90deg,
    #7aa5f0 0%,
    #a8b4ee 35%,
    #d3b9e4 65%,
    #f0d9d5 100%
  );
}

.page-banner-title {
  margin: 0;
  color: var(--color-white);
  font-size: var(--font-size-xl);
  font-weight: 500;
  letter-spacing: 2px;
}

/* 主体：左表单 / 右操作，窄屏自动堆叠 */
.profile-body {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-7);
  padding: var(--space-6);
}

.profile-left {
  flex: 1 1 380px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* 头像 + 姓名 + 编辑按钮 */
.profile-section {
  display: flex;
  align-items: center;
  gap: var(--space-5);
}

.profile-avatar img {
  width: 72px;
  height: 72px;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 0;
}

.profile-info .name {
  font-size: var(--font-size-md);
  font-weight: bold;
  color: var(--color-text);
}

.profile-info .email {
  font-size: var(--font-size-sm);
  color: var(--color-text-subtle);
}

.edit-button {
  margin-left: auto;
  flex-shrink: 0;
  padding: var(--space-2) var(--space-5);
  border: none;
  border-radius: var(--radius-sm);
  background: var(--color-accent);
  color: var(--color-white);
  font-size: var(--font-size-sm);
  font-family: inherit;
  cursor: pointer;
  transition: opacity var(--transition-base);
}

.edit-button:hover {
  opacity: 0.88;
}

/* 表单：标签在上、控件在下 */
.profile-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-muted);
}

.field-wrapper {
  position: relative;
}

.field-control {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-field-border);
  border-radius: var(--radius-sm);
  background: var(--color-field-bg);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  font-family: inherit;
  outline: none;
  transition: border-color var(--transition-base);
}

.field-control:focus {
  border-color: var(--color-accent);
}

/* 禁用态仍保持可读，不降低对比度到不可辨认 */
.field-control:disabled {
  cursor: default;
  color: var(--color-text-muted);
}

.field-control::placeholder {
  color: var(--color-text-subtle);
}

/* 用自定义箭头，隐藏原生下拉标记 */
.field-select {
  appearance: none;
  padding-right: var(--space-7);
}

.field-wrapper .arrow {
  position: absolute;
  right: var(--space-4);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-subtle);
  font-size: var(--font-size-base);
  pointer-events: none;
}

/* 邮箱区 */
.section-label {
  margin: 0 0 var(--space-3);
  font-size: var(--font-size-base);
  font-weight: bold;
  color: var(--color-text);
}

.email-info {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.email-icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: var(--color-accent);
  color: var(--color-white);
  font-size: var(--font-size-sm);
}

.email-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.email-value {
  font-size: var(--font-size-sm);
  color: var(--color-text);
}

.email-info .time {
  font-size: var(--font-size-xs);
  color: var(--color-text-subtle);
}

.add-email {
  align-self: flex-start;
  padding: var(--space-2) var(--space-4);
  border: none;
  border-radius: var(--radius-sm);
  background: var(--color-accent-soft);
  color: var(--color-accent);
  font-size: var(--font-size-sm);
  font-family: inherit;
  cursor: pointer;
}

/* 右列操作按钮 */
.action-buttons {
  flex: 1 1 320px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding-top: 56px;
}

.action-button {
  padding: var(--space-4);
  border: none;
  border-radius: var(--radius-md);
  background: var(--color-action);
  color: var(--color-white);
  font-size: var(--font-size-base);
  font-family: inherit;
  text-align: center;
  cursor: pointer;
  transition: opacity var(--transition-base);
}

.action-button:hover:not(:disabled) {
  opacity: 0.88;
}

.action-button.is-disabled {
  background: var(--color-disabled);
  cursor: not-allowed;
}
</style>
