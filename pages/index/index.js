//index.js
//获取应用实例
const app = getApp()
const api = require('../../config/api')
let _data = require('../../data/data.js')
const { default: toast } = require('../../miniprogram_npm/@vant/weapp/toast/toast')
Page({
  data: {
    tasks: {},
    loading: true,
    slideButtons:[{
      type: 'warn',
      text: '删除',
      src: '/page/weui/cell/icon_del.svg', // icon的路径
    }]
  },
  onLoad: function () {
    this.setData({tasks: _data.tasks, loading: false})
    },
  taskCheck: function(e){
  },
  taskBegin: function(e){
  },

  getTasks(){
    wx.request({
      url: api.getTask, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync('token') // token
      },
      success (res) {
        // 处理任务列表数据
        console.log(res.data)
      },
      fail(err){
        Toast.fail("不能获取数据，错误信息: " + err)
      }
    })
  }
})
