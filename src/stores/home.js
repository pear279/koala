/**
 * 首页状态：今日幸运花语 + AI 性格
 */
import { defineStore } from 'pinia'
import { fetchLuckyFlower, fetchPersonalities } from '@/api/home'

export const useHomeStore = defineStore('home', {
  state: () => ({
    luckyFlower: null,
    personalities: [],
    loaded: false,
  }),

  actions: {
    async load() {
      if (this.loaded) return
      const [luckyFlower, personalities] = await Promise.all([
        fetchLuckyFlower(),
        fetchPersonalities(),
      ])
      this.luckyFlower = luckyFlower
      this.personalities = personalities
      this.loaded = true
    },
  },
})
