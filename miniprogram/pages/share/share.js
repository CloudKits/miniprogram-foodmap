const config = require("../../config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("xxxxx")
    return {
      title: "我在" + config.appName + "上标记了一处盲道问题，你也快来加入我们吧",
      path: "/pages/map/map",
      imageUrl: "/images/share.jpg",
    };
  },
  /**
   * 用户分享到朋友圈
   */
  onShareTimeline: function () {
    console.log("xxxxx")
    return {
      title: "我在" + config.appName + "上标记了一处盲道问题，你也快来加入我们吧",
      path: "/pages/map/map",
      imageUrl: "/images/share.jpg",
    };
  },

  onShare: function () {
    wx.onShareTimeline(function () {
      console.log("xxxxx")
      return {
        title: "我在" + config.appName + "上标记了一处盲道问题，你也快来加入我们吧",
        path: "/pages/map/map",
        imageUrl: "/images/share.jpg",
      };
    })
  }
})