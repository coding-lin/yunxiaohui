// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuId: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  
  login() {
    const postData = {
      stuId: this.data.stuId,
      password: this.data.password
    }
    wx.request({
      url: 'http://127.0.0.1:3000/login',
      data: postData,
      method: 'POST',
      success(res) {
        console.log(res)
        let data = res.data
        if (data.code === -1) {
          wx.showToast({
            title: data.msg,
            icon: 'none'
          })
          return
        }
        wx.setStorage('token', data.data.cookie)
        wx.showToast({
          title: '登录成功',
          icon: 'none'
        })
      }
    })
  },

  textCallback: function() {}
})