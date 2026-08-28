/**
 * 用户 / 个人资料状态
 */
import { defineStore } from 'pinia'
import {
  fetchCurrentUser,
  fetchGenderOptions,
  fetchProfileActions,
  fetchUserEmails,
  fetchUserProfile,
} from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
    profile: null,
    genderOptions: [],
    emails: [],
    profileActions: [],
    loaded: false,
  }),

  actions: {
    /** 拉取个人资料相关数据，重复调用只请求一次 */
    async load() {
      if (this.loaded) return
      const [currentUser, profile, genderOptions, emails, profileActions] = await Promise.all([
        fetchCurrentUser(),
        fetchUserProfile(),
        fetchGenderOptions(),
        fetchUserEmails(),
        fetchProfileActions(),
      ])
      this.currentUser = currentUser
      this.profile = profile
      this.genderOptions = genderOptions
      this.emails = emails
      this.profileActions = profileActions
      this.loaded = true
    },

    /** 新增邮箱：原型阶段以当前主邮箱占位，接入接口后替换为真实流程 */
    addEmail() {
      const address = this.currentUser?.email
      if (!address) return
      // 去重：同一地址不重复绑定
      if (this.emails.some((mail) => mail.address === address)) return

      this.emails.push({
        id: Date.now(),
        address,
        boundAt: '刚刚',
      })
    },
  },
})
