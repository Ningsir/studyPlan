//index.js
//获取应用实例
const app = getApp()
let _data = require('../../data/data.js')
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
    console.log("check")
  },
  taskBegin: function(e){
  }
})
