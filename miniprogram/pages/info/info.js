const mta = require('../../vendor/mta_analysis.js');
const app = getApp();
const db = wx.cloud.database()
const store = db.collection('store');
const config = require('../../config.js');
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
    wx.showLoading({
      title: '加载中...',
    })
    mta.Page.init();
    store.doc(options.id).get().then(res => {
      this.setData({
        store: res.data
      },res => {
        wx.hideLoading();
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
    let path = '/pages/info/info?id=' + this.data.store._id;
    let image = "/images/share.jpg";
    if (this.data.store.images[0]){
      wx.cloud.getTempFileURL({
        fileList: [this.data.store.images[0]],
        success: res =>{
          return {
            title: '我在' + config.appName + '上发现了好吃的，你也看看吧！',
            path: path,
            imageUrl: res.fileList[0].tempFileURL
          }
        },
        fail: error => {
          console.error("出现Bug了",error)
        }
      })
    }else{
      return {
        title: '我在' + config.appName + '上发现了好吃的，你也看看吧！',
        path: path,
        imageUrl: image
      }
    }
    
  },
  callContact:function(event){
    wx.makePhoneCall({
      phoneNumber: this.data.store.contact
    })
  }
})