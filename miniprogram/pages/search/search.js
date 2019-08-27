const app = getApp();
const db = wx.cloud.database()
const store = db.collection('store');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numbers: 0,
    stores: [],
    focus:false,
    searched:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      focus:true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onReachBottom: function () {
    this.loadData();
  },
  loadData:function(keywords){
    /**
     * @Task 4.5.9 完成搜索功能
     * 请在下方输入你的代码
     */
  },
  search:function(e){
    this.setData({
      keywords: e.detail.value
    },res => {
      this.loadData();
    }) 
  }
})