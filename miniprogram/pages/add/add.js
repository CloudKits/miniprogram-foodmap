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
  createItem:function(event){
    wx.showLoading({
      title: '上传数据中...',
    })
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
        },
        images: this.data.images
      }
    }).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '创建成功！',
        icon:'success',
        success:res => {
          wx.navigateBack({
          })
        }
      })
    }).catch(error => {
      console.error(error);
    })
  },
  uploadImage:function(e){
    wx.chooseImage({
      count:9,
      success: res => {
        let img_array = [];
        console.log(res);
        for(let i = 0;i < res.tempFilePaths.length; i++){
          wx.cloud.uploadFile({
            cloudPath: `${Date.now()}-${Math.floor(Math.random(0, 1) * 10000000)}.png`,
            filePath: res.tempFilePaths[i]
          }).then(res => {
            img_array.push(res.fileID)
          })
        }
        this.setData({
          images: img_array
        },res => {
          wx.showToast({
            title: '图片上传成功!',
          });
        })
      }
    })
  }
})