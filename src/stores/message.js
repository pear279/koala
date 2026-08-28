/**
 * 消息中心状态
 */
import { defineStore } from 'pinia'
import { fetchMessageGroups } from '@/api/message'

export const useMessageStore = defineStore('message', {
  state: () => ({
    groups: [],
    loaded: false,
  }),

  actions: {
    async load() {
      if (this.loaded) return
      this.groups = await fetchMessageGroups()
      this.loaded = true
    },
  },
})
