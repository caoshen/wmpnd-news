//index.js
//获取应用实例
const app = getApp()
const host = "https://test-miniprogram.com"
const news = "/api/news/list"

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    newsList: [],
    activeIndex: 0,
    newsType: ['gn', 'gj', 'cj', 'yl', 'js', 'ty', 'other'],
    newsTypeName: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他']
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getNewsList()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showList: function(result) {
    console.log(result)
    let newsList = []
    let len = result.length
    for (var i = 0; i < len; ++i) {
      let date = result[i].date
      result[i].date = this.convertUTCTimeToLocalTime(date)
      newsList.push(result[i]);
    }
    this.setData({
      newsList: newsList
    })
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
  bindTapIndex: function(event) {
    let activeIndex = event.currentTarget.dataset.navIndex
    this.setData({
      activeIndex: activeIndex
    })
    this.getNewsList()
  },
  getNewsList: function(callback) {
    let url = host + news
    let typeList = this.data.newsType
    let type = typeList[this.data.activeIndex]
    console.log(url + ', ' + type)
    wx.request({
      url: url,
      data: {
        type: type
      },
      success: res => {
        console.log(res.data)
        let result = res.data.result;
        this.showList(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  bindTapId: function(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },
  onPullDownRefresh() {
    this.getNewsList(() => {
        wx.stopPullDownRefresh()
    })
  },
})
