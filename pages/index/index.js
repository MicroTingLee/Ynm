var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data:{
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        imgUrls: [],
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 500,
        imgs_shou: [],
        img_zuo: {},
        img_zhong: {},
        img_you: {},
        img_xia: {},
        img_zuo1: {},
        list_yhq: {},
        img_zuo_x_n: {},
        img_zuo_x: {},
        xs: 0,
        hh: '',
        hh1: 1,
    },

    //领取优惠券
    lq: function(e) {
        var url1 = app.globalData.comurl + "&m=Asset&a=ling",
            data11 = { token: app.globalData.token, id: e.target.dataset.id, openid: wx.getStorageSync('openid') },
            method = 'post',
            that = this;
        app.ajaxData(url1, data11, method, function(res) {
            if (res.data.state == 10000) {
                that.setData({
                    xs: 0,
                })
                wx.showLoading({
                    title: '领取成功'
                }, 1000)

            }
        })
    },
     //点击二维码
    ewm: function() {
        var that = this,
            url = app.globalData.comurl + "&m=Heroes&a=is_shenhe",
            data = {
                token: app.globalData.token,
                openid: wx.getStorageSync('openid'),
                openid_f:app.globalData.openid_f
            },
            method = 'post';
        app.ajaxData(url, data, method, function(res) {
            console.log(res.data)
            if (res.data.state == 10000) {
                if (res.data.data.status == 3) {
                    wx.showModal({
                        title: '提示',
                        content: '成为团长才能生成二维码',
                        success: function(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            } else {
                                console.log('用户点击取消')
                            }

                        }
                    })
                } else if (res.data.data.status == 1) {
                    wx.showLoading({
                        title: '加载中',
                    })
                    var url = app.globalData.comurl + "&m=Heroes&a=barcode",
                        data = {
                        scene: wx.getStorageSync('openid'),
                        page: 'pages/index/index',
                            tel: app.globalData.tel,
                            token: app.globalData.token,
                            // openid: wx.getStorageSync('openid'),
                            openid_f:app.globalData.openid_f
                        },
                        method = 'post';
                    app.ajaxData(url, data, method, function(res) {
                        if (res.data.state == 10000) {
                            if (res.data.data != null) {
                                that.setData({
                                    hh: res.data.data,
                                    hh1: 2
                                })
                            }
                        } else {
                            wx.showLoading({
                                title: res.data.message,
                            })
                        }


                    })
                } else if (res.data.data.status == 0) {
                    wx.showModal({
                        title: '提示',
                        content: '您的成为团长正在审核中',
                        success: function(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            } else {
                                console.log('用户点击取消')
                            }

                        }
                    })
                } else if (res.data.data.status == 2) {
                    wx.showModal({
                        title: '提示',
                        content: '您的成为团长已驳回',
                        success: function(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            } else {
                                console.log('用户点击取消')
                            }

                        }
                    })
                }
            } else {
                wx.showLoading({
                    title: res.data.message,
                })
            }
        })
    },
    //关闭二维码的页面
    gba: function() {
        this.setData({
            hh1: 1
        })
    },
      //关闭优惠券
    gb: function() {
        this.setData({
            xs: 0,
        })
    },
    tz: function(e) {

        wx.navigateTo({
            url: '../sy_xq/sy_xq?id=' + e.target.dataset.id,
        })
    },
    tz1: function(e) {

        wx.navigateTo({
            url: '../sy_xq/sy_xq?id=' + e.target.dataset.id,
        })
    },
    tz2: function(e) {

        wx.navigateTo({
            url: '../sy_xq/sy_xq?id=' + e.target.dataset.id,
        })
    },
    tz3: function(e) {

        wx.navigateTo({
            url: '../sy_xq/sy_xq?id=' + e.target.dataset.id,
        })
    },
    tz4: function(e) {

        wx.navigateTo({
            url: '../sy_xq/sy_xq?id=' + e.target.dataset.id,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
onLoad: function (option) {
 option.openid_f = 'oP3770ae4ZXZTmTfByXboNRhcab4'

        wx.showLoading({
            title: '加载中'
        })
        var that = this,
            url = app.globalData.comurl + "&m=Heroes&a=is_what",
            data = { token: app.globalData.token, tel: app.globalData.tel,openid: wx.getStorageSync('openid'),openid_f:app.globalData.openid_f},
            method = 'post';

        app.ajaxData(url, data, method, function(res) {
            if (res.data == 1) {
                wx.setStorageSync('openid', 'oiT4K48EUvPHX4mWGzlrmw5Lgcjo');
                app.globalData.tel = '18362945754';
                app.globalData.userInfo = { "nickName": "小树苗", "gender": 2, "language": "zh_CN", "city": "南通", "province": "江苏", "country": "中国", "avatarUrl": "https: wx.qlogo.cnmmopenvi_32Q0j4TwGTfTLVXDichWibE4lDzcqXgewQyIL8Yl9sG3icicPxPF7H3oe3EZZlBP1332Urw73ddocmJNlg0HJSV8rYnA132" };

            } else {

                if (option.scene) {
                    const scene = decodeURIComponent(option.scene);
                    if (scene != null && scene != 'undefined') {
                        option.openid_f = scene;
                        wx.setStorageSync('openid_f', option.openid_f);
                    }
                }
                if (option.openid_f != null && option.openid_f != 'undefined') {
                    if (app.globalData.userInfo == '' || app.globalData.userInfo == 'null' || app.globalData.userInfo == null) {
                        wx.navigateTo({
                            url: '../welcome/welcome?fromUrl=index&openid_f=',
                        })
                    }
                    wx.showLoading({
                        title: '加载中',
                    })

                    var url1 = app.globalData.comurl + "&m=Heroes&a=user_xinxi",
                        data11 = { token: app.globalData.token, tel: app.globalData.tel, user_xinxi: JSON.stringify(app.globalData.userInfo), openid: wx.getStorageSync('openid'),openid_f:app.globalData.openid_f},
                        method = 'post';
                    app.ajaxData(url1, data11, method, function(res) {

                    })
                    var url = app.globalData.comurl + "&m=Heroes&a=index",
                        data = { token: app.globalData.token, openid: wx.getStorageSync('openid'), openid_f:app.globalData.openid_f},
                        method = 'post';
                    app.ajaxData(url, data, method, function(res) {
                        if (res.data.state == '10000') {
                            if (res.data.data != null) {
                                if (res.data.data.imgs_shou != 'null') {
                                    that.setData({
                                        imgs_shou: []
                                    })
                                    that.setData({
                                        imgs_shou: res.data.data.imgs_shou
                                    })
                                }
                                if (res.data.data.img_zuo != 'null') {
                                    that.setData({
                                        img_zuo: res.data.data.img_zuo
                                    })
                                }
                                if (res.data.data.img_zhong != 'null') {
                                    that.setData({
                                        img_zhong: res.data.data.img_zhong
                                    })
                                }
                                if (res.data.data.img_you != 'null') {
                                    that.setData({
                                        img_you: res.data.data.img_you
                                    })
                                }
                                if (res.data.data.img_xia != 'null') {
                                    that.setData({
                                        img_xia: res.data.data.img_xia
                                    })
                                }
                                if (res.data.data.img_zuo_x != 'null') {
                                    that.setData({
                                        img_zuo_x: res.data.data.img_zuo_x
                                    })
                                }
                                if (res.data.data.img_zuo_x_n != 'null') {
                                    var detail_img = res.data.data.img_zuo_x_n.intro;
                                    WxParse.wxParse('article', 'html', detail_img, that, 5);
                                }
                            }
                        } else {
                            wx.showLoading({
                                title: res.data.message,
                            })
                        }

                    })

                } else {
                    if (app.globalData.userInfo == '' || app.globalData.userInfo == 'null' || app.globalData.userInfo == null) {
                        wx.navigateTo({
                            url: '../welcome/welcome?fromUrl=index'
                        })
                    }
                    wx.showLoading({
                        title: '加载中',
                    })
                    var url = app.globalData.comurl + "&m=Heroes&a=index",
                        data = { token: app.globalData.token, openid: wx.getStorageSync('openid'),openid_f:app.globalData.openid_f},
                        method = 'post';
                    app.ajaxData(url, data, method, function(res) {
                      // console.log(res.data.data)
                        if (res.data.state == '10000') {

                            if (res.data.data != null) {
                                if (res.data.data.imgs_shou != 'null') {
                                    that.setData({
                                        imgs_shou: []
                                    })
                                    that.setData({
                                        imgs_shou: res.data.data.imgs_shou
                                    })
                                }
                                if (res.data.data.img_zuo != 'null') {
                                    that.setData({
                                        img_zuo: res.data.data.img_zuo
                                    })
                                }
                                if (res.data.data.img_zhong != 'null') {
                                    that.setData({
                                        img_zhong: res.data.data.img_zhong
                                    })
                                }
                                if (res.data.data.img_you != 'null') {
                                    that.setData({
                                        img_you: res.data.data.img_you
                                    })
                                }
                                if (res.data.data.img_xia != 'null') {
                                    that.setData({
                                        img_xia: res.data.data.img_xia
                                    })
                                }
                                if (res.data.data.img_zuo_x != 'null') {
                                    that.setData({
                                        img_zuo_x: res.data.data.img_zuo_x
                                    })
                                }
                                if (res.data.data.img_zuo_x_n != 'null') {
                                    var detail_img = res.data.data.img_zuo_x_n.intro;
                                    WxParse.wxParse('article', 'html', detail_img, that, 5);
                                }
                            }
                        } else {
                            wx.showLoading({
                                title: res.data.message,
                            })
                        }
                    })
                }
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
         var url2 = app.globalData.comurl + "&m=Heroes&a=team_name",
            data2 = { token: app.globalData.token, openid: wx.getStorageSync('openid'),openid_f:app.globalData.openid_f},
            method = 'post';
        app.ajaxData(url2, data2, method, function(res) {

            if (res.data.state == 10000) {
                if (res.data.data.status == 1) {
                    app.globalData.tz = 1
                } else {
                    app.globalData.tz = 0
                }
            } else {

            }
        })

        //优惠券判断
        var url1 = app.globalData.comurl + "&m=Asset&a=first",
            data11 = { token: app.globalData.token, openid: wx.getStorageSync('openid')},
            method = 'post',
            that = this;
        app.ajaxData(url1, data11, method, function(res) {
            if (res.data.state == 10000) {
                if (res.data.data != '') {
                    that.setData({
                        list_yhq: res.data.data,
                        xs: 1
                    })
                } else {
                    that.setData({
                        xs: 0
                    })
                }

            } else {
                that.setData({
                    xs: 0
                })
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

        wx.showLoading({
          title: '加载中',
        })

        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角转发
     */
   onShareAppMessage: function (res) {
    if (app.globalData.userInfo == '' || app.globalData.userInfo == 'null' || app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '../welcome/welcome?fromUrl=index'
      })
    }
    if (app.globalData.tz==1){
      if (res.from === 'button') {
        // console.log(res.target)
      }
      else {
        // console.log(res.target)
      }
      return {
        title: '我正在参加欧菲百团大战活动，快来组团走上人生巅峰！！！',
        path: '/pages/index/index?openid_f=' + wx.getStorageSync('openid'),
        success: (res) => {
          console.log("转发成功", res);
        },
        fail: (res) => {
          console.log("转发失败", res);
        }
      }
    }else{
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


  },


    /**
     * 页面滚动触发事件的处理函数
     */
    onPageScroll: function () {

    },

    /**
     * 当前是 tab 页时，点击 tab 时触发
     */
    onTabItemTap: function(item) {

    },
})
