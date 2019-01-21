const mta = require('vendor/mta_analysis.js');
App({
  onLaunch: function (options) {
    mta.App.init({
      "appID": "500668228",
      "eventID": "500668246",
      "statShareApp": true,
      "statReachBottom": true,
      "lauchOpts": options,
    });
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
  }
})
