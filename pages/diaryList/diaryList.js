import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

const api = require("../../config/api")
// pages/diaryList/diaryList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alldiary: [],
    slideButtons: [{
      type: 'warn',
      text: '删除',
      src: '/page/weui/cell/icon_del.svg', // icon的路径
    }],
    loading: true
  },
  onLoad: function (options) { //只触发一次
    this.setData({
      loading: true
    })
    //TODO 从后端获取所有的日记记录，更新this.data.alldiary
    this.getTotalDiary()
    //对现有日记按日期先后排序
    this.data.alldiary.sort(this.sortByProperty("date"))
    this.setData({
      alldiary: this.data.alldiary
    })
  },
  /**
   * 获取日记列表
   */
  getTotalDiary: function(){
    let that = this
    wx.request({
      url: api.getTotalDiary, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync('token') // token
      },
      success(res) {
        // 处理任务列表数据 
        if (res.statusCode === 200) {
          that.setData({
            alldiary: res.data,
            loading: false
          })
          console.log(that.data.alldiary)
          Toast.success("加载成功")
        } else {
          Toast.fail("加载失败")
        }
      },
      fail(err) {
        that.setData({
          loading: false
        })
        Toast.fail("无法获取日记数据")
      }
    })
  },
  /**
   * 删除日记
   */
  deleteDiary(index) {
    let that = this
    let id = this.data.alldiary[index].id
    Dialog.confirm({
        title: '删除日记',
        message: '确定要删除日记吗？',
        zIndex: 999
      })
      .then(() => {
        // 删除
        wx.request({
          url: api.deleteDiaryById + "?id=" + id,
          header: {
            'content-type': 'application/json', // 默认值
            'Authorization': wx.getStorageSync('token')
          },
          success(res) {
            if (res.statusCode === 200) {
              that.onLoad()
              Toast.success("删除日记成功")
            }
            if (res.statusCode != 200) {
              Toast.fail("删除日记失败")
            }
          },
          fail(err) {
            Toast.fail("删除日记失败")
          }
        })
      })
      .catch(() => {
        // on cancel
      });
  },
  sortByProperty(property) {
    function sortcore(obj1, obj2) {
      if (obj1[property] > obj2[property]) return 1
      else if (obj1[property] < obj2[property]) return -1
      else if (obj1[property] == obj2[property]) return 0
    }
    return sortcore
  },
  onShow: function () { //刷新日记列表
    // this.onLoad()
  },
  onPullDownRefresh: function () {
    this.onLoad()
  },
  diaryPress(event) {
    var id = parseInt(event.currentTarget.id)
    var obj = JSON.stringify(this.data.alldiary[id]);
    wx.navigateTo({
      url: '/pages/diary/diary?id=' + id + '&type=1&obj=' + obj,
    })
  },
  slideButtonTap(event) { //删除当前一条日记记录
    var curId = event.currentTarget.id
    this.deleteDiary(curId)
    // var item = this.data.alldiary.splice(curId, 1)
    // this.setData({
    //   alldiary: this.data.alldiary
    // })
  },

  // /**
  //  * 返回
  //  */
  // onClickLeft(){
  //   wx.navigateBack({
  //     delta: 1,
  //   })
  // },

  // /**
  //  * 保存日记
  //  */
  // onClickRight(){

  // }
})