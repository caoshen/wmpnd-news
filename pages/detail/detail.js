// pages/detail.js
const host = "https://test-miniprogram.com"
const detail = "/api/news/detail"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: '',
    id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let url = host + detail
    let id = options.id
    this.setData({
      id:id
    })
    console.log(url + ', ' + id)
    this.getNewsDetail(url, id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let url = host + detail
    this.getNewsDetail(url, this.data.id, () => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  convertUTCTimeToLocalTime: function(UTCTime) {
    if (!UTCTime) {
      return '-'
    }
    function formatStr(str) {
      return str > 9 ? str : '0' + str
    }
    let date2 = new Date(UTCTime)
    let hour = date2.getHours()
    hour = formatStr(hour)
    let minute = date2.getMinutes()
    minute = formatStr(minute)
    return hour + ":" + minute
  },
  getNewsDetail(url, id, callback) {
    wx.request({
      url: url,
      data: {
        id: id
      },
      success: res => {
        console.log(res.data.result)
        let result = res.data.result
        let utcTime = result.date;
        result.date = this.convertUTCTimeToLocalTime(utcTime)
        this.setData({
          detail: result
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  }
})