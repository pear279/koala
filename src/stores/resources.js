/**
 * 养成资源进度状态（阳光 / 水 / 肥料）
 */
import { defineStore } from 'pinia'
import { fetchResources } from '@/api/resources'

export const useResourceStore = defineStore('resources', {
  state: () => ({
    resources: [],
    loaded: false,
  }),

  actions: {
    async load() {
      if (this.loaded) return
      this.resources = await fetchResources()
      this.loaded = true
    },
  },
})
