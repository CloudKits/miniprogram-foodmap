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
    mta.Page.init();
  },
  chooseLocation:function(event){
    wx.chooseLocation({
      success:res => {
        this.setData({
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude,
          name:res.name
        })
      }
    })
  },
  getMyLocation:function(event){
    wx.getLocation({
      success: res => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        },res => {
          wx.showToast({
            title: '位置获取成功',
            icon:"success"
          })
        })
      }
    })
  },
  createItem:function(event){
    let value = event.detail.value
    store.add({
      data:{
        ...value,
        thumbs_up:1,
        iconPath:"/images/food.png",
        longitude: this.data.longitude,
        latitude: this.data.latitude,
        label:{
          content:value.title
        }
      }
    }).then(res => {
      wx.showToast({
        title: '创建成功！',
        icon:'success'
      },res => {
        wx.navigateBack({});
      })
    }).catch(error => {
      console.error(error);
    })
  }
})