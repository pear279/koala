/**
 * 用户 / 个人资料 mock 数据
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
