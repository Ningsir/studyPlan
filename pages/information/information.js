// pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:"",
    sexual:"",
    province:""
  },


  onNicknameChange(e){
    this.setData({
      nickname:e.detail
    })

    // console.log(this.data.nickname)
  } ,


  onSexualChange(e){
    this.setData({
      sexual:e.detail
    })

    // console.log(this.data.sexual)
  } ,
  // onCountryChange(e){
  //   this.setData({
  //     country:e.detail
  //   })

  //   // console.log(this.data.country)
  // } ,
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

  },

 

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


})