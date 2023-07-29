// pages/login/index.js
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
    wx.request({
      url: 'http://127.0.0.1:3000/login',
      data: postData,
      method: 'POST',
      success(res) {
        wx.hideLoading()
        let data = res.data
        if (data.code === -1) {
          wx.showToast({
            title: data.msg,
            icon: 'none'
          })
          return
        }
        wx.setStorageSync('token', data.data.cookie)
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
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }, 1000)
      }
    })
  },
  
  switchStatus() {
    this.setData({
      saveCount: !this.data.saveCount
    })
  },

  textCallback: function() {}
})