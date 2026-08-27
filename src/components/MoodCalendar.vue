<script setup>
/**
 * 心情日历
 * 由设计稿截图 public/images/story/community-1.png 还原。
 * 结构：月份导航条 + 周表头 + 每周「日期行 + N 行紫色记录条带」，
 * 有记录的日期在条带上显示一枚种子图标，条数决定占用几行槽位。
 */
import { computed, ref, watch } from 'vue'

const props = defineProps({
  /** 初始展示月份，格式 YYYY-MM；留空则展示当前月 */
  defaultMonth: { type: String, default: '' },
  /** 高亮日期（通常是「今天」），格式 YYYY-MM-DD */
  highlightDate: { type: String, default: '' },
  /** 记录条数映射，key 为 YYYY-MM-DD，value 为当日记录数 */
  records: { type: Object, default: () => ({}) },
  /** 每周展示的记录槽位行数 */
  slotRows: { type: Number, default: 3 },
  /** 记录图标 */
  recordIcon: { type: String, required: true },
})

/** 月份切换后向外通知，父组件据此加载对应月份的记录 */
const emit = defineEmits(['month-change'])

const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

/** 解析 YYYY-MM；留空或非法输入回落到当前月，避免界面出现 NaN */
function parseMonth(value) {
  const matched = /^(\d{4})-(\d{2})$/.exec(String(value ?? ''))
  if (!matched) {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() + 1 }
  }
  return { year: Number(matched[1]), month: Number(matched[2]) }
}

const cursor = ref(parseMonth(props.defaultMonth))

/** 当前月份，用于判断「回到本月」按钮是否需要展示 */
const nowMonth = parseMonth('')

const title = computed(() => `${cursor.value.month}月, ${cursor.value.year}`)

const isCurrentMonth = computed(
  () => cursor.value.year === nowMonth.year && cursor.value.month === nowMonth.month,
)

/** 用 Date 做月份进位，省去 12 → 1 的边界判断 */
function shiftMonth(step) {
  const next = new Date(cursor.value.year, cursor.value.month - 1 + step, 1)
  cursor.value = { year: next.getFullYear(), month: next.getMonth() + 1 }
}

function backToToday() {
  cursor.value = { ...nowMonth }
}

function toDateKey(year, month, day) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

/** 只读取数据对象自有属性，避免拿到原型链上的同名键 */
function readRecordCount(key) {
  if (!Object.prototype.hasOwnProperty.call(props.records, key)) return 0
  const count = Number(props.records[key])
  return Number.isFinite(count) && count > 0 ? count : 0
}

/** 高亮日期：未显式传入时取系统当天 */
const highlightKey = computed(() => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(props.highlightDate)) return props.highlightDate
  const now = new Date()
  return toDateKey(now.getFullYear(), now.getMonth() + 1, now.getDate())
})

// 挂载即触发一次，父组件无需另外初始化当前月数据
watch(
  cursor,
  ({ year, month }) => {
    emit('month-change', `${year}-${String(month).padStart(2, '0')}`)
  },
  { immediate: true },
)

/**
 * 按真实历法排布：首尾补齐上/下月日期，凑成 7 的倍数后按周切分。
 * 补位日期也是真实日期，因此同样能显示记录（与设计稿一致）。
 */
const weeks = computed(() => {
  const { year, month } = cursor.value
  const firstWeekday = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()

  const total = Math.ceil((firstWeekday + daysInMonth) / 7) * 7
  const cells = []

  for (let index = 0; index < total; index += 1) {
    // 以本月 1 日为基准前后偏移，交给 Date 处理跨月与跨年
    const date = new Date(year, month - 1, index - firstWeekday + 1)
    const key = toDateKey(date.getFullYear(), date.getMonth() + 1, date.getDate())
    cells.push({
      key,
      day: date.getDate(),
      inMonth: date.getMonth() + 1 === month && date.getFullYear() === year,
      count: readRecordCount(key),
      isHighlighted: key === highlightKey.value,
    })
  }

  const result = []
  for (let start = 0; start < cells.length; start += 7) {
    result.push({ key: `week-${start}`, cells: cells.slice(start, start + 7) })
  }
  return result
})
</script>

<template>
  <div class="mood-calendar">
    <header class="cal-header">
      <button class="cal-nav" type="button" aria-label="上一个月" @click="shiftMonth(-1)">
        <span aria-hidden="true">‹</span>
      </button>
      <span class="cal-title" aria-live="polite">{{ title }}</span>
      <button class="cal-nav" type="button" aria-label="下一个月" @click="shiftMonth(1)">
        <span aria-hidden="true">›</span>
      </button>
      <!-- 翻月后提供回到本月的入口，避免用户手动翻回来 -->
      <button
        v-if="!isCurrentMonth"
        class="cal-today"
        type="button"
        @click="backToToday"
      >
        回到本月
      </button>
    </header>

    <div class="cal-row cal-weekdays">
      <span v-for="weekday in WEEKDAYS" :key="weekday">{{ weekday }}</span>
    </div>

    <div v-for="week in weeks" :key="week.key" class="cal-week">
      <div class="cal-row cal-dates">
        <div
          v-for="cell in week.cells"
          :key="cell.key"
          class="cal-date"
          :class="{ 'is-out': !cell.inMonth }"
        >
          <span class="cal-date-num" :class="{ 'is-highlighted': cell.isHighlighted }">
            {{ cell.day }}
          </span>
        </div>
      </div>

      <!-- 记录条带：第 n 行仅在当日记录数 ≥ n 时显示图标 -->
      <div v-for="slot in slotRows" :key="`${week.key}-slot-${slot}`" class="cal-row cal-slots">
        <div v-for="cell in week.cells" :key="`${cell.key}-${slot}`" class="cal-slot">
          <img v-if="cell.count >= slot" :src="recordIcon" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mood-calendar {
  border-radius: var(--radius-md);
  background: var(--color-white);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

/* 月份导航条 */
.cal-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-6);
  padding: var(--space-4);
  background: var(--color-primary-lightest);
}

/* 绝对定位，保证月份标题始终居中 */
.cal-today {
  position: absolute;
  right: var(--space-4);
  padding: var(--space-2) var(--space-4);
  border: none;
  border-radius: var(--radius-pill);
  background: var(--color-white);
  box-shadow: var(--shadow-sm);
  color: var(--color-primary-darkest);
  font-size: var(--font-size-sm);
  font-family: inherit;
  cursor: pointer;
  transition: opacity var(--transition-base);
}

.cal-today:hover {
  opacity: 0.75;
}

.cal-nav {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: var(--radius-md);
  background: var(--color-white);
  box-shadow: var(--shadow-sm);
  color: var(--color-primary-darkest);
  font-size: var(--font-size-lg);
  font-family: inherit;
  line-height: 1;
  cursor: pointer;
  transition: opacity var(--transition-base);
}

.cal-nav:hover {
  opacity: 0.75;
}

.cal-title {
  min-width: 140px;
  text-align: center;
  color: var(--color-primary-darkest);
  font-size: var(--font-size-md);
  font-weight: bold;
}

/* 七列网格：表头、日期行、条带行共用 */
.cal-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.cal-weekdays span {
  padding: var(--space-3) 0;
  text-align: center;
  color: var(--color-primary-darkest);
  font-size: var(--font-size-base);
  font-weight: bold;
}

.cal-date {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) 0;
  color: var(--color-text);
  font-size: var(--font-size-base);
}

/* 非本月日期：仅降低视觉权重，仍保持可读 */
.cal-date.is-out {
  color: var(--color-text-subtle);
}

.cal-date-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
}

.cal-date-num.is-highlighted {
  background: var(--color-today);
  color: var(--color-text);
  font-weight: bold;
}

.cal-slots {
  background: var(--color-primary-dark);
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
}

.cal-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
}

.cal-slot img {
  width: 14px;
  height: 14px;
}
</style>
