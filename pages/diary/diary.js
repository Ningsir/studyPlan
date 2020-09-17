// pages/diary/diary.js
const util=require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    //type: '', //标识是新建日记还是编辑日记
    diaryTitle:'',
    diaryContent:'',
    diaryDate:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj =JSON.parse(options.obj)
    console.log(obj)
    var type = options.type
    if(type=='1'){ //表明是编辑日记
      this.setData({
        diaryTitle: obj.title,
        diaryDate: obj.date,
        diaryContent: obj.content
      })
    }else{
      var diaryTime=util.formatTime(new Date())
      this.setData({
        diaryTime:diaryTime,
      })
    }
  },

  OnInputTitleChange(event){
    this.setData({
        diaryTitle:event.detail
    })
    console.log(this.data.diaryTitle)
  },

  OnInputContentChange(event){
    this.setData({
        diaryContent:event.detail
    })
    console.log(this.data.diaryContent)
  },
  confirmDairy(event){
    //这里把修改后的日记提交到后端
    //提交id,title,date,content
  }
})