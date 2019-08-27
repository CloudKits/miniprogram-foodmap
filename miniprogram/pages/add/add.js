
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
   
  },
  chooseLocation: function (event) {
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userLocation']){
          wx.authorize({
            scope: 'scope.userLocation',
            success:res => {
              wx.chooseLocation({
                success: res => {
                  this.setData({
                    address: res.address,
                    latitude: res.latitude,
                    longitude: res.longitude,
                    name: res.name
                  })
                }
              })
            }
          })
        }else{
          wx.chooseLocation({
            success: res => {
              this.setData({
                address: res.address,
                latitude: res.latitude,
                longitude: res.longitude,
                name: res.name
              })
            }
          })
        }
      }
    })
    
  },
  createItem: function (event) {
    wx.showLoading({
      title: '上传数据中...',
    })
    let value = event.detail.value
    /**
     * @Task 4.5.8.3 完成数据新增的功能
     * 请在下方输入你的代码
     */
  },
  uploadImage: function (e) {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {

        wx.showLoading({ title: '上传中' })
        let tempFilePaths = res.tempFilePaths
        let items = [];
        for (const tempFilePath of tempFilePaths) {
          items.push({
            src: tempFilePath
          })
        }
        /**
         * @Task 4.5.8.2 实现图片的批量上传
         * 请在下方输入你的代码
         */

        this.setData({ tempPhoto: items })
      }
    })
  },
  uploadPhoto(filePath) {
    /**
     * @Task 4.5.8.1 完成图片上传的功能
     * 请在下方输入你的代码
     */
  }
})