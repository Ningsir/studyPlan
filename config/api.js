const ApiRootURL = "https://www.ningxin.site/api"
exports.default = {
  createTask: ApiRootURL + "/task/createTask",
  getTask: ApiRootURL + "/task/getTask",
  submmit: ApiRootURL + "/task/submitRecord",
  getDailyData: ApiRootURL + "/data/getDailyData",
  monthAnalyze: ApiRootURL + "/data/monthAnalyze",
  timeDistribution: ApiRootURL + "/data/timeDistribution",
  createTag: ApiRootURL + "/admin/createCommonTag",
  deleteTag: ApiRootURL + "/admin/deleteCommonTag",
  adminLogin: ApiRootURL + "/auth/adminLogin",
  getCurrentUser: ApiRootURL + "/auth/getCurrentUser",
  login: ApiRootURL + "/auth/login"
}