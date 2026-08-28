/**
 * 我的种子相关接口（原型阶段：模拟异步，数据来自 mocks/seed）
 */
import { mockRequest } from './request'
import { seedEntries, seedModes, seedRecords } from '@/mocks/seed'

/** 获取相关记录 */
export function fetchSeedRecords() {
  return mockRequest(seedRecords)
}

/** 获取右侧入口卡 */
export function fetchSeedEntries() {
  return mockRequest(seedEntries)
}

/** 获取底部模式卡 */
export function fetchSeedModes() {
  return mockRequest(seedModes)
}
