/**
 * 故事库 mock 数据：心情日历 + 社区入口
 */

/** 心情日历展示配置：月份与高亮日期留给组件取系统当前时间 */
export const calendarView = {
  /** 每周展示的记录槽位行数 */
  slotRows: 3,
  recordIcon: '/images/story/seed-alt.png',
}

/**
 * 生成某月的心情记录数（含前后补位周所属日期）。
 * 原型阶段的占位数据：用日期派生的确定性取值，保证同一天每次渲染结果一致，
 * 接入接口后替换为「按月查询记录」的返回值即可。
 *
 * @param {string} month 目标月份，格式 YYYY-MM
 * @returns {Record<string, number>} key 为 YYYY-MM-DD，value 为当日记录条数
 */
export function createCalendarRecords(month) {
  const matched = /^(\d{4})-(\d{2})$/.exec(String(month ?? ''))
  if (!matched) return {}

  const year = Number(matched[1])
  const monthIndex = Number(matched[2]) - 1
  const records = {}

  // 覆盖目标月及前后各一周，供日历补位格也能显示记录
  const start = new Date(year, monthIndex, -6)
  const end = new Date(year, monthIndex + 1, 7)

  for (const cursor = start; cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
    const y = cursor.getFullYear()
    const m = cursor.getMonth() + 1
    const d = cursor.getDate()
    // 简单散列：让记录数在 0-3 间稳定分布
    const count = (y * 31 + m * 7 + d * 13) % 4
    if (count > 0) {
      records[`${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`] = count
    }
  }

  return records
}

/** 故事库社区入口 */
export const communityEntries = [
  {
    key: 'friend',
    name: '好友社区',
    icon: '/images/story/1-1.png',
    cover: '/images/story/1-3.png',
    to: '/seed',
  },
  {
    key: 'resonance',
    name: '共鸣社区',
    icon: '/images/story/2-2.png',
    cover: '/images/story/2-3.png',
    to: '',
  },
]
