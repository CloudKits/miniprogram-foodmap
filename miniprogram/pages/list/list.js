
const app = getApp();
const db = wx.cloud.database()
const store = db.collection('store');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numbers: 0,
    stores: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  
    this.loadData();
  },
  loadData: function() {
    /**
     * @Task 4.5.6 开发列表功能
     * 请在下方输入你的代码
     */
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.loadData();
  },
  navigateToSearch:function(e){
    wx.redirectTo({
      url: '../search/search',
    })
  }
})