// pages/shouyi/shouyi.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     xs:0,
     tj:[],
     zc:{},
     zh:{},
     jyz:[]
  },
  qh:function(e){
    this.setData({
      xs: e.target.dataset.value
    })
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.xs == 0) {
      var that = this;
      // 我的推荐
      var url = app.globalData.comurl + "&m=Asset&a=tuijian", data = { token: app.globalData.token,openid: wx.getStorageSync('openid') }, method = 'post';
      app.ajaxData(url, data, method, function (res) {
        console.log(res)
        if (res.data.state == 10000) {
          if (res.data.data != null) {
            that.setData({
              tj: res.data.data
            })
          }
        } else {
          wx.showToast({
            title: res.data.messgae,
          })
        }
      })
    } else if (this.data.xs == 1) {
      var that = this;
      //我的资产
      var url = app.globalData.comurl + "&m=Heroes&a=my_use", data = { token: app.globalData.token, openid: wx.getStorageSync('openid') }, method = 'post';
      app.ajaxData(url, data, method, function (res) {
        console.log(res.data.data.users)
        if (res.data.state == 10000) {
          if (res.data.data != null) {
            that.setData({
              zc: res.data.data,
              zh: res.data.data.users
            })
          }
        } else {
          wx.showToast({
            title: res.data.messgae,
          })
        }
      })
    } else {
      var that = this;
      //经验值
      var url = app.globalData.comurl + "&m=Asset&a=index", data = { token: app.globalData.token, openid: wx.getStorageSync('openid')  }, method = 'post';
      app.ajaxData(url, data, method, function (res) {
        console.log(res)
        if (res.data.state == 10000) {
          if (res.data.data != null) {
            that.setData({
              jyz: res.data.data
            })
          }
        } else {
          wx.showToast({
            title: res.data.messgae,
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.setNavigationBarTitle({
      title: options.title,
    })
     this.setData({
       xs: options.xs
     })
     var that = this;
    if (options.xs==0){
      // 我的推荐
      var url = app.globalData.comurl + "&m=Asset&a=tuijian", data = { token: app.globalData.token, openid: wx.getStorageSync('openid') }, method = 'post';     
      app.ajaxData(url, data, method, function (res) {
        console.log(res.data.data)
        if (res.data.state == 10000) {
          if (res.data.data != null) {
            that.setData({
              tj: res.data.data
            })
          }
        } else {
          wx.showToast({
            title: res.data.messgae,
          })
        }
      })
    } else if (options.xs == 1){
      //我的资产
      var url = app.globalData.comurl + "&m=Asset&a=mymoney", data = { token: app.globalData.token, openid: wx.getStorageSync('openid')  }, method = 'post';
      app.ajaxData(url, data, method, function (res) {
        console.log(res)
        if (res.data.state == 10000) {
          if (res.data.data != null) {
            that.setData({
              zc: res.data.data
            })
          }
        } else {
          wx.showToast({
            title: res.data.messgae,
          })
        }
      })
    }else{
      //经验值
      var url = app.globalData.comurl + "&m=Asset&a=index", data = { token: app.globalData.token, openid: wx.getStorageSync('openid')  }, method = 'post';
      app.ajaxData(url, data, method, function (res) {
        console.log(res)
        if (res.data.state == 10000) {
          if (res.data.data != null) {
            that.setData({
              jyz: res.data.data
            })
          }
        } else {
          wx.showToast({
            title: res.data.messgae,
          })
        }
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
    var url2 = app.globalData.comurl + "&m=Heroes&a=team_name", data2 = { token: app.globalData.token, openid: wx.getStorageSync('openid') }, method = 'post';
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