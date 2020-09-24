import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import { getCurrentUser } from '../../config/api';

const api = require("../../config/api")

// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logining: false
  },

  handleGetUserInfo(e) {
    this.setData({
      logining: true
    })
    const {
      userInfo
    } = e.detail;
    let that = this
    wx.login({
      success(res) {
        if (res.code) {
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
                  logining: false
                })
                // 本地缓存token、userInfo、是否登陆的信息
                wx.setStorageSync('token', res.data)
                wx.setStorageSync('userInfo', userInfo)
                wx.setStorageSync('hasLogined', true)
                that.getCurrentUser()
                Toast.success("登录成功")
                wx.switchTab({
                  url: '/pages/index/index',
                })
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
  getCurrentUser(){
    let that = this
    wx.request({
      url: api.getCurrentUser,
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync('token')
      },
      success(res) {
        if (res.statusCode === 200) {
          wx.setStorageSync('userId', res.data.userId)
        }
        if (res.statusCode != 200) {
          Toast.fail("获取userId失败")
        }
      },
      fail(err) {
        Toast.fail("获取userId失败")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShareAppMessage: function () {

  }
})