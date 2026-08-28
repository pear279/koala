/**
 * 我的森林相关接口（原型阶段：模拟异步，数据来自 mocks/forest）
 */
import { mockRequest } from './request'
import {
  growthActions,
  growthPlant,
  growthResourceButtons,
  plants,
} from '@/mocks/forest'

/** 获取植物图鉴 */
export function fetchPlants() {
  return mockRequest(plants)
}

/** 获取培育中植物信息 */
export function fetchGrowthPlant() {
  return mockRequest(growthPlant)
}

/** 获取资源栏养护动作 */
export function fetchGrowthActions() {
  return mockRequest(growthActions)
}

/** 获取资源栏底部按钮 */
export function fetchGrowthResourceButtons() {
  return mockRequest(growthResourceButtons)
}
