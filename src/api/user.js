/**
 * 用户相关接口（原型阶段：模拟异步，数据来自 mocks/user）
 */
import { mockRequest } from './request'
import {
  currentUser,
  genderOptions,
  profileActions,
  userEmails,
  userProfile,
} from '@/mocks/user'

/** 获取当前用户 */
export function fetchCurrentUser() {
  return mockRequest(currentUser)
}

/** 获取个人资料表单初值 */
export function fetchUserProfile() {
  return mockRequest(userProfile)
}

/** 获取性别可选项 */
export function fetchGenderOptions() {
  return mockRequest(genderOptions)
}

/** 获取已绑定邮箱列表 */
export function fetchUserEmails() {
  return mockRequest(userEmails)
}

/** 获取个人中心操作项 */
export function fetchProfileActions() {
  return mockRequest(profileActions)
}
