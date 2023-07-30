// pages/score/index.js
import { getScoreListRequest, getRawScoreListRequest } from '../../api/index'

const scoreCacheKey = "scores"
const rawScoreCacheKey = "rawScores"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,  // 1为有效成绩，2为原始成绩
    list: [],  // 成绩列表
    termIndex: 0  // 当前学期索引
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList()
  },

  getList() {
    const cache = wx.getStorageSync(this.data.type == 1 ? scoreCacheKey : rawScoreCacheKey)
    if (cache) {
      this.setData({
        list: cache
      })
      return
    }
    this.update()
  },

  // 刷新
  update() {
    const that = this
    let p = null
    if (that.data.type == 1) {
      p = getScoreListRequest()
    } else {
      p = getRawScoreListRequest()
    }
    p.then(res => {
      that.setData({
        list: res.data
      })
      wx.setStorageSync(that.data.type == 1 ? scoreCacheKey : rawScoreCacheKey, res.data)
    })
  },

  // 切换成绩类型
  changeScoreType(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      type
    })
    this.getList()
  },
  
  // 切换学期
  changeTerm(e) {
    const termIndex = e.detail.value
    this.setData({
      termIndex
    })
  }
})