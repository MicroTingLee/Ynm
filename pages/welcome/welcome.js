const app = getApp();

Page({
  data: {
    fromUrl: '',
    placeholder: "请授权手机号",
    telephone: "",
    disabled: true,
    openid_f:'',
    xs:1,
    xs1:1
  },
  onLoad: function (options) {
    if (options.openid_f != undefined){
      this.setData({
        fromUrl: options.fromUrl,
        openid_f: options.openid_f
      })
      app.globalData.openid_f = options.openid_f
    }else{
      this.setData({
        fromUrl: options.fromUrl,
      })
      app.globalData.openid_f = ''
    }
    
    this.checkSession();


  },
  //验证登录态
  checkSession: function () {
    var that = this;
    wx.checkSession({
      success: function () {
        //获取用户
        var session_key = wx.getStorageSync('session_key');
        if (session_key=='') {
          that.getLogin();
        }
      },
      fail: function () {
        that.getLogin();
      }
    })
  },
  //用户登录态信息
  getLogin: function () {
    wx.removeStorageSync('session_key');
    wx.removeStorageSync('openid');
    wx.login({
      success: function (res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var url = app.globalData.imgurl + "&m=Heroes&a=get_user",
            data = {
              token: app.globalData.token,
              code: res.code
            };
          app.ajaxData(url, data, 'POST', function (res) {
            console.log(res)
            if (res.data.state === 10000) {
              wx.setStorageSync('session_key', res.data.data.session_key);
              wx.setStorageSync('openid', res.data.data.openid);
            } else {
              wx.showToast({
                title: res.data.message,
              })
            }
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '获取code失败',
        })


      }
    })
  },
  //获取用户基本信息
  getUserInfo: function (e) {
    console.log(JSON.stringify(e))
    if (e.errMsg == "getUserInfo:fail auth deny") {
      return false;
    }
    if (e.detail.errMsg == "getUserInfo:ok") {
      var that = this, fromUrl = this.data.fromUrl, telephone = this.data.telephone;
      if (telephone == '') {
        wx.showToast({
          title: '请先授权手机号',
        })
        return false;
      }
      wx.showLoading({
        title: '登录中',
      })
      that.setData({
        xs: 2
      })
      if (wx.getStorageSync('openid_f')!=''){
        var url = app.globalData.comurl + "&m=Heroes&a=user_xinxi", data = { token: app.globalData.token, tel: telephone, user_xinxi: e.detail.rawData }, method = 'post';
      }else{
        var url = app.globalData.comurl + "&m=Heroes&a=user_xinxi", data = { token: app.globalData.token, tel: telephone, user_xinxi: e.detail.rawData }, method = 'post';
      }

      console.log(JSON.stringify(app.globalData.openid_f))
      app.ajaxData(url, data, method, function (res) {
        console.log(JSON.stringify(res))
      })
      wx.setStorageSync('userInfo', (e.detail.rawData));
      app.globalData.userInfo = JSON.parse(e.detail.rawData);
      app.globalData.tel = this.data.telephone;
              //为tabBar 的用wx.reLaunch  非tabBar用redirectTo
          if (fromUrl == 'index' || fromUrl == 'yxb' || fromUrl == 'zdzj' || fromUrl == 'grzx') {
            wx.reLaunch({
              url: "/pages/" + fromUrl + "/" + fromUrl
            })
          } else {
            wx.navigateBack({
              delta: 1
            })
          }
    }
    
  },
  // //存储formId并提交内容
  formSubmit: function (e) {
    let formId = e.detail.formId,
      type = e.detail.target.dataset.type;
    //存储fromId
    app.dealfromId(formId);
  },
  getPhoneNumber: function (e) {
    var session_key = wx.getStorageSync('session_key');
    if (session_key == '') {
      this.getLogin();
      return
    }
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      var that = this, url = app.globalData.imgurl + "&m=Heroes&a=get_phone_number",
        data = {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          sessionKey: wx.getStorageSync('session_key'),
          appid: 'wxfbde4f8ff6b8969c'
        };
      console.log(url)
        console.log(data)
      wx.showLoading({
        title: '',
      })
      app.ajaxData(url, data, 'POST', function (res) {
        console.log(res);
        wx.hideLoading();
        if (res.data.data.purePhoneNumber) {
          that.setData({
            telephone: res.data.data.purePhoneNumber,
            xs1:2
          })
          wx.setStorageSync('tel', (res.data.data.purePhoneNumber));
        } else {
          wx.showToast({
            title: '没有手机号'
          })
          wx.removeStorageSync('session_key');
          wx.removeStorageSync('openid');
          that.getLogin();
        }

      })
    }

  }
})