/**
 * 演示数据
 * 原型阶段的占位内容，接入真实接口后整体替换本文件即可。
 */

/** 当前用户 */
export const currentUser = {
  name: 'Amanda',
  email: 'alexara@gmail.com',
  avatar: '/images/avatar-user.jpg',
}

/** 个人资料表单字段初值 */
export const userProfile = {
  nickname: '',
  gender: '女',
  phone: '',
}

/** 性别可选项 */
export const genderOptions = ['女', '男', '不愿透露']

/** 已绑定邮箱 */
export const userEmails = [
  { id: 1, address: 'alexara@gmail.com', boundAt: '一个月前' },
]

/**
 * 个人中心操作项
 * primary 为 false 表示暂未开放（对应设计稿中的浅灰置灰态）
 */
export const profileActions = [
  { key: 'vip', label: '升级VIP', enabled: false },
  { key: 'checkin', label: '点击签到', enabled: true },
  { key: 'invite', label: '邀请好友', enabled: true },
  { key: 'settings', label: '设置', enabled: true },
]

/** 养成资源进度：数值单一来源，标签文字由数值推导，不再两处硬编码 */
export const resources = [
  { key: 'sun', label: '阳光', value: 50, icon: '/images/sun.png' },
  { key: 'water', label: '水', value: 60, icon: '/images/water.png' },
  { key: 'fertilizer', label: '肥料', value: 40, icon: '/images/fertilizer.png' },
]

/** 今日幸运花语 */
export const luckyFlower = {
  quote: '即使黑夜再长，你的光芒也会如晨露般温柔绽放，让每一寸时光都染上希望',
  name: '蓝风铃',
}

/** AI 性格（MBTI） */
export const personalities = [
  { code: 'ENFJ', trait: '共情天赋', avatar: '/images/enfj.png' },
  { code: 'ENTP', trait: '胡言乱语', avatar: '/images/entp.png' },
  { code: 'ENFP', trait: '古灵精怪', avatar: '/images/enfp.png' },
]

/** 初始对话记录 */
export const initialMessages = [
  {
    id: 1,
    role: 'ai',
    identity: 'ENFJ',
    avatar: '/images/enfj.png',
    text: '今天有什么特别的心情想记录下来吗？可以是开心的瞬间，或是让你有些在意的小情绪~',
    tags: [],
  },
  {
    id: 2,
    role: 'user',
    identity: '用户',
    avatar: '/images/avatar-user.jpg',
    text: '早上通勤时看到路边的花开得很好，突然觉得心情明亮起来了',
    tags: [],
  },
  {
    id: 3,
    role: 'ai',
    identity: 'ENFJ',
    avatar: '/images/enfj.png',
    text: '你的感受真美好呢！那些绽放的花朵就像城市悄悄准备的惊喜，用一抹色彩温柔地打断了忙碌的节奏。这种不期而遇的治愈感，像是生活在对你说「今天也请好好享受哦」。要记得把这份心动存在心里，它会在某个阴天悄悄发芽的~要试试给这种心情取个名字吗？比如「樱花加油站」？',
    tags: ['愉悦', '温暖', '小确幸'],
  },
]

/** 植物图鉴 */
export const plants = [
  { id: 1, name: '瞬星草', image: '/images/plant/1.png', unlocked: true },
  { id: 2, name: '雷纹凤凰花', image: '/images/plant/2.png', unlocked: true },
  { id: 3, name: '黯洛兰', image: '/images/plant/3.png', unlocked: true },
  { id: 4, name: '守夜葵', image: '/images/plant/4.png', unlocked: true },
  { id: 5, name: '泪铃木', image: '/images/plant/5.png', unlocked: true },
  { id: 6, name: '朝颜藤', image: '/images/plant/6.png', unlocked: true },
  { id: 7, name: '待解锁', image: '/images/plant/7.png', unlocked: false },
  { id: 8, name: '待解锁', image: '/images/plant/8.png', unlocked: false },
]

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

/**
 * 消息中心分组
 * 由设计稿截图 public/images/news/messages.png 还原：
 * 三组消息（系统 / 互动 / 社区反馈），每条为「类型徽章 + 文案 + 相对时间」。
 * minutesAgo 为距当前时间的分钟数，时间文案在页面上按当前时间实时推导，
 * 避免像原截图那样把「1个小时前」写死。
 */
export const messageGroups = [
  {
    key: 'system',
    title: '系统与资源',
    items: [
      { id: 'sys-1', badge: '系统通知', text: '您的温柔草已进入成长期！', minutesAgo: 60 },
      { id: 'sys-2', badge: '种子宝箱', text: '您有新的种子掉落，快去领取！', minutesAgo: 180 },
      { id: 'sys-3', badge: '领取资源', text: '您有200肥料未领取！', minutesAgo: 60 * 26 },
    ],
  },
  {
    key: 'social',
    title: '好友互动',
    items: [
      {
        id: 'social-1',
        badge: '【合种】森林伙伴',
        text: '您的朋友邀请您合种“520爱心树”！',
        minutesAgo: 40,
      },
      { id: 'social-2', badge: '【传话】', text: '您收到一封来自合种伙伴的传话！', minutesAgo: 2 },
      { id: 'social-3', badge: '【赠送】', text: '您的朋友已确认接收【赠送种子】！', minutesAgo: 60 * 30 },
    ],
  },
  {
    key: 'feedback',
    title: '社区反馈',
    items: [
      { id: 'fb-1', badge: '点赞', text: '您收到了新的点赞！', minutesAgo: 7 },
      { id: 'fb-2', badge: '收藏', text: '有人收藏了您的评论！', minutesAgo: 20 },
      { id: 'fb-3', badge: '评论', text: '您的社区故事收到了新评论！', minutesAgo: 5 },
    ],
  },
]
