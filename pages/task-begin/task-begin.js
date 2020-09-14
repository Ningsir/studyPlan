import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

const _data = require("../../data/data")
// pages/task-begin/task-begin.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      time: 0,
      total_time: 0,
      timeData:{},
      start_timer: true,
      some_words: "",
      percent: 0,
      task_name: "",
      bg_img: "bg2.jpg"
    },
    onChange: function(e) {
      let leave = this.data.total_time - (60 * 60 * 1000 * e.detail.hours + 60 * 1000 * e.detail.minutes + 1000 * e.detail.seconds + e.detail.milliseconds)
      this.setData({
        percent: Math.round(leave / this.data.total_time * 100),
        timeData: e.detail,
      });
    },
    start() {
      const countDown = this.selectComponent('.control-count-down');
      countDown.start();
      this.setData({start_timer: true})
    },
  
    pause() {
      const countDown = this.selectComponent('.control-count-down');
      countDown.pause();
      this.setData({start_timer: false})
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
      Toast('学习任务完成');
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
    let t = Number(options.task_time) * 60 * 1000
    this.setData({task_name: options.task_name,
      time: t,
      total_time: t
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
    this.setSomeWords()
    this.setBgImg()
  },

  setSomeWords(){
    let l = _data.some_words.length
    let index = Math.floor(Math.random() * l)
    this.setData({some_words : _data.some_words[index]})
  },
  setBgImg(){
    let l = _data.bg_img.length
    let index = Math.floor(Math.random() * l)
    this.setData({bg_img : _data.bg_img[index]})
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
  onClickLeft: function(){
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