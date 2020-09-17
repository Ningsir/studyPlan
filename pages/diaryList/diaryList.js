// pages/diaryList/diaryList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alldiary: [
      {
        id:'',
        date: "2020/9/16",
        title: "今天是个好日子",
        content:'四点九四大家多少就是\n很多时候倒i建瓯但是佛'
      },
      {
        id:'',
        date: "2020/9/15",
        title: "哈哈哈哈哈",
        content: '大家撒电视机分厘卡是\n觉得死哦附件是\n'
      },
    ],
    slideButtons:[{
      type: 'warn',
      text: '删除',
      src: '/page/weui/cell/icon_del.svg', // icon的路径
    }]
  },
  diaryPress(event){
    var id = parseInt(event.currentTarget.id)
    console.log(id)
    var obj = JSON.stringify(this.data.alldiary[id]);
    wx.navigateTo({
      url: '/pages/diary/diary?type=1&obj=' + obj,
    })
  },
  slideButtonTap(event){
  }
})