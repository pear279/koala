/**
 * 对话面板相关接口（原型阶段：模拟异步，数据来自 mocks/chat）
 */
import { mockRequest } from './request'
import { initialMessages } from '@/mocks/chat'

/** 获取初始对话记录 */
export function fetchInitialMessages() {
  return mockRequest(initialMessages)
}
