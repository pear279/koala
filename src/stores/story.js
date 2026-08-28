/**
 * 故事库状态：心情日历 + 社区入口
 */
import { defineStore } from 'pinia'
import { fetchCalendarRecords, fetchCalendarView, fetchCommunityEntries } from '@/api/story'

export const useStoryStore = defineStore('story', {
  state: () => ({
    calendarView: null,
    communityEntries: [],
    /** 当前展示月份的记录，key 为 YYYY-MM-DD */
    records: {},
    loaded: false,
  }),

  actions: {
    /** 拉取日历展示配置与社区入口，仅需一次 */
    async load() {
      if (this.loaded) return
      const [calendarView, communityEntries] = await Promise.all([
        fetchCalendarView(),
        fetchCommunityEntries(),
      ])
      this.calendarView = calendarView
      this.communityEntries = communityEntries
      this.loaded = true
    },

    /** 按月加载心情记录，翻月时调用 */
    async loadRecords(month) {
      this.records = await fetchCalendarRecords(month)
    },
  },
})
