Page({
  data: {
    task_name: "",
    types: ["单次任务", "多次任务"],
    task_type: "",
    task_typeindex: 0, //default为单次
    date: "2016-09-01",
    s_time: "12:01",
    e_time: "12:01",
    durationRange: ["0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4"],
    task_duration: "",
    task_durationindex: 0,
    frequencyRange: ["1", "2", "7", "15", "30"],
    task_frequency: "",
    task_frequencyindex: 0,
    currentstarttime: '12:01',
    currentendtime: '12:00',
    minHour: 10,
    maxHour: 20,
    radio: '1',
    newTag: '',
    tags: ["英语", "数学", "政治", "专业课", "不想学"],
    currenttag: [],
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
    frequencyshow: false,
    startshow: false,
    endshow: false
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
      if (this.data.currenttag.indexOf(this.data.newTag) < 0) {
        this.data.currenttag.push(this.data.newTag);
      }
    }
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
      task_type: "",
      task_typeindex: 0
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
    this.setData({
      typeshow: false
    });
  },
  //取消按钮
  onCancel_type() { 
    this.setData({
      typeshow: false,
      task_type: "",
      task_typeindex: 0
    });
  },
  //单次设置
  single_popup() {
    this.setData({
      singleshow: true
    });
  },
  onClose_single() {
    this.setData({
      singleshow: false,
      task_duration: "",
      task_durationindex: 0
    });
  },
  onChange_single(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      task_duration: value,
      task_durationindex: index
    });
    console.log(this.data.task_duration, this.data.task_durationindex)
  },
  onConfirm_single(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      singleshow: false
    });
  },
  onCancel_single() {
    this.setData({
      singleshow: false,
      task_duration: "",
      task_durationindex: 0
    });
  },
  //多次频率设置
  frequency_popup() {
    this.setData({
      frequencyshow: true
    });
  },
  onClose_frequency() {
    this.setData({
      frequencyshow: false,
      task_frequency: "",
      task_frequencyindex: 0
    });
  },
  onChange_frequency(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      task_frequency: value,
      task_frequencyindex: index
    })
  },
  onConfirm_frequency(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      frequencyshow: false
    });
  },
  onCancel_frequency() {
    this.setData({
      frequencyshow: false,
      task_frequency: "",
      task_frequencyindex: 0
    });
  },
  //开始、结束时间设置
  start_popup() {
    this.setData({
      startshow: true
    });
  },
  onClose_start() {
    this.setData({
      startshow: false,
      currentstarttime: "12:01"
    });
  },
  onConfirm_start(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    //提交
    this.setData({
      startshow: false
    });
  },
  onCancel_start() {
    this.setData({
      startshow: false,
      currentstarttime: "12:01"
    });
  },
  onInput_start(event) {
    this.setData({
      currentstarttime: event.detail,
    });
    console.log(this.data.currentstarttime)
  },
  //结束
  end_popup() {
    this.setData({
      endshow: true
    });
  },
  onClose_end() {
    this.setData({
      endshow: false,
      currentendtime: '12:01'
    });
  },
  onChange_end(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
  },
  onConfirm_end(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      endshow: false
    });
  },
  onCancel_end() {
    this.setData({
      endshow: false,
      currentendtime: '12:01'
    });
  },
  onInput_end(event) {
    this.setData({
      currentendtime: event.detail,
    });
    console.log(this.data.currentendtime)
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
  save(){

  },
  cancel(){
    wx.navigateBack({
      delta: 1,
    })
  }
})