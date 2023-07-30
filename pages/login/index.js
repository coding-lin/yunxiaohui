// pages/login/index.js
import { loginRequest } from '../../api/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuId: '',
    password: '',
    saveCount: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initAccount()
  },

  /**
   * 初始化账号
   */
  initAccount() {
    const accountCache = wx.getStorageSync('account')
    if (accountCache) {
      this.setData({
        ...accountCache
      })
    }
  },
  
  /**
   * 登录
   */
  login() {
    const that = this;
    const postData = {
      stuId: that.data.stuId,
      password: that.data.password
    }
    wx.showLoading({
      title: '登录中',
    })
    loginRequest(postData).then(res => {
      console.log(res)
      wx.hideLoading()
        if (res.code === -1) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          return
        }
        wx.setStorageSync('token', res.data.cookie)
        if (that.data.saveCount) {
          wx.setStorageSync('account', postData)
        } else {
          wx.removeStorageSync('account')
        }
        wx.showToast({
          title: '登录成功',
          icon: 'none'
        })
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }, 1000)
    })
  },
  
  switchStatus() {
    this.setData({
      saveCount: !this.data.saveCount
    })
  },

  textCallback: function() {}
})