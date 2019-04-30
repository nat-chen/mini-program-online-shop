var util = require('./utils/util.js')
var api = require('./config/api.js')

App({
  onLauch: function() {
    this.login();
  },
  login: function() {
    var that = this;
    wx.login({
      success: function(res) {
        console.log(res);
        util.request(api.AuthLogin, {
          code: res.code, //code
          userInfo: infoRes.userInfo
        }, 'POST').then(function(res) {
          // 存入缓存与全局变量
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('userInfo', res.data.userInfo);
          that.globalData.userInfo = res.data.userInfo;
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  globalData: {
    userInfo: {
      nickname: '去登录',
      username: '',
      avatar: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png',
    }
  }
})