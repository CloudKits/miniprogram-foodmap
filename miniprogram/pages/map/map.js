const mta = require('../../vendor/mta_analysis.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '数据加载中...',
    })
    mta.Page.init();
    
    this.setData({
      windowHeight: app.globalData.windowHeight,
    }, () => {
      wx.hideLoading();
    });
    /**
     * 获取管理员身份校验
     */
    let is_admin = false;
    
    /**
     * 调用云函数检查用户身份
     */
    let result = wx.cloud.callFunction({
      name: "checkUserAuth"
    }).then(res => {
      this.setData({
        is_admin: res.result.data.is_administrator
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})