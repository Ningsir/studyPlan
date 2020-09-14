Page({

  data:{
    userinfo:{}
    
  },
  handleGetUserInfo(e){
    // console.log(e);
    const {userInfo}=e.detail;
    wx.setStorageSync('userinfo', userInfo);
    const userinfo=wx.getStorageSync("userinfo");
    this.setData({userinfo})
  },
  // onShow(){
  //   const userinfo=wx.getStorageSync('userinfo');
  //   this.setData({userinfo})
  //   }
  })