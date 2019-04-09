// pages/zc/zc.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tdm:'',
    sjh:'',
    yzm:'',
    sj:'',
    sja:0,
    yzm1:'1111',
    // nichen:'',
    hh:1
  },
  //验证码
  yzmpd:function(e){
   this.setData({
     yzm:e.detail.value
   })
  },
  sjpd:function(e){
    if(e!=0){
      this.setData({
      sj:e,
      sja: 1
    })
      e--;
      var that = this;
      setTimeout(function () {
        that.sjpd(e);
      }, 1000)
    }else{
      this.setData({
        sj:'',
        sja: 0
      })
    }
  },
  hqyzm:function(){
    if (this.data.sjh==''){
      wx.showToast({
        title: '请填写手机号',
      })
      return
    }
    if (this.data.sjh.length != 11){
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
      })
      return
    }
    if (this.data.sjh.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
      })
      return
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(19[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
    if (!myreg.test(this.data.sjh)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      return
    }
    var time = 60;
    this.setData({
      sj:time,
      sja: 1
    })
    var that = this, url = app.globalData.comurl + "&m=Asset&a=send_code", data = { phone: that.data.sjh, openid: wx.getStorageSync('openid')}, method = 'post';
    app.ajaxData(url, data, method, function (res) {
      if (res.data.state == 10000) {
        that.setData({
          yzm1:res.data.data
        })

      } else {
        wx.showToast({
          title: res.data.message,
        })
      }
    })
    if(time!=0){
      that.sjpd(time);
    }else{
      that.setData({
        sj: '',
        sja: 0
      })
    }
  },
  //昵称判断
  // nichenpd: function (e){
  //   this.setData({
  //     nichen: e.detail.value
  //   })
  // },
  //团队报名判断
  tdmpd:function(e){
     this.setData({
        tdm:e.detail.value
     })
  },
  //手机号判断
  sjhpd:function(e){
    this.setData({
      sjh: e.detail.value
    })
  },
  // 提交信息
  tj:function(){
   if(this.data.tdm==''){
     wx.showToast({
       title: '请填写团队名',
     })
     return
   }
    if (this.data.nichen == '') {
      wx.showToast({
        title: '请填写昵称',
      })
      return
    }
    if (this.data.sjh == '') {
      wx.showToast({
        title: '请填写手机号',
      })
      return
    }
    if (this.data.sjh.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
      })
      return
    }
    if (this.data.sjh.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
      })
      return
    }

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(19[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
    if (!myreg.test(this.data.sjh)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      return
    }
    if (this.data.yzm==''){
      wx.showToast({
        title: '请获取验证码',
      })
      return
    }
    if (this.data.yzm1 == '') {
      wx.showToast({
        title: '请获取验证码',
      })
      return
    }
    if (this.data.yzm1 != this.data.yzm) {
      wx.showToast({
        title: '验证码不一致',
      })
      return
    }
    this.setData({
      hh:0
    })
    // 提交注册
    var that = this, url = app.globalData.comurl + "&m=Heroes&a=personal", data = { token: app.globalData.token, team: that.data.tdm,  tel: that.data.sjh, openid: wx.getStorageSync('openid') }, data1 = { token: app.globalData.token, openid: wx.getStorageSync('openid'), team: that.data.tdm, sname: that.data.nichen, tel: that.data.sjh }, method = 'post';
    // console.log(JSON.stringify(url))
    // console.log(JSON.stringify(data1))
    console.log(JSON.stringify(data))
    app.ajaxData(url, data, method, function (res) {
      console.log(res)
      if (res.data.state == 10000) {
        if(res.data.data.status=='1'){
          console.log(res.data.data.status);
          if (res.data.data.status_t=='1'){
            wx.showToast({
              title: '成为团长',
            })
          } else if (res.data.data.status_t == '2'){
            wx.showToast({
              title: '已驳回',
            })
          } else{
            wx.showToast({
              title: '待审核',
            })
          }
          setTimeout(function(){
              wx.reLaunch({
                url: '../grzx/grzx',
              })
          },1000)
        }
        //注册是否成为团长提示
        else if(res.data.data.status=='2' ){
          console.log(res.data.data)
           wx.showLoading({
          title: res.data.data.msg,
        })

        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
          // wx.showToast({
          //   title: res.data.data.msg,
          // })
       }
      } else {
        wx.showToast({
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
      title:'成为团长'
    })
   this.setData({
     sjh: app.globalData.tel,
   })
    console.log(JSON.stringify(app.globalData.tel))


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
