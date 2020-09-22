import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

//index.js
//获取应用实例
const app = getApp()
const api = require('../../config/api')
let _data = require('../../data/data.js')
const {
  default: toast
} = require('../../miniprogram_npm/@vant/weapp/toast/toast')
const {
  getTask
} = require('../../config/api')
Page({
  data: {
    tasks: {},
    loading: true,
    slideButtons: [{
      type: 'warn',
      text: '删除',
      src: '/page/weui/cell/icon_del.svg', // icon的路径
    }]
  },
  onLoad: function () {

  },
  onShow: function () {
    if (!this.hasLogined()) {
      Toast.fail("请先登录")
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      this.getTasks()
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      loading: true
    })
    this.getTasks()
  },

  hasLogined() {
    if (wx.getStorageSync('hasLogined')) {
      return true
    }
    return false
  },
  getTasks() {
    let that = this
    wx.request({
      url: api.getTask, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync('token') // token
      },
      success(res) {
        // 处理任务列表数据 
        if (res.statusCode === 200) {
          that.setData({
            tasks: that.formatData(res.data),
            loading: false
          })
          console.log(that.data.tasks)
          Toast.success("加载成功")
        } else {
          Toast.fail("加载失败")
        }
      },
      fail(err) {
        that.setData({
          loading: false
        })
        Toast.fail("无法获取数据")
        console.log(err)
      }
    })
  },
  formatData(data) {
    let res = []
    for (let i in data) {
      let tmp = {}
      tmp['name'] = data[i].taskName
      tmp['tags'] = data[i].tags
      tmp['img'] = data[i].imgUrl
      tmp['time'] = data[i].minute // 每次任务时长
      tmp['times'] = data[i].times // 应该要提交的次数
      tmp['isRemind'] = data[i].isRemind
      tmp['count'] = data[i].count == null ? 0 : data[i].count //已经提交的次数
      tmp['status'] = data[i].status // 1-正在完成,2-超时未完成,3-已经完成
      tmp['startTime'] = data[i].startTime
      tmp['endTime'] = data[i].endTime
      tmp['taskType'] = data[i].taskType
      tmp['id'] = data[i].id
      res.push(tmp)
    }
    return res
  },
  taskCheck: function (e) { //点击跳转到编辑页面
    var id = parseInt(e.currentTarget.id);
    var task = this.data.tasks[id]
    var obj = JSON.stringify(task);
    if (task.status == 1) {
      wx.navigateTo({
        url: '/pages/editTask/editTask?obj=' + obj,
      })
    } else {
      Toast.fail("该任务已经完成或超时未完成,不能修改")
    }
  },
  taskBegin: function (e) {
    var id = parseInt(e.currentTarget.id);
    var obj = JSON.stringify(this.data.tasks[id]);
    wx.navigateTo({
      url: '/pages/task-begin/task-begin?task=' + obj,
    })
  },

  taskCantBegin: function () {
    Toast.fail("该任务已经完成或超时未完成")
  },

  /**
   * 滑窗用于删除任务
   */
  slideButtonTap(e) {
    let that = this
    let index = parseInt(e.currentTarget.id);
    let id = this.data.tasks[index].id
    Dialog.confirm({
        title: '删除学习任务',
        message: '确定要删除吗？',
        zIndex: 999
      })
      .then(() => {
        // 删除学习任务
        wx.request({
          url: api.deleteTask + "?taskId=" + id,
          header: {
            'content-type': 'application/json', // 默认值
            'Authorization': wx.getStorageSync('token')
          },
          success(res) {
            if (res.statusCode === 200) {
              that.onShow()
              Toast.success("删除任务成功")
            }
            if (res.statusCode != 200) {
              Toast.fail("删除任务失败")
            }
          },
          fail(err) {
            Toast.fail("删除任务失败")
          }
        })
      })
      .catch(() => {
        // on cancel
      });
  }

})