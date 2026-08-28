/**
 * 首页相关接口（原型阶段：模拟异步，数据来自 mocks/home）
 */
import { mockRequest } from './request'
import { luckyFlower, personalities } from '@/mocks/home'

/** 获取今日幸运花语 */
export function fetchLuckyFlower() {
  return mockRequest(luckyFlower)
}

/** 获取 AI 性格列表 */
export function fetchPersonalities() {
  return mockRequest(personalities)
}
