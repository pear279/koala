/**
 * 时间格式化
 */

const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE

/** 取某个时间所在自然日的零点，用于按日历天判断「昨天」 */
function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

/**
 * 相对时间文案：刚刚 / N分钟前 / N个小时前 / 昨天 / M月D日
 * 按自然日判断昨天，避免「23:50 与次日 00:10」被算成同一天。
 *
 * @param {Date|number|string} value 目标时间
 * @param {Date} [now] 基准时间，默认当前时间
 * @returns {string} 相对时间文案，无法解析时返回空串
 */
export function formatRelativeTime(value, now = new Date()) {
  const target = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(target.getTime())) return ''

  const diff = now.getTime() - target.getTime()

  // 未来时间不做倒计时展示，统一按「刚刚」处理
  if (diff < MINUTE) return '刚刚'
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)}分钟前`

  const dayDiff = Math.round((startOfDay(now) - startOfDay(target)) / (24 * HOUR))
  if (dayDiff === 0) return `${Math.floor(diff / HOUR)}个小时前`
  if (dayDiff === 1) return '昨天'

  return `${target.getMonth() + 1}月${target.getDate()}日`
}
