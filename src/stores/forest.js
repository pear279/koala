/**
 * 我的森林状态：植物图鉴 + 培育进度
 */
import { defineStore } from 'pinia'
import {
  fetchGrowthActions,
  fetchGrowthPlant,
  fetchGrowthResourceButtons,
  fetchPlants,
} from '@/api/forest'

export const useForestStore = defineStore('forest', {
  state: () => ({
    plants: [],
    growthPlant: null,
    growthActions: [],
    growthResourceButtons: [],
    loaded: false,
  }),

  actions: {
    async load() {
      if (this.loaded) return
      const [plants, growthPlant, growthActions, growthResourceButtons] = await Promise.all([
        fetchPlants(),
        fetchGrowthPlant(),
        fetchGrowthActions(),
        fetchGrowthResourceButtons(),
      ])
      this.plants = plants
      this.growthPlant = growthPlant
      this.growthActions = growthActions
      this.growthResourceButtons = growthResourceButtons
      this.loaded = true
    },
  },
})
