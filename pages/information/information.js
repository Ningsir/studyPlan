// pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     userInfo: {},
     sexual: ''
  },


  onNicknameChange(e){
    this.setData({
      nickname:e.detail
    })
  } ,


  onSexualChange(e){
    this.setData({
      sexual:e.detail
    })
  } ,
  
  onProvinceChange(e){
    this.setData({
      province:e.detail
    })

    // console.log(this.data.province)
  } ,
  summit(e){
    var nickname=this.data.nickname;
    var sexual=this.data.sexual;
    
    var province=this.data.province;
    console.log(nickname)
    console.log(sexual)
   
    console.log(province)

  },
  cancle(e){
    var nickname="";
    var sexual="";
    var country="";
    var province="";
    console.log(nickname)
    console.log(sexual)
   
    console.log(province)

  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    this.setData({
      sexual: this.data.userInfo.gender == 1 ? '男' : '女'
    })
    console.log(this.data.userInfo)
  },

 

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


})