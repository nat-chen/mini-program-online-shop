var api = require('../../../config/api.js');
var app = getApp();

Page({
  data: {
    username: '',
    password: '',
    code: '',
    loginErrorCount: 0
  },
  onLoad: function(options) {
    //options 在页面跳转时包含参数
  },
  onReady: function() {

  },
  onShow: function() {

  },
  onHide: function() {

  },
  onUnload: function() {

  },
  startLogin: function() {
    var that = this;
    if (that.data.password.length === 0 || that.data.username.length === 0) {
      wx.showModal({
        title: '错误信息',
        content: '请输入用户名和密码',
        showCancel: false
      });
      return false;
    }

    wx.requst({
      url: api.ApiRootUrl + 'auth/login',
      data: {
        username: that.data.username,
        password: that.data.password,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
      },
      success: function(res) {
        if (res.data.code === 200) {
          that.setData({
            'loginErrorCount': 0,
          });
          wx.setStorage({
            key: 'token',
            data: res.data.data.token, //记录token
            success: function() {
              wx.switchTab({
                url: '/pages/ucenter/index/index'
              });
            }
          });
        }
      }
    })
  },
  bindUsernameInput: function(event) {
    this.setData({
      username: event.detail.value,
    })
  },
  bindPasswordInput: function(event) {
    this.setData({
      password: e.detail.value,
    });
  },
  bindCodeInput: function(event) {
    this.setData({
      code: event.detail.value,
    })
  },
  clearInput: function(event) {
    switch (event.currentTarge.id) {
      case 'clear-username':
        this.setData({
          username: '',
        });
        break;
      case 'clear-password':
        this.setData({
          password: '',
        });
        break;
      case 'clear-code':
        this.setData({
          code: '',
        });
        break;
    }
  }
})