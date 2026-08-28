/**
 * 对话面板 mock 数据：初始对话记录
 */
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
