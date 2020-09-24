const ApiRootURL = "https://www.ningxin.site/api"
module.exports = {
  createTask: ApiRootURL + "/task/createTask",
  getTask: ApiRootURL + "/task/getTask",
  deleteTask: ApiRootURL + "/task/deleteTask",
  updateTask: ApiRootURL + "/task/updateTask",
  submmit: ApiRootURL + "/task/submitRecord",
  getDailyData: ApiRootURL + "/data/getDailyData",
  monthAnalyze: ApiRootURL + "/data/monthAnalyze",
  timeDistribution: ApiRootURL + "/data/timeDistribution",
  createTag: ApiRootURL + "/admin/createCommonTag",
  deleteTag: ApiRootURL + "/admin/deleteCommonTag",
  adminLogin: ApiRootURL + "/auth/adminLogin",
  getCurrentUser: ApiRootURL + "/auth/getCurrentUser",
  login: ApiRootURL + "/auth/login",
  addDiary: ApiRootURL + "/data/addDiary",
  getDiaryByDate: ApiRootURL + "/data/getDiaryByDate",
  getTotalDiary: ApiRootURL + "/data/getTotalDiary",
  deleteDiaryById: ApiRootURL + "/data/delDiaryById",
  updateDiaryById: ApiRootURL + "/data/updateDiaryById",
  getTagDistribution: ApiRootURL + "/data/getTagDistribution",
  refreshTaskStatus: ApiRootURL + "/task/refreshTaskStatus",
  deleteUser: ApiRootURL + "/admin/delUser"
}