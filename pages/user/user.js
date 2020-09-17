import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

const api = require("../../config/api")

Page({

  data: {
    userinfo: {},
    hasLogined: false
  },
  handleGetUserInfo(e) {
    const {
      userInfo
    } = e.detail;
    wx.setStorageSync('userinfo', userInfo);
    const userinfo = wx.getStorageSync("userinfo");
    // this.setData({
    //   userinfo
    // })
    let that = this
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code)
          wx.request({
            url: api.login + '?code=' + res.code, //仅为示例，并非真实的接口地址
            data: userInfo,
            method: "POST",
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if (res.data.status == 200) {
                // 本地缓存token
                wx.setStorageSync('token', res.data)
                that.setData({
                  userinfo: userinfo,
                  hasLogined: true
                })
                Toast.success("登录成功")
              }
              if (res.data.status == 500) {
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
      },
      fail: (err) => {
        Toast.fail("退出失败")
      }
    })
  }
})