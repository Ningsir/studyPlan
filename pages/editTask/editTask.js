import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

let api = require("../../config/api")

Page({
  data:{
    task: {},
    submiting: false,
    task_name: "",
    types: ["单次任务", "多次任务"],
    task_type: "",
    task_typeindex: 0, //default为单次,
    minutes: 0, // 任务时间
    date: "2016-09-01",
    task_times: 0,// 任务次数
    s_time: "12:01",
    e_time: "12:01",
    single_disable: false,
    multi_disable: false,
    activeName: '1',
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
    radio: '1',// 是否提醒，1提醒，0不提醒
    newTag: '',
    tags:["英语", "数学", "政治", "专业课", "不想学"],
    currenttag: [],
    tasktag_dialog_text: "选择标签",
    alertItems: [
      {name: '是', value: '0', checked: true},
      {name: '否', value: '1'}
    ],
    labels: [
      {name: '英语', value: '0'},
      {name: '政治', value: '1'},
      {name: '数学', value: '2'}
    ],
    dialogvisible: false,
    typeshow: false,
    singleshow: false,
    frequencyshow: false,
    startshow: false,
    endshow: false
  },
  onLoad: function(options){
    var obj =JSON.parse(options.obj);
    console.log(obj)
    this.setData({
      task: obj,
      task_name: obj.name,
      currenttag: obj.tags,
      minutes: obj.time,
      task_times: obj.times,
      radio: String(obj.isRemind)
    })
    this.LoadCurrentTags();
  },
  LoadCurrentTags(){
    var str = "";
    if(this.data.currenttag.length>0) //选择至少一个标签
      str = str + this.data.currenttag[0];
    for(var i = 1; i < this.data.currenttag.length; i++)
      str = str + "," + this.data.currenttag[i];
    this.setData({tasktag_dialog_text: str})
  },
  //任务名称
  onChange_taskname(event){
    this.setData({
      task_name: event.detail
    })
  },
  onChange_minute(event){
    console.log(event.detail)
    this.setData({
      minutes: event.detail
    })
  },
  //任务标签对话框
  dialogpopup(){
    this.setData({
      dialogvisible: true
    })
  },
  tagChange(event){
    this.setData({
      newTag: event.detail
    })
  },
  tag_button_click(event){
    if(this.data.currenttag.indexOf(this.data.tags[event.currentTarget.id])<0){
      this.data.currenttag.push(this.data.tags[event.currentTarget.id]);
      this.setData({currenttag:this.data.currenttag}) //调用setData后才能重新渲染
    }
    console.log(this.data.currenttag)
  },
  dialogconfirm(){ //点击添加标签按钮后触发的函数
    if(this.data.newTag!=""){
      if(this.data.currenttag.indexOf(this.data.newTag)<0)
        this.data.currenttag.push(this.data.newTag);
    }
    this.LoadCurrentTags();
    console.log(this.data.currenttag);
  },
  //任务类型弹出
  showPopup_tasktype() {
    this.setData({ typeshow: true });
  },
  onClose_tasktype() { //非取消按钮关闭
    this.setData({ 
      typeshow: false,
      task_type: "",
      task_typeindex: 0,
      multi_able: false
    });
  },
  onChange_type(event) {
    const { picker, value, index } = event.detail;
    this.setData({task_type: value, task_typeindex: index})
    console.log(this.data.task_type, this.data.task_typeindex)
  },
  onConfirm_type(event) {
    const { picker, value, index } = event.detail;
    if(index==1){ //多次任务
      this.setData({
        multi_disable: false,
        single_disable: true
      })
    }else{
      this.setData({
        multi_disable: true,
        single_disable: false
      })
    }
    this.setData({ typeshow: false });
    console.log(this.data.multi_disable, this.data.single_disable)
  },
  onCancel_type() { //取消按钮
    this.setData({ 
      typeshow: false,
      task_type: "",
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
  single_popup() {
    this.setData({ singleshow: true });
  },
  onClose_single() {
    this.setData({ 
      singleshow: false,
      task_duration: "",
      task_durationindex: 0
    });
  },
  onChange_single(event) {
    const { picker, value, index } = event.detail;
    this.setData({task_duration: value, task_durationindex: index});
    console.log(this.data.task_duration, this.data.task_durationindex)
  },
  onConfirm_single(event) {
    const { picker, value, index } = event.detail;
    this.setData({ singleshow: false });
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
    this.setData({ frequencyshow: true });
  },
  onClose_frequency() {
    this.setData({ 
      frequencyshow: false,
      task_frequency: "",
      task_frequencyindex: 0
    });
  },
  onChange_frequency(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      task_frequency: value,
      task_frequencyindex: index
    })
  },
  onConfirm_frequency(event) {
    const { picker, value, index } = event.detail;
    this.setData({ frequencyshow: false });
  },
  onCancel_frequency() {
    this.setData({ 
      frequencyshow: false,
      task_frequency: "",
      task_frequencyindex: 0
    });
  },
  // 任务次数设置
  onChange_tasktimes(e){
    this.setData({
      task_times: e.value
    })
  },
  //开始、结束时间设置
  start_popup() {
    this.setData({ startshow: true });
  },
  onClose_start() {
    this.setData({ 
      startshow: false,
      currentstarttime: "12:01"
    });
  },
  onConfirm_start(event) {
    const { picker, value, index } = event.detail;
    //提交
    this.setData({ startshow: false });
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
    this.setData({ endshow: true });
  },
  onClose_end() {
    this.setData({ 
      endshow: false,
      currentendtime: '12:01'
    });
  },
  onChange_end(event) {
    const { picker, value, index } = event.detail;
  },
  onConfirm_end(event) {
    const { picker, value, index } = event.detail;
    this.setData({ endshow: false });
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
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },

  cancel(){
    wx.navigateBack({
      delta: 1,
    })
  },

  save(){
    let _data = {
      "id": this.data.task.id,
      "imgUrl": this.data.task.img,
      "isRemind": 0, // parseInt(this.data.radio),
      "minute": parseInt(this.data.minutes),
      "taskName": this.data.task_name,
      "taskType": this.data.task.taskType
    }
    this.setData({
      submiting: true
    })
    let that = this
    wx.request({
      url: api.updateTask,
      data: _data,
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
          Toast.success("保存成功")
          wx.navigateBack({
            delta: 1,
          })
        }
        if (res.statusCode != 200) {
          Toast.fail("保存失败")
        }
      },
      fail(err) {
        that.setData({
          submiting: true
        })
        Toast.fail("保存失败")
      }
    })
  }
})