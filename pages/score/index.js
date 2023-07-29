// pages/score/index.js
import { getScoreListRequest, getRawScoreListRequest } from '../../api/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,  // 1为有效成绩，2为原始成绩
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList()
  },

  getList() {
    const that = this
    let p = null
    if (that.data.type === 1) {
      p = getScoreListRequest()
    } else {
      p = getRawScoreListRequest()
    }
    p.then(res => {
      console.log(res)
      that.setData({
        list: res.data
      })
    })
  }
})