// app.js
import localConfigs from './config'

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  },
  // 获取配置
  getConfig(key = '') {
    if (key === '') {
      return localConfigs
    }
    if (!localConfigs[key]) {
      console.warn(`${key} config is no exist`)
      return undefined
    }
    if (typeof localConfigs[key] === 'object' && typeof localConfigs[key] !== null) {
      const env = this.getConfig('env')
      return localConfigs[key][env]
    }
    return localConfigs[key]
  }
})
