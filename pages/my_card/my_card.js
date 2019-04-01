// pages/my_card/my_card.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wei:[],
    yi:[],
    guo:[],
    ling:[],
    list:[],
    xs:0
  },
  qh: function (e) {
    this.setData({
      xs: e.target.dataset.value
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     wx.setNavigationBarTitle({
       title: '我的券包',
     })
     wx.showLoading({
       title: '加载中',
     })
    var that = this, url = app.globalData.comurl + "&m=Asset&a=card", data = { token: app.globalData.token}, method = 'post';
    app.ajaxData(url, data, method, function (res) {
      console.log(JSON.stringify(res))
      if (res.data.state == 10000) {
         if(res.data.data.wei!=null){
           that.setData({
             wei: res.data.data.wei
           })
         }
        if (res.data.data.yi != null) {
          that.setData({
            yi: res.data.data.yi
          })
        }
        if (res.data.data.guo != null) {
          that.setData({
            guo: res.data.data.guo
          })
        }
        if (res.data.data.ling != null) {
          that.setData({
            ling: res.data.data.ling
          })
        }
      } else {
        wx.showToast({
          title: res.data.message,
        })
      }
    })
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
    var url2 = app.globalData.comurl + "&m=Heroes&a=team_name", data2 = { token: app.globalData.token }, method = 'post';
    app.ajaxData(url2, data2, method, function (res) {
      console.log(JSON.stringify(res))
      if (res.data.state == 10000) {
        if (res.data.data.status == 1) {
          app.globalData.tz = 1
        } else {
          app.globalData.tz = 0
        }
      } else {

      }
    })
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

  }
})