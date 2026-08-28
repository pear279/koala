/**
 * 我的森林 mock 数据：植物图鉴 + 培育进度
 */

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

/**
 * 培育进度
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
