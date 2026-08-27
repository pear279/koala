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

/**
 * 培育进度
 * 由设计稿截图 public/images/plant/growth-progress-0.png 还原。
 * 三栏：植物大图 / 资源栏（可领取的养护动作）/ 植物信息。
 */
export const growthPlant = {
  name: '我的瞬星草',
  image: '/images/plant/9.png',
  plantedAt: '2025年1月15日',
  moodTags: ['平静', '期待', '小确幸'],
  record: {
    /** 记录来源日期与当日序号 */
    date: '2025年5月18日',
    order: '最近一次记录',
    text: '今天的心情像一杯温热的柠檬水，平静的界面浅浅的甜。早起时阳光正好，窗外的绿植叶尖还挂着露珠，我看着它们，突然安心。上午还想着要接下来的工作会不会很难，可真正坐下来做的时候，一件件事反而顺畅地推进了。中午和同事聊了几句她的新剧追进度，分享了一些愉悦的关注，只有我愿意记着的小事情。傍晚回家的路上，路边不知名的小野花开了一整片，我停下来看了一会儿——原来快乐可以这么简单。',
  },
  stage: '幼苗阶段',
  /** 成长进度百分比 */
  progress: 25,
}

/**
 * 资源栏养护动作
 * available 为 true 表示今日可领取；amount 为可获得的资源量。
 */
export const growthActions = [
  { key: 'sun', label: '晒太阳', resource: '阳光', amount: 120, bar: '/images/sun-alt.png' },
  { key: 'water', label: '浇水', resource: '缓水', amount: 210, bar: '/images/water-alt.png' },
  { key: 'fertilizer', label: '施肥', resource: '肥料', amount: 300, bar: '/images/fertilizer-alt.png' },
]

/** 资源栏底部按钮 */
export const growthResourceButtons = [
  { key: 'task', label: '做任务领资源', enabled: true },
  { key: 'tomorrow', label: '明日可领资源', enabled: false },
]

/**
 * 我的种子 - 相关记录
 * 由设计稿截图 public/images/story/seed1.png 还原。
 */
export const seedRecords = [
  {
    id: 'rec-1',
    tag: '内心平静',
    date: '2025年5月19日',
    text: '清晨醒来时，情绪像一杯温水，不冷不热。窗外阳光透过窗帘缝隙洒进来，带着一丝暖意。我坐在床边发了一会儿呆，大脑还未完全清醒，但心里很平静。今天会怎样呢？没有特别的期待，也没有焦虑，只是任由时间慢慢流淌。这种状态很轻，像一片浮在水面的叶子，随波而动。或许平凡的日子就是这样，没有大起大落，却让人感到安稳。',
  },
  {
    id: 'rec-2',
    tag: '小小的成就感',
    date: '2025年5月11日',
    text: '终于完成了一项拖延很久的任务，长舒一口气。心里涌起一丝微妙的满足感，像踩在松软的沙滩上，脚步都轻快起来。虽然不是什么大事，但完成它的瞬间，仿佛打败了那个懒惰的自己。我奖励自己一块巧克力，甜味在舌尖化开，连空气都变得温柔。原来快乐可以这么简单，只要一点点坚持，就能点亮一整天。',
  },
  {
    id: 'rec-3',
    tag: '被自然治愈的瞬间',
    date: '2025年4月22日',
    text: '散步时，风吹过树叶，沙沙作响。我停下脚步，抬头看云慢慢飘过，形状不断变化。一只蝴蝶飞过，翅膀在阳光下闪着细碎的光。那一刻，所有烦恼都被按了静音键。大自然总是这样，无声无息地抚平情绪的褶皱。我深吸一口气，泥土和青草的味道钻进鼻腔，心里忽然变得很轻，很轻。',
  },
  {
    id: 'rec-4',
    tag: '突如其来的感动',
    date: '2025年4月10日',
    text: '下班路上，看到一位老人蹲在路边喂流浪猫。他动作很慢，猫咪却耐心等着，尾巴轻轻摇晃。这一幕莫名让我鼻子一酸。世界有时很残酷，但总有些微小的善意，像暗夜里的萤火，照亮某个角落。我站在远处看了一会儿，心里某个地方悄悄软化了。原来感动不需要惊天动地，一瞬间的温柔就足够。',
  },
  {
    id: 'rec-5',
    tag: '与人相处的温暖',
    date: '2025年5月19日',
    text: '和朋友聊天时，笑声像气泡水一样不断冒出来。明明只是闲聊，却让人感到无比放松。她讲着生活中的琐事，我随意附和，偶尔吐槽，时间就这样悄悄溜走。分别时，心里暖暖的，像捧着一杯刚泡好的热茶。原来人与人之间的联结，不需要多么深刻，只要真诚，就能让平凡的日子发光。',
  },
]

/**
 * 我的种子 - 右侧入口卡
 * 插画由 seed1.png 裁切得到（见 public/images/seed/），标题改为真实文本渲染。
 */
export const seedEntries = [
  { key: 'chest', title: '种子宝箱', image: '/images/seed/treasure-chest.png' },
  { key: 'blessing', title: '添加祈福', image: '/images/seed/blessing.png' },
]

/**
 * 我的种子 - 底部模式卡
 * 图标为纯白线稿，改用内联 SVG（见 SeedPage.vue），不再依赖位图切片。
 */
export const seedModes = [
  { key: 'co-planting', title: '合种模式' },
  { key: 'gifting', title: '赠送模式' },
]
