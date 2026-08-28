/**
 * 我的种子状态
 */
import { defineStore } from 'pinia'
import { fetchSeedEntries, fetchSeedModes, fetchSeedRecords } from '@/api/seed'

export const useSeedStore = defineStore('seed', {
  state: () => ({
    records: [],
    entries: [],
    modes: [],
    loaded: false,
  }),

  actions: {
    async load() {
      if (this.loaded) return
      const [records, entries, modes] = await Promise.all([
        fetchSeedRecords(),
        fetchSeedEntries(),
        fetchSeedModes(),
      ])
      this.records = records
      this.entries = entries
      this.modes = modes
      this.loaded = true
    },
  },
})
