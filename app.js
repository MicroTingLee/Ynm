//app.js
App({
  onLaunch: function (options) {
  

    var that = this, url = that.globalData.comurl + "&m=Heroes&a=is_what", data = {}, method = 'post';

    that.ajaxData(url, data, method, function (res) {
      console.log(JSON.stringify(res))
      if (res.data == 1) {
        wx.setStorageSync('openid', 'oiT4K48EUvPHX4mWGzlrmw5Lgcjo');
        that.globalData.tel = '18362945754';
        that.globalData.userInfo = { "nickName": "小树苗", "gender": 2, "language": "zh_CN", "city": "南通", "province": "江苏", "country": "中国", "avatarUrl": "https: wx.qlogo.cnmmopenvi_32Q0j4TwGTfTLVXDichWibE4lDzcqXgewQyIL8Yl9sG3icicPxPF7H3oe3EZZlBP1332Urw73ddocmJNlg0HJSV8rYnA132" };
      } else {
        var userInfo = wx.getStorageSync('userInfo');
        var tel = wx.getStorageSync('tel');
        if (userInfo != "") {
          userInfo = JSON.parse(userInfo);
          that.globalData.userInfo = userInfo;
        }
        if (tel != "") {
          that.globalData.tel = tel;
        }
        if (wx.getStorageSync('openid') != '') {
          var url = that.globalData.comurl + "&m=Heroes&a=team_name", data = { token: that.globalData.token, openid: wx.getStorageSync('openid') }, method = 'post';
          var data1 = { token: that.globalData.token, openid: wx.getStorageSync('openid') }
          console.log(JSON.stringify(url))
          console.log(JSON.stringify(data1))
          that.ajaxData(url, data, method, function (res) {
            console.log(JSON.stringify(res))
            if (res.data.state == 10000) {
              if (res.data.data.status == 1) {
                that.globalData.tz = 1
              } else {
                that.globalData.tz = 0
              }
            } else {

            }
          })

        }
      }
    })
   

  },
  //ajax请求方法封装
  ajaxData: function (url, data, method, callBack) {
    var that = this;
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        //console.log(res);
        // setTimeout(function () {
        //   wx.hideLoading()
        // }, 500)
        callBack(res);
      },
      fail: function (res) {
        console.log(4)
        wx.showToast({
          title: '网络开了小差~',
        })
      },
      complete: function (res) {
        setTimeout(function () {
          wx.hideLoading()
        }, 200)
      }
    })
  },
  //上啦刷新
  onRefresh: function (obj) {
    var that = this;
    wx.showLoading({
      title: '刷新中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    obj.onLoad();
    wx.stopPullDownRefresh({
      complete: function (res) {
        wx.showLoading({
          title: '刷新中',
        })

        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      }
    })
  },
  //存储模板推送码
  dealfromId: function (formId) {
    if (formId == "the formId is a mock one") {
      return false;
    };
    this.globalData.fromIds = formId;
  },
  //判断空字符串
  isNull: function (str) {
    if (str == "") return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
  },
  //验证手机号
  isPoneAvailable: function (poneInput) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(poneInput)) {
      return false;
    } else {
      return true;
    }
  },
  //打开广告图的方法
  openAdver: function (e) {
    var url = e.currentTarget.dataset.a;
    if (url && url != "") {
      //https://mp.weixin.qq.com/s/-Miv4Q7y-Qw9rGcqKiIdQg
      wx.navigateTo({
        url: '/' + url
      })
    }

  },
  //联系客服
  callPhone: function () {
    if (!this.globalData.service_tel) {
      wx.showToast({
        title: '联系方式未设置',
      })
      return false;
    }
    wx.makePhoneCall({
      phoneNumber: this.globalData.service_tel, //仅为示例，并非真实的电话号码
      success: function (res) {

      },
      fail: function (res) {

      },
    })
  },
  globalData: {
    // userInfo: "{\"nickName\":\"小树苗\",\"gender\":2,\"language\":\"zh_CN\",\"city\":\"南通\",\"province\":\"江苏\",\"country\":\"中国\",\"avatarUrl\":\"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLVXDichWibE4lDzcqXgewQyIL8Yl9sG3icicPxPF7H3oe3EZZlBP1332Urw73ddocmJNlg0HJSV8rYnA/132\"}",
    userInfo:null,
    token: 'kfampl1551689516',//token值
    user_id: '',//用户id
    fromIds: [],
    tel:'',
    tz:0,
    openid_f:'',
    service_tel:'',
    imgurl: 'https://wt.lingdie.com/index.php?g=User',//接口域名
    comurl: 'https://wt.lingdie.com/index.php?g=User',//业务数据请求地址
    img: 'https://wt.lingdie.com/index.php',//业务数据请求地址
  },

})