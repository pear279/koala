/**
 * 养成资源相关接口（原型阶段：模拟异步，数据来自 mocks/resources）
 */
import { mockRequest } from './request'
import { resources } from '@/mocks/resources'

/** 获取养成资源进度（阳光 / 水 / 肥料） */
export function fetchResources() {
  return mockRequest(resources)
}
