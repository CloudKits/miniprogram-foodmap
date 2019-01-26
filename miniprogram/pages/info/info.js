const mta = require('../../vendor/mta_analysis.js');
const app = getApp();
const db = wx.cloud.database()
const store = db.collection('store');
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
    wx.loadFontFace({
      family:"iconfont",
      source:"https://cdnjs.loli.net/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf"
    })
    mta.Page.init();
    store.doc(options.id).get().then(res => {
      this.setData({
        store: res.data
      })
    })
  },
  tapImage:function(e){
    wx.previewImage({
      urls: this.data.store.images,
      current: e.currentTarget.dataset.url
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  callContact:function(event){
    wx.makePhoneCall({
      phoneNumber: this.data.store.contact
    })
  }
})