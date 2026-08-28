/**
 * 消息中心相关接口（原型阶段：模拟异步，数据来自 mocks/message）
 */
import { mockRequest } from './request'
import { messageGroups } from '@/mocks/message'

/** 获取消息分组列表 */
export function fetchMessageGroups() {
  return mockRequest(messageGroups)
}
