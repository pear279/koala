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

/** 心情日历默认展示月份与高亮日期（对齐设计稿的 2025 年 5 月 / 18 日） */
export const calendarView = {
  month: '2025-05',
  today: '2025-05-18',
  /** 每周展示的记录槽位行数 */
  slotRows: 3,
  recordIcon: '/images/story/seed-alt.png',
}

/**
 * 心情记录数：key 为日期，value 为当日记录条数（0-3）。
 * 原型阶段的占位数据，接入接口后由「按月查询记录」的结果替换。
 */
export const calendarRecords = {
  '2025-04-28': 3, '2025-04-29': 1, '2025-04-30': 2,
  '2025-05-01': 3, '2025-05-02': 3, '2025-05-03': 2, '2025-05-04': 3,
  '2025-05-05': 3, '2025-05-06': 3, '2025-05-07': 2, '2025-05-08': 2,
  '2025-05-09': 2, '2025-05-10': 3, '2025-05-11': 3,
  '2025-05-12': 3, '2025-05-13': 2, '2025-05-14': 2, '2025-05-15': 1,
  '2025-05-16': 3, '2025-05-17': 3, '2025-05-18': 2,
  '2025-05-19': 3, '2025-05-20': 3, '2025-05-21': 3, '2025-05-22': 3,
  '2025-05-23': 3, '2025-05-24': 2, '2025-05-25': 2,
  '2025-05-26': 3, '2025-05-27': 2, '2025-05-28': 3, '2025-05-29': 2,
  '2025-05-30': 1, '2025-05-31': 3,
  '2025-06-01': 3,
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
