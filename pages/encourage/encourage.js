// pages/encourage/encourage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentScore: 5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onCurrentScoreChange(event){
    this.setData({
      currentScore: event.detail
    })
     console.log(this.data.currentScore)
  },

    OnInputChange(event){
      this.setData({
          InputMessage:event.detail
      })
      console.log(this.data.InputMessage)
    }
})