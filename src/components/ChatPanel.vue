<script setup>
/**
 * 右侧对话面板
 * 替代原 5 个页面中重复的 .chat-panel 区块，并从静态展示升级为可交互。
 *
 * 安全约束：消息内容一律通过 Vue 文本插值（{{ }}）渲染，等价于 textContent。
 * 后续接入真实 AI 回复时，同样禁止使用 v-html —— AI 输出属于不可信输入。
 */
import { nextTick, onMounted, ref, watch } from 'vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
onMounted(() => chatStore.load())

const draft = ref('')
const chatListRef = ref(null)

/** 滚动到对话列表底部 */
async function scrollToBottom() {
  await nextTick()
  const el = chatListRef.value
  if (el) {
    el.scrollTop = el.scrollHeight
  }
}

watch(() => chatStore.messages.length, scrollToBottom)

/** 发送用户消息 */
function sendMessage() {
  if (!draft.value.trim()) return
  chatStore.sendMessage(draft.value)
  draft.value = ''
}

/** 开启新对话：清空当前会话 */
function startNewChat() {
  chatStore.startNewChat()
  draft.value = ''
}
</script>

<template>
  <aside class="chat-panel">
    <div class="chat-toolbar">
      <div class="toolbar-group">
        <button class="toolbar-item" type="button" @click="startNewChat">
          <span class="toolbar-icon" aria-hidden="true">＋</span>
          <span class="toolbar-text">新对话</span>
        </button>
        <button class="toolbar-item" type="button">
          <span class="toolbar-icon" aria-hidden="true">💬</span>
          <span class="toolbar-text">聊天记录</span>
        </button>
      </div>
      <div class="toolbar-group">
        <button class="toolbar-item" type="button">
          <span class="toolbar-icon" aria-hidden="true">⤢</span>
          <span class="toolbar-text">全屏</span>
        </button>
        <button class="toolbar-item" type="button">
          <span class="toolbar-icon" aria-hidden="true">✕</span>
          <span class="toolbar-text">关闭</span>
        </button>
      </div>
    </div>

    <div ref="chatListRef" class="chat-list" aria-live="polite">
      <p v-if="chatStore.messages.length === 0" class="chat-empty">
        新的开始，说点什么吧~
      </p>

      <div
        v-for="message in chatStore.messages"
        :key="message.id"
        class="chat-row"
        :class="message.role"
      >
        <div class="chat-avatar-col">
          <img class="chat-avatar" :src="message.avatar" alt="">
          <span class="chat-identity">{{ message.identity }}</span>
        </div>
        <div class="chat-bubble-col">
          <div v-if="message.tags.length" class="chat-tags">
            <span v-for="tag in message.tags" :key="tag" class="chat-tag">#{{ tag }}</span>
          </div>
          <!-- 文本插值渲染，防 XSS -->
          <div class="chat-bubble">{{ message.text }}</div>
        </div>
      </div>
    </div>

    <div class="chat-input-area">
      <button class="seed-btn" type="button">
        <span class="seed-icon" aria-hidden="true">🌱</span>
        转化成种子
      </button>
      <div class="input-box">
        <textarea
          v-model="draft"
          class="input-text"
          placeholder="记录你的心事..."
          rows="3"
          aria-label="心情输入框"
          @keydown.enter.exact.prevent="sendMessage"
        />
        <button class="speak-btn" type="button" @click="sendMessage">点击说话</button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.chat-panel {
  flex: 0 0 var(--chat-panel-width);
  width: var(--chat-panel-width);
  height: 100vh;
  background: var(--surface-panel);
  border-left: 2px solid var(--color-primary);
  display: flex;
  flex-direction: column;
  padding: var(--space-7) var(--space-7) var(--space-6);
}

/* 工具栏 */
.chat-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-5);
}

.toolbar-group {
  display: flex;
  gap: var(--space-7);
}

.toolbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: 0;
  border: none;
  background: transparent;
  color: var(--color-white);
  cursor: pointer;
  font-family: inherit;
}

.toolbar-icon {
  font-size: var(--font-size-2xl);
  line-height: 1;
}

.toolbar-text {
  font-size: var(--font-size-sm);
  letter-spacing: 1px;
}

/* 对话列表：占据剩余空间并可滚动 */
.chat-list {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  margin-bottom: var(--space-5);
}

.chat-empty {
  color: var(--color-white);
  font-size: var(--font-size-sm);
  text-align: center;
  opacity: 0.8;
}

.chat-row {
  display: flex;
  align-items: center;
}

.chat-row.ai {
  justify-content: flex-start;
}

/* 用户消息：头像与气泡左右互换，用 order 实现，不重复 DOM */
.chat-row.user {
  justify-content: flex-end;
}

.chat-row.user .chat-avatar-col {
  order: 2;
}

.chat-row.user .chat-bubble-col {
  order: 1;
  align-items: flex-end;
}

/* 头像列 */
.chat-avatar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 64px;
  margin: 0 var(--space-2);
}

.chat-avatar {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  object-fit: cover;
  background: #eee;
  margin-bottom: var(--space-1);
}

.chat-identity {
  font-size: var(--font-size-xs);
  color: var(--color-white);
  letter-spacing: 1px;
  text-shadow: 0 2px 8px rgba(69, 51, 103, 0.6);
}

/* 气泡列 */
.chat-bubble-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 240px;
}

.chat-bubble {
  position: relative;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-white);
  box-shadow: var(--shadow-md);
  /* 原型中为 10px，提到 14px 保证可读 */
  font-size: var(--font-size-sm);
  line-height: 1.6;
  color: var(--color-text);
  text-align: left;
}

.chat-row.user .chat-bubble {
  background: var(--color-primary-lightest);
  color: var(--color-primary-darkest);
}

/* 气泡尾巴 */
.chat-row.ai .chat-bubble::before {
  content: '';
  position: absolute;
  left: -8px;
  top: 20px;
  border-width: 8px 8px 8px 0;
  border-style: solid;
  border-color: transparent var(--color-white) transparent transparent;
}

.chat-row.user .chat-bubble::before {
  content: '';
  position: absolute;
  right: -8px;
  top: 20px;
  border-width: 8px 0 8px 8px;
  border-style: solid;
  border-color: transparent transparent transparent var(--color-primary-lightest);
}

/* 情绪标签 */
.chat-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.chat-tag {
  padding: 2px var(--space-3);
  border-radius: var(--radius-pill);
  background: linear-gradient(90deg, var(--color-primary-dark) 0%, var(--color-primary) 100%);
  color: var(--color-white);
  font-size: var(--font-size-xs);
  font-weight: bold;
  letter-spacing: 1px;
}

/* 输入区：随内容贴底，不再用 absolute 定位 */
.chat-input-area {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.seed-btn {
  align-self: flex-start;
  display: flex;
  align-items: center;
  padding: var(--space-2) var(--space-5);
  border: none;
  border-radius: var(--radius-pill);
  background: var(--color-white);
  color: var(--color-primary-dark);
  font-size: var(--font-size-md);
  font-weight: bold;
  font-family: inherit;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: background var(--transition-base), color var(--transition-base);
}

.seed-btn:hover {
  background: var(--color-primary-lightest);
  color: var(--color-primary-darkest);
}

.seed-icon {
  margin-right: var(--space-2);
}

.input-box {
  background: var(--color-primary-lightest);
  border-radius: var(--radius-pill);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.input-text {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  color: var(--color-primary-darkest);
  font-size: var(--font-size-base);
  font-family: inherit;
  line-height: 1.6;
}

.input-text::placeholder {
  color: var(--color-primary-dark);
  opacity: 0.9;
}

.speak-btn {
  width: 70%;
  padding: var(--space-2) 0;
  border: none;
  border-radius: var(--radius-pill);
  background: var(--color-primary-dark);
  color: var(--color-white);
  font-size: var(--font-size-md);
  font-weight: bold;
  font-family: inherit;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: background var(--transition-base);
}

.speak-btn:hover {
  background: var(--color-primary-darkest);
}
</style>
