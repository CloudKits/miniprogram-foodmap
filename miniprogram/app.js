const config = require('config.js');
App({
  onLaunch: function (options) {
    
    /**
     * 初始化云开发
     * @Task 4.5.2 初始化云开发能力
     */
    
    /**
     * 获取屏幕高度
     */
    let { windowHeight } = wx.getSystemInfoSync();
    let showAdmin = wx.getStorageSync('showAdmin');
    if (showAdmin == ""){
      showAdmin = false;
    }
    this.globalData = { windowHeight, is_administrator: false, showAdmin: showAdmin}
  }
})
