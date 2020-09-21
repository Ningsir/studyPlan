import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

const util = require('../../utils/util.js');
const api = require("../../config/api")
// pages/diary/diary.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: -1, //仅在编辑日记条件下使用，提供所编辑的日记在日记列表中的索引
    type: '', //标识是新建日记还是编辑日记
    diaryTitle: '',
    diaryContent: '',
    diaryDate: '',
    id:''
  },
  getDate() {
    var date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    var _time = year + "-" + month + "-" + day
    return _time
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type
    var index = options.id
    //type:'1' && index != -1 -- 编辑日记
    //type='2' && index = -1 -- 新建日记
    this.setData({
      type: type,
      index: index
    })
    if (type == '1') { //表明是编辑日记
      var obj = JSON.parse(options.obj)
      this.setData({
        diaryTitle: obj.title,
        diaryDate: obj.date,
        diaryContent: obj.content,
        id: obj.id
      })
    } else { //表明是新建日记
      var diaryTime = this.getDate()
      this.setData({
        diaryDate: diaryTime,
      })
      
    }
  },

  OnInputTitleChange(event) {
    this.setData({
      diaryTitle: event.detail
    })
     
  },

  OnInputContentChange(event) {
    this.setData({
      diaryContent: event.detail
    })
    
  },
  save(event) {
    var newdiary = {
      "date": this.data.diaryDate,
      "title": this.data.diaryTitle,
      "content": this.data.diaryContent
    }
    let pages = getCurrentPages(); //页面栈
    let curPage = pages[pages.length - 2]; //上一页面（diaryList）

    if (this.data.type == '1') { //保存编辑过的日记
      //splice用新的替换原alldiary中的对应项
      newdiary['id'] = this.data.id
      this.updateDiaryById(newdiary)
      curPage.data.alldiary.splice(this.data.index, 1, newdiary)
    } else {
      //TODO 把修改后的alldiary提交到后端
      //需提交的数据：title,date,content
      var date = this.data.diaryDate
      var title = this.data.diaryTitle
      var content = this.data.diaryContent
      var _data = {
        "title": title,
        "content": content
      }
      this.createDiary(_data)
      //跳转到日记列表，同时将插入新日记后的列表
      curPage.data.alldiary.push(newdiary)
    }
    curPage.setData({
      alldiary: curPage.data.alldiary
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  updateDiaryById(data){
    wx.request({
      url: api.updateDiaryById, //仅为示例，并非真实的接口地址,
      data: data,
      method: "POST",
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync('token') // token
      },
      success(res) {
        // 处理任务列表数据 
        if (res.statusCode === 200) {       
          Toast.success("修改成功")
        } else {
          Toast.fail("修改失败")
        }
      },
      fail(err) {
        Toast.fail("修改失败")
      }
    })
  },
  createDiary(data){
    wx.request({
      url: api.addDiary, //仅为示例，并非真实的接口地址,
      data: data,
      method: "POST",
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync('token') // token
      },
      success(res) {
        // 处理任务列表数据 
        if (res.statusCode === 200) {       
          Toast.success("保存成功")
        } else {
          Toast.fail("保存失败")
        }
      },
      fail(err) {
        Toast.fail("保存失败")
      }
    })
  }
})