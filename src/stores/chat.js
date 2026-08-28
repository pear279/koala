/**
 * 对话面板状态
 *
 * 安全约束：消息内容一律通过 Vue 文本插值（{{ }}）渲染，等价于 textContent。
 * 后续接入真实 AI 回复时，同样禁止使用 v-html —— AI 输出属于不可信输入。
 */
import { defineStore } from 'pinia'
import { fetchInitialMessages } from '@/api/chat'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [],
    loaded: false,
  }),

  actions: {
    async load() {
      if (this.loaded) return
      this.messages = await fetchInitialMessages()
      this.loaded = true
    },

    /** 发送用户消息 */
    sendMessage(text) {
      const trimmed = text.trim()
      if (!trimmed) return

      this.messages.push({
        id: Date.now(),
        role: 'user',
        identity: '用户',
        avatar: '/images/avatar-user.jpg',
        text: trimmed,
        tags: [],
      })
    },

    /** 开启新对话：清空当前会话 */
    startNewChat() {
      this.messages = []
    },
  },
})
