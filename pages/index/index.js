//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onLoad: function () {
    },
  jmpAdd:function(){
    wx.navigateTo({url: '/pages/addtask/addtask',})
  },
  jmpEdit:function(){
    wx.navigateTo({url: '/pages/editTask/editTask',})
  }
})
