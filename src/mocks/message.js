/**
 * 消息中心分组 mock 数据
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
