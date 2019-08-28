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
     * @task #10 完成数据新增的功能
     * @chapter 1.5.8.3  完成数据新增的功能
     * 请取消下方代码的注释
     */

    // store.add({
    //   data: {
    //     ...value,
    //     thumbs_up: 1,
    //     iconPath: "/images/food.png",
    //     longitude: this.data.longitude,
    //     latitude: this.data.latitude,
    //     label: {
    //       content: value.title
    //     },
    //     images: this.data.images
    //   }
    // }).then(res => {
    //   wx.hideLoading();
    //   wx.showToast({
    //     title: '创建成功！',
    //     icon: 'success',
    //     success: res => {
    //       wx.navigateBack({
    //       })
    //     }
    //   })
    // }).catch(error => {
    //   console.error(error);
    // })
    
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
         * @task #9 实现图片的批量上传
         * @chapter 1.5.8.2  实现图片的批量上传
         * 请取消下方代码的注释
         */

        // const uploadTask = items.map(item => this.uploadPhoto(item.src))

        // Promise.all(uploadTask).then(result => {

        //   let urls = [];
        //   for (const file of result) {
        //     urls.push(file.fileID);
        //   }
        //   this.setData({
        //     images: urls
        //   }, res => {
        //     wx.hideLoading();
        //     wx.showToast({ title: '上传图片成功', icon: 'success' })
        //   })
        // }).catch(() => {
        //   wx.hideLoading()
        //   wx.showToast({ title: '上传图片错误', icon: 'error' })
        // })



        this.setData({ tempPhoto: items })
      }
    })
  },
  uploadPhoto(filePath) {

    /**
     * @task #8 完成图片上传功能
     * @chapter 1.5.8.1  完成图片上传功能
     * 请取消下方代码的注释
     */

    // return wx.cloud.uploadFile({
    //   cloudPath: `${Date.now()}-${Math.floor(Math.random(0, 1) * 10000000)}.png`,
    //   filePath
    // })
  }
})