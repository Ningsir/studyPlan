import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'

const api = require("../../config/api")

Page({

  data: {
    userinfo: {},
    hasLogined: false,
    logining: false,
    userId: ''
  },
  onLoad: function (options) {
    // console.log(wx.getStorageSync('hasLogined'))
    if (wx.getStorageSync('hasLogined')) {
      this.setData({
        hasLogined: true
      })
      this.setData({
        userId: wx.getStorageSync('userId')
      })
    }
  },
  onShow: function () {
    this.setData({
      userinfo: wx.getStorageSync('userInfo')
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '学习养成计划',
      target: '/pages/index/index'
    }
  },
  handleGetUserInfo(e) {
    const {
      userInfo
    } = e.detail;
    this.setData({
      logining: true
    })
    // this.setData({
    //   userinfo
    // })
    let that = this
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code)
          // let _data = userInfo
          // _data['code'] = res.code
          wx.request({
            url: api.login, //仅为示例，并非真实的接口地址
            data: {
              "code": res.code,
              "userInfo": userInfo
            },
            method: "POST",
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if (res.statusCode === 200) {
                that.setData({
                  userinfo: userInfo,
                  hasLogined: true,
                  logining: false
                })
                // 本地缓存token、userInfo、是否登陆的信息
                wx.setStorageSync('token', res.data)
                wx.setStorageSync('userInfo', userInfo);
                wx.setStorageSync('hasLogined', true)
                Toast.success("登录成功")
              }
              if (res.statusCode != 200) {
                Toast.fail("登录失败")
              }
            },
            fail(err) {
              Toast.fail(err)
            }
          })
        } else {
          console.log('登录失败' + res.errMsg)
        }
      }
    })
  },

  /**
   * 退出登录
   */
  logout() {
    let that = this
    wx.clearStorage({
      success: (res) => {
        that.setData({
          userinfo: {},
          hasLogined: false
        })
        Toast.success("退出成功")
        wx.redirectTo({
          url: '/pages/login/login',
        })
      },
      fail: (err) => {
        Toast.fail("退出失败")
      }
    })
  },
  /**
   * 注销账户
   */
  deleteUser(){
    let that = this
    Dialog.confirm({
      title: '注销账号',
      message: '该操作会删除用户所有信息，确定要注销吗？',
      zIndex: 999
    })
    .then(() => {
      that.deleteUserById(that.data.userId)
    })
    .catch(() =>{
      // cancel 
    })
  },
  
  deleteUserById(userId) {
    wx.request({
      url: api.deleteUser + "?userId=" + userId,
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync('token')
      },
      success(res) {
        if (res.statusCode === 200) {
          Toast.success("注销账户成功")
        }
        if (res.statusCode != 200) {
          Toast.fail("注销账户失败")
        }
      },
      fail(err) {
        Toast.fail("注销账户失败")
      }
    })
  },

  
})