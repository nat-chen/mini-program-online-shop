var api = require('../../../config/api.js')
var app = getApp()

Page({
  data: {
    username: '',
    password: '',
    confirmPassword: '',
    code: '',
    loginErrorCount: 0,
  },
  onLoad: function(options) {

  },
  onReady: function() {

  },
  onShow: function() {

  },
  onHide: function() {

  },
  onUnload: function() {

  },
  startRegister: function() {
    var that = this;
    if (that.data.password.length < 3 || that.data.username.length < 3) {
      wx.showModal({
        title: '错误信息',
        content: '用户和密码不得少于 3 位',
        showCancel: false,
      });
      return false;
    }
    if (that.data.password != that.data.confirmPassword) {
      wx.showModal({
        title: '错误信息',
        content: '确认密码不一致',
        showCancel: false,
      });
      return false;
    }

    wx.request({
      url: api.apiRootUrl + 'auth/register',
      data: {
        username: that.data.username,
        password: that.data.password
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.code === 200) {
          that.setData({
            'loginErrorCount': 0
          });
          wx.setStorage({
            key: 'token',
            data: res.data.data.token,
            success: function() {
              wx.switchTab({
                url: '/pages/ucenter/index/index'
              });
            }
          })
        }
        console.log(res.data.data.token);
      }
    });
  },
  bindUsernameInput: function(event) {
    this.setData({
      username: event.detail.value
    })
  },
  bindPasswordInput: function(event) {
    this.setData({
      password: event.detail.value
    });
  },
  bindConfirmPasswordInput: function(event) {
    this.setData({
      confirmPassword: event.detail.value,
    });
  },
  bindCodeInput: function(event) {
    this.setData({
      code: event.detail.value
    });
  },
  clearInput: function (e) {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: ''
        });
        break;
      case 'clear-password':
        this.setData({
          password: ''
        });
        break;
      case 'clear-confirm-password':
        this.setData({
          confirmPassword: ''
        });
        break;
      case 'clear-code':
        this.setData({
          code: ''
        });
        break;
    }
  }
})