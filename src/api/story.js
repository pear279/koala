/**
 * 故事库相关接口（原型阶段：模拟异步，数据来自 mocks/story）
 */
import { mockRequest } from './request'
import { calendarView, communityEntries, createCalendarRecords } from '@/mocks/story'

/** 获取心情日历展示配置 */
export function fetchCalendarView() {
  return mockRequest(calendarView)
}

/** 获取社区入口 */
export function fetchCommunityEntries() {
  return mockRequest(communityEntries)
}

/**
 * 按月获取心情记录
 * @param {string} month 格式 YYYY-MM
 */
export function fetchCalendarRecords(month) {
  return mockRequest(() => createCalendarRecords(month))
}
