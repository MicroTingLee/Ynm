// pages/cwtz/cwtz.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     xs:1,
     hh:'',
  },
  //活动规则
  tzgz:function(){
    wx.navigateTo({
      url: '../tzgz/tzgz',
    })
  },
  //成为团长
  cwtz:function(){
    var that = this, url = app.globalData.comurl + "&m=Heroes&a=is_shenhe", data = {
      token: app.globalData.token, openid: wx.getStorageSync('openid') 
    }, method = 'post';
    app.ajaxData(url, data, method, function (res) {
      console.log(JSON.stringify(res))
      if(res.data.state==10000){
        if (res.data.data.status==3){
              wx.navigateTo({
              url: '../zc/zc',
            })
        } else if (res.data.data.status == 0){
          wx.showToast({
            title: '审核中',
          })
        } else if (res.data.data.status == 2) {
          wx.showToast({
            title: '已驳回',
          })
        }
      }else{
        wx.showLoading({
          title: res.data.message,
        })
      }


    })

   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    wx.setNavigationBarTitle({
      title: options.title,
    })
    if (options.title =='成为团长'){
       this.setData({
         xs:1
       })
    }else{
      this.setData({
        xs: 0
      })
      wx.showLoading({
        title: '加载中',
      })
      var that = this, url = app.globalData.comurl + "&m=Heroes&a=barcode", data = {
        scene: wx.getStorageSync('openid'), page: 'pages/index/index'
      }, method = 'post';
      app.ajaxData(url, data, method, function (res) {
        if (res.data.state == 10000) {
          if (res.data.data != null) {
            that.setData({
              hh: res.data.data
            })
          }
        } else {
          wx.showLoading({
            title: res.data.message,
          })
        }
        console.log(res.data)

      })
    }
    
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
    var url2 = app.globalData.comurl + "&m=Heroes&a=team_name", data2 = { token: app.globalData.token, openid: wx.getStorageSync('openid')  }, method = 'post';
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
  onShareAppMessage: function (res) {
    if (app.globalData.userInfo == '' || app.globalData.userInfo == 'null' || app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '../welcome/welcome?fromUrl=index'
      })
    }
    if (app.globalData.tz == 1) {
      if (res.from === 'button') {
        console.log("来自页面内转发按钮");
        console.log(res.target);
      }
      else {
        console.log("来自右上角转发菜单")
      }
      return {
        title: '我正在参加欧菲百团大战活动，快来组团走上人生巅峰！！！',
        path: '/pages/index/index?openid_f=' ,
        success: (res) => {
          console.log("转发成功", res);
        },
        fail: (res) => {
          console.log("转发失败", res);
        }
      }
    } else {
      if (res.from === 'button') {
        console.log("来自页面内转发按钮");
        console.log(res.target);
      }
      else {
        console.log("来自右上角转发菜单")
      }
      return {
        title: '我正在参加欧菲百团大战活动，快来组团走上人生巅峰！！！',
        path: '/pages/index/index',
        success: (res) => {
          console.log("转发成功", res);
        },
        fail: (res) => {
          console.log("转发失败", res);
        }
      }
    }


  }
})