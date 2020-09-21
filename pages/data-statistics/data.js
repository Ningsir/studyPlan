import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import * as echarts from '../../miniprogram_npm/ec-canvas/echarts';

const _data = require("../../data/data")
const api = require("../../config/api")
let day_chart = null;
let month_chart = null;
let tag_chart = null;

function initDayChart(canvas, width, height, dpr) {
  day_chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(day_chart);
  let option = {
    backgroundColor: 'seashell',
    color: ['#79c3ec', '#efacb9', '#24baaa', '#5e75ab', '#5198b7', '#c0cdad'],
    //标题样式
    title: {
      text: "每日数据统计",
      textStyle: {
        color: 'gray',
      },
      left: 'center'
    },
    legend: {
      bottom: 20
    },
    tooltip: {},
    series: [{
      name: '每日数据统计',
      type: 'pie',
      // radius: '60%',
      data: [{
        value: 1,
        name: '今天还没有学习'
      }],
      // roseType: 'angle',
      label: {
        normal: {
          show: true,
          formatter: '{c}分钟', //自定义显示格式(b:name, c:value, d:百分比)
          fontSize: 15
        }
      }
    }]
  };
  day_chart.setOption(option);
  return day_chart;
}

function initTagChart(canvas, width, height, dpr) {
  tag_chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(tag_chart);
  let option = {
    backgroundColor: 'seashell',
    color: ['#79c3ec', '#efacb9', '#24baaa', '#5e75ab', '#5198b7', '#c0cdad'],
    // legend: {
    //   bottom: 20
    // },
    //x轴
    xAxis: [{
      type: 'category',
      name: '标签',
      data: ['未学习']
    }],
    //y轴
    yAxis: [{
      type: 'value',
      name: '分钟',
    }],
    //标题样式
    title: {
      text: "按标签统计",
      textStyle: {
        color: 'gray',
      },
      left: 'center'
    },
    series: [{
      name: "柱形图",
      type: "bar",
      label: {
        normal: {
          show: true,
          formatter: '{b}: {c}分钟' //自定义显示格式(b:name, c:value, d:百分比)
        }
      },
      left: 20,
      right: 120,
      data: [1]
    }]
  }
  tag_chart.setOption(option);
  return tag_chart;
}

function initMonthChart(canvas, width, height, dpr) {
  month_chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(month_chart);
  let option = {
    backgroundColor: 'seashell',
    color: ['#6a7985'],
    //标题样式
    title: {
      text: "月度数据统计",
      textStyle: {
        color: 'gray',
      },
      left: 'center'
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    //x轴
    xAxis: [{
      type: 'category',
      name: '日期',
      data: ['9-1', '9-2', '9-3', '9-4', '9-5', '9-6', '9-7', '9-8', '9-9', '9-10', '9-11', '9-12', '9-13', '9-14', '9-15', '9-16', '9-17', '9-18', '9-19', '9-20',
        '9-21', '9-22', '9-23', '9-24', '9-25', '9-26', '9-27', '9-28', '9-29', '9-30'
      ]
    }],
    //y轴
    yAxis: [{
      type: 'value',
      name: '分钟',
    }],
    // dataZoom: [{
    //     type: 'slider',
    //     show: true,
    //     xAxisIndex: 0,
    //     start: 1,
    //     end: 50
    //   },
    //   {
    //     type: 'inside',
    //     xAxisIndex: 0,
    //     start: 1,
    //     end: 50
    //   },
    // ],
    series: [{
      name: "每日完成任务总时间",
      type: 'line',
      //折线平滑
      smooth: true,
      symbolSize: 5,
      data: []
    }]
  };

  month_chart.setOption(option);
  return month_chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chart_hidden: false,
    loading: true,
    current_date: "",
    today_study_hours: 0,
    today_study_minutes: 0,
    today_task_count: 0,
    average_study_hours: 0,
    average_study_minutes: 0,
    day_ec: {
      onInit: initDayChart
    },
    month_ec: {
      onInit: initMonthChart
    },
    tag_ec: {
      onInit: initTagChart
    },
    day_show: false,
    day_date: '',
    month_show: false,
    month_date: '',
    min_date: new Date(2018, 0, 1).getTime(),
    max_date: new Date().getTime(),
    day_data: [],
    tags: [],
    minutes: [],
    month_data: [],
    learn_time: []
  },

  getCurrentDate: function () {
    let t = new Date()
    let year = t.getFullYear()
    let month = t.getMonth() + 1
    let day = t.getDate()
    return String(year) + "-" + String(month) + "-" + String(day)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      current_date: this.getCurrentDate(),
      day_date: this.getCurrentDate(),
      month_date: this.formatDate(this.getCurrentDate())
    })
    console.log(this.data.day_date)
    setTimeout(() => {
      this.getBasicDailyData(this.data.current_date, this.data.current_date)
      this.getDayData(this.data.current_date, this.data.current_date)
      this.getTagDistribution()
      this.getMonthData(this.getFirstDayOfMonth(this.data.day_date), this.getLastDayOfMonth(this.data.day_date))
    }, 4000)
  },

  formatDate(date) {
    date = new Date(date)
    return `${date.getFullYear()}-${date.getMonth() + 1}`
  },

  /**
   * 
   * @param {string} date: year-date
   * 根据年月日获得这个月的最后一天 
   */
  getLastDayOfMonth(date) {
    date = new Date(date)
    date = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },

  /**
   * 
   * @param {string} date: year-date
   * 根据年月日获得这个月的第一天 
   */
  getFirstDayOfMonth(date) {
    date = new Date(date)
    return `${date.getFullYear()}-${date.getMonth() + 1}-01`;
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      loading: true
    })
    this.getBasicDailyData(this.data.current_date, this.data.current_date)
    this.getDayData(this.data.current_date, this.data.current_date)
    this.getTagDistribution()
    this.getMonthData(this.getFirstDayOfMonth(this.data.day_date), this.getLastDayOfMonth(this.data.day_date))
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  dayClose() {
    this.setData({
      day_show: false,
      chart_hidden: false
    })
   this.refresh()
  },
  dayDisplay() {
    this.setData({
      day_show: true,
      chart_hidden: true
    })
  },
  dayConfirm(event) {
    let date = new Date(event.detail)
    this.setData({
      day_show: false,
      chart_hidden: false,
      day_date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    });
    this.refresh()
    // 更新每日数据统计
    this.getDayData(this.data.day_date, this.data.day_date)
  },
  monthClose() {
    this.setData({
      month_show: false,
      chart_hidden: false
    })
    this.refresh()
  },
  monthDisplay() {
    this.setData({
      month_show: true,
      chart_hidden: true
    })
  },
  monthConfirm(event) {
    let date = new Date(event.detail)
    this.setData({
      month_show: false,
      chart_hidden: false,
      month_date: `${date.getFullYear()}-${date.getMonth() + 1}`,
    });
    this.refresh()
    // 更新月度统计数据
    this.getMonthData(this.getFirstDayOfMonth(this.data.month_date), this.getLastDayOfMonth(this.data.month_date))
  },
  monthCancel(event) {
    this.setData({
      month_show: false,
      chart_hidden: false
    })
    this.refresh()
  },
  onInput(event) {
    this.setData({
      month_date: event.detail,
    });
  },
  getTodayData() {
    let today_data = [{
        "task_name": "复习英语",
        "total_time": 100
      },
      {
        "task_name": "看张宇视频",
        "total_time": 120
      },
      {
        "task_name": "背单词",
        "total_time": 100
      },
      {
        "task_name": "刷高数习题",
        "total_time": 150
      }
    ]
    let res = []
    for (let i in today_data) {
      let tmp = {}
      tmp['value'] = today_data[i].total_time
      tmp['name'] = today_data[i].task_name
      res.push(tmp)
    }
    return res
  },
  refresh() {
    setTimeout(() => {
      // 更新图表数据
      tag_chart.setOption({
        xAxis: [{
          data: this.data.tags
        }],
        series: [{
          data: this.data.minutes
        }]
      })
      // 更新图表数据
      day_chart.setOption({
        series: [{
          data: this.data.day_data
        }]
      })
      // 更新图表数据
      month_chart.setOption({
        xAxis: [{
          data: this.data.month_day
        }],
        series: [{
          data: this.data.learn_time
        }]
      })
    }, 500)
  },
  getTagDistribution() {
    let that = this
    wx.request({
      url: api.getTagDistribution,
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync('token')
      },
      success(res) {
        console.log("tag")
        console.log(res.data)
        res = res.data
        let tags = []
        let minutes = []
        if (res.length != 0) {
          // 转换数据格式
          for (let i in res) {
            if (res[i].minute > 0) {
              minutes.push(res[i].minute)
              tags.push(res[i].tagName)
            }
          }
        } else {
          tags.push("还没有学习")
          minutes.push(0)
        }
        that.setData({
          tags: tags,
          minutes: minutes
        })
        // 更新图表数据
        tag_chart.setOption({
          xAxis: [{
            data: tags
          }],
          series: [{
            data: minutes
          }]
        })
      },
      fail(err) {
        Toast.fail("获取标签统计数据失败")
      }
    })
  },
  /**
   * 获取每天的基本数据：每日学习时长，完成任务数量
   */
  getBasicDailyData(startTime, endTime) {
    let that = this
    wx.request({
      url: api.getDailyData,
      data: {
        "startTime": startTime,
        "endTime": endTime
      },
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync('token')
      },
      success(res) {
        if (res.data != "") {
          console.log("basic data")
          console.log(res)
          let learnTime = res.data['learnTime']
          let hours = Math.floor(learnTime / 60)
          let minutes = learnTime % 60
          let taskNum = res.data['taskNum']
          // 页面显示基本数据
          that.setData({
            today_study_hours: hours,
            today_study_minutes: minutes,
            today_task_count: taskNum,
            loading: false
          })
        }
        that.setData({
          loading: false
        })
      },
      fail(err) {
        Toast.fail("获取基本数据失败")
      }
    })
  },

  /**
   * 获取一天内完成任务的情况（任务名及总共时间）
   */
  getDayData(startTime, endTime) {
    let that = this
    wx.request({
      url: api.timeDistribution,
      data: {
        "startTime": startTime,
        "endTime": endTime
      },
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync('token')
      },
      success(res) {
        res = res.data
        let day_data = []
        if (res.length != 0) {
          // 转换数据格式
          for (let i in res) {
            let tmp = {}
            tmp['value'] = res[i].useTime
            tmp['name'] = res[i].taskName
            day_data.push(tmp)
          }
        } else {
          let tmp = {}
          tmp['value'] = 0
          tmp['name'] = "今日没有学习"
          day_data.push(tmp)
        }
        that.setData({
          day_data: day_data
        })
        // 更新图表数据
        day_chart.setOption({
          series: [{
            data: day_data
          }]
        })

      },
      fail(err) {
        Toast.fail("获取每月数据失败")
      }
    })
  },

  /**
   * 获取月度数据：每日总的学习时长
   */
  getMonthData(startTime, endTime) {
    let that = this
    let map = this.getDataMap(startTime, endTime)
    wx.request({
      url: api.monthAnalyze,
      data: {
        "startTime": startTime,
        "endTime": endTime
      },
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync('token')
      },
      success(res) {
        res = res.data
        let month_day = []
        let learn_time = []
        if (res.length != 0) {
          for (let i in res) {
            map[that.getMonthDay(res[i].day)] = res[i].learnTime
            // month_day.push(that.getMonthDay(res[i].day))
            // learn_time.push(res[i].learnTime)
          }
        }
        for (let key in map) {
          month_day.push(key)
          learn_time.push(map[key])
        }
        that.setData({
          month_day: month_day,
          learn_time: learn_time
        })
        // 更新图表数据
        month_chart.setOption({
          xAxis: [{
            data: month_day
          }],
          series: [{
            data: learn_time
          }]
        })

      },
      fail(err) {
        Toast.fail("获取月度数据失败")
      }
    })
  },

  getDataMap(startTime, endTime) {
    let days = parseInt((new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000 / 60 / 60 / 24) + 1;
    let month = new Date(startTime).getMonth() + 1
    let res = {}
    for (let i = 0; i < days; i++) {
      res[String(month) + '-' + String(i + 1)] = 0
    }
    return res
  },
  /**
   * 
   * @param {string} date
   * 根据日期获取该天的月份和天 
   */
  getMonthDay(date) {
    date = new Date(date)
    return `${date.getMonth() + 1}-${date.getDate()}`
  }
})