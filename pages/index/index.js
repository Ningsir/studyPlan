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
  taskCheck: function(e){ //点击跳转到编辑页面
    console.log(e)
    var id = parseInt(e.currentTarget.id);
    var obj = JSON.stringify(this.data.tasks[id]);
    wx.navigateTo({
      url: '/pages/editTask/editTask?obj=' + obj,
    })
  },
  taskBegin: function(e){
  },
})
