export default function createRequest(options) {
  return new Promise((resolve) => {
    const token = wx.getStorageSync('token')
    if (options.needLogin !== false && !token) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/login/index',
        })
      }, 1000)
      return
    }
    const baseUrl = 'http://127.0.0.1:3000'
    const url = `${baseUrl}${options.url}`
    const header = {
      token
    }
    let showLoading = false
    if (options.loading !== false) {
      showLoading = true
      wx.showLoading({
        title: '正在加载',
        mask: true
      })
    }
    wx.request({
      url,
      method: options.method || 'GET',
      timeout: options.timeout || 20000,
      header,
      data: options.data || {},
      success(res) {
        res = res.data
        switch (res.code) {
          case 0:
            return resolve(res)
          case -1:
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
            break;
          case 403:
            wx.showToast({
              title: '登录已失效，请重新登录',
              icon: 'none'
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/login/index',
              })
            }, 1000)
            break;
          default:
            wx.showToast({
              title: '服务器开小差啦！',
              icon: 'none'
            })
            break;
        }
      },
      fail() {
        wx.showToast({
          title: '服务器开小差啦！',
          icon: 'none'
        })
      },
      complete(res) {
        if (showLoading) {
          wx.hideLoading()
        }
      }
    })
  })
}