import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

const api = require("../../config/api")
const _data = require("../../data/data")

Date.prototype.format = function(fmt) { 
  var o = { 
     "M+" : this.getMonth()+1,                 //月份 
     "d+" : this.getDate(),                    //日 
     "h+" : this.getHours(),                   //小时 
     "m+" : this.getMinutes(),                 //分 
     "s+" : this.getSeconds(),                 //秒 
     "q+" : Math.floor((this.getMonth()+3)/3), //季度 
     "S"  : this.getMilliseconds()             //毫秒 
 }; 
 if(/(y+)/.test(fmt)) {
         fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
 }
  for(var k in o) {
     if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
 return fmt; 
}
// pages/task-begin/task-begin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submiting: false,
    time: 0,
    total_time: 0,
    task:{},
    timeData: {},
    start_timer: true,
    some_words: "",
    percent: 0,
    task_name: "",
    bg_img: "",
    startTime: ''
  },
  onChange: function (e) {
    let leave = this.data.total_time - (60 * 60 * 1000 * e.detail.hours + 60 * 1000 * e.detail.minutes + 1000 * e.detail.seconds + e.detail.milliseconds)
    this.setData({
      percent: Math.round(leave / this.data.total_time * 100),
      timeData: e.detail,
    });
  },
  start() {
    const countDown = this.selectComponent('.control-count-down');
    countDown.start();
    this.setData({
      start_timer: true
    })
  },

  pause() {
    const countDown = this.selectComponent('.control-count-down');
    countDown.pause();
    this.setData({
      start_timer: false
    })
  },

  reset() {
    Dialog.confirm({
        title: '重置学习任务',
        message: '学习任务还没完成，确定要重置吗？',
        zIndex: 999
      })
      .then(() => {
        const countDown = this.selectComponent('.control-count-down');
        countDown.reset();
      })
      .catch(() => {
        // on cancel
      });
  },

  finished() {
    this.setData({
      submiting: true
    })
    let data = {
      "startTime": this.data.startTime,
      "endTime": new Date().format("yyyy-MM-dd hh:mm:ss"),
      "task":{
        "id": this.data.task.id,
        "taskName": this.data.task.name
      }
    }
    let that = this
    // 提交学习任务
    wx.request({
      url: api.submmit,
      data: data,
      method: "POST",
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync('token')
      },
      success(res) {
        if (res.statusCode === 200) {
          that.setData({
            submiting: false
          })
          that.refreshTaskStatus()
          Toast.success("任务完成并提交")
          wx.navigateBack({
            delta: 1,
          })
        }
        if (res.statusCode != 200) {
          Toast.fail("任务提交失败")
        }
      },
      fail(err) {
        Toast.fail("任务提交失败")
      }
    })
  },
  refreshTaskStatus(){
    wx.request({
      url: api.refreshTaskStatus,
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync('token')
      },
      success(res) {
        if (res.statusCode === 200) {
          Toast.success("任务状态刷新成功")
        }
        if (res.statusCode != 200) {
          Toast.fail("任务状态刷新失败")
        }
      },
      fail(err) {
        Toast.fail("任务状态刷新失败")
      }
    })
  },
  /**
   * 手动停止计时器
   */
  stop_timer() {
    Dialog.confirm({
        title: '放弃学习任务',
        message: '学习任务还没完成，确定要放弃吗？',
        zIndex: 999
      })
      .then(() => {
        wx.navigateBack({
          delta: 1,
        })
      })
      .catch(() => {
        // on cancel
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = JSON.parse(options.task)
    this.setData({
      total_time: 1000 * 60 * t.time,
      time: 1000 * 60 * t.time,
      task: t
    })
    this.setSomeWords()
    this.setBgImg()
    this.setData({
      startTime: new Date().format("yyyy-MM-dd hh:mm:ss")
    })
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

  setSomeWords() {
    let l = _data.some_words.length
    let index = Math.floor(Math.random() * l)
    this.setData({
      some_words: _data.some_words[index]
    })
  },
  setBgImg() {
    let l = _data.bg_img.length
    let index = Math.floor(Math.random() * l)
    this.setData({
      bg_img: _data.bg_img[index]
    })
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
    const countDown = this.selectComponent('.control-count-down');
    countDown.reset();
  },
  onClickLeft: function () {
    Dialog.confirm({
        title: '放弃学习任务',
        message: '学习任务还没完成，确定要放弃吗？',
        zIndex: 999
      })
      .then(() => {
        wx.navigateBack({
          delta: 1,
        })
      })
      .catch(() => {
        // on cancel
      });
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