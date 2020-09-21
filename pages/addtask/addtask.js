import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

let _data = require("../../data/data")
let api = require("../../config/api")
Page({
  data: {
    task_name: "", //任务名
    types: ["单次任务", "多次任务"],
    task_type: "单次任务", //任务类型
    task_typeindex: 0, //default为单次
    date: "2016-09-01",
    task_times: 1, // 任务次数
    single_disable: false,
    multi_disable: false,
    activeName: '1', //折叠面板
    task_duration: "",
    currentstarttime: '',
    currentendtime: '',
    radio: '1',
    newTag: '',
    tags: ["英语", "数学", "政治", "专业课", "不想学"],
    currenttag: [],
    tasktag_dialog_text: "选择标签",
    alertItems: [{
        name: '是',
        value: '0',
        checked: true
      },
      {
        name: '否',
        value: '1'
      }
    ],
    labels: [{
        name: '英语',
        value: '0'
      },
      {
        name: '政治',
        value: '1'
      },
      {
        name: '数学',
        value: '2'
      }
    ],
    dialogvisible: false,
    typeshow: false,
    singleshow: false,
    startshow: false,
    endshow: false,
    submiting: false // 数据提交中
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentstarttime: this.getCurrentDate(),
      currentendtime: this.getCurrentDate(),
    })
  },

  //任务名称
  onChange_taskname(event) {
    this.setData({
      task_name: event.detail
    })
    console.log(this.data.task_name)
  },
  //任务标签对话框
  dialogpopup() {
    this.setData({
      dialogvisible: true
    })
  },
  tagChange(event) {
    this.setData({
      newTag: event.detail
    })
  },
  tag_button_click(event) {
    if (this.data.currenttag.indexOf(this.data.tags[event.currentTarget.id]) < 0) {
      this.data.currenttag.push(this.data.tags[event.currentTarget.id]);
      this.setData({
        currenttag: this.data.currenttag
      }) //调用setData后才能重新渲染
    }
    console.log(this.data.currenttag)
  },
  dialogconfirm() { //点击添加标签按钮后触发的函数
    if (this.data.newTag != "") {
      if (this.data.currenttag.indexOf(this.data.newTag) < 0)
        this.data.currenttag.push(this.data.newTag);
    }
    var str = "";
    if (this.data.currenttag.length > 0) //选择至少一个标签
      str = str + this.data.currenttag[0];
    for (var i = 1; i < this.data.currenttag.length; i++)
      str = str + "," + this.data.currenttag[i];
    this.setData({
      tasktag_dialog_text: str
    })
    console.log(this.data.currenttag);
  },
  //任务类型弹出
  showPopup_tasktype() {
    this.setData({
      typeshow: true
    });
  },
  onClose_tasktype() { //非取消按钮关闭
    this.setData({
      typeshow: false,
      task_typeindex: 0,
      multi_able: false
    });
  },
  onChange_type(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      task_type: value,
      task_typeindex: index
    })
    console.log(this.data.task_type, this.data.task_typeindex)
  },
  onConfirm_type(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    if (index == 1) { //多次任务
      this.setData({
        multi_disable: false,
        single_disable: true
      })
    } else {
      this.setData({
        multi_disable: true,
        single_disable: false
      })
    }
    this.setData({
      typeshow: false
    });
    console.log(this.data.multi_disable, this.data.single_disable)
  },
  //取消按钮
  onCancel_type() {
    this.setData({
      typeshow: false,
      task_typeindex: 0
    });
  },
  //折叠面板函数
  onChange_collapse(event) {
    this.setData({
      activeName: event.detail,
    });
  },
  //单次设置
  onChange_single(event) {
    this.setData({
      task_duration: event.detail
    })
    console.log(this.data.task_duration)
  },
  // 任务次数设置
  onChange_tasktimes(e) {
    this.setData({
      task_times: Number(e.detail)
    })
  },
  //开始时间
  start_popup() {
    this.setData({
      startshow: true
    });
  },
  formatDate(date) {
    date = new Date(date)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  },
  onConfirm_start(event) {
    this.setData({
      startshow: false,
      currentstarttime: this.formatDate(event.detail)
    });
  },
  onCancel_start() {
    this.setData({
      startshow: false
    });
  },
  //结束时间
  end_popup() {
    this.setData({
      endshow: true
    });
  },
  onConfirm_end(event) {
    this.setData({
      endshow: false,
      currentendtime: this.formatDate(event.detail)
    });
  },
  onCancel_end() {
    this.setData({
      endshow: false
    });
  },
  //是否提醒
  onChange_radio(event) {
    this.setData({
      radio: event.detail,
    });
  },
  onClick_radio(event) {
    const {
      name
    } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },
  getSubmitData(){
    let l = _data.task_img.length
    let index = Math.floor(Math.random() * l)
    let data = {
      "taskName": this.data.task_name,
      "taskType": this.data.task_typeindex,
      "minute": Number(this.data.task_duration),
      "times": this.data.task_times,
      "startTime": this.data.currentstarttime,
      "endTime": this.data.currentendtime,
      "isRemind": parseInt(this.data.radio),
      "imgUrl": _data.task_img[index],
      "tags": this.data.currenttag
    }
    return data
  },
  save() {
    this.setData({
      submiting: true
    })
    let data = this.getSubmitData()
    console.log(data)
    let that = this
    wx.request({
      url: api.createTask,
      data: data,
      method: "POST",
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync('token')
      },
      success(res) {
        that.setData({
          submiting: false
        })
        if (res.statusCode === 200) {
          Toast.success("任务创建成功")
          wx.navigateBack({
            delta: 1,
          })
        }
        if (res.statusCode != 200) {
          Toast.fail("任务创建失败")
        }
      },
      fail(err) {
        that.setData({
          submiting: true
        })
        Toast.fail("任务创建失败")
      }
    })
    
  },
  cancel() {
    wx.navigateBack({
      delta: 1,
    })
  },
  getCurrentDate: function () {
    let t = new Date()
    let year = t.getFullYear()
    let month = t.getMonth() + 1
    let day = t.getDate()
    return String(year) + "-" + String(month) + "-" + String(day)
  },
})