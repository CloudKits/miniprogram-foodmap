const app = getApp();
const config = require('../../config.js');
const db = wx.cloud.database()
const store = db.collection('store');
const userInfo = db.collection('userInfo');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: config.center_longitude,
    latitude: config.center_latitude,
    windowHeight: 600,
    mapSubKey: config.mapSubKey,
    hideMe: true,
    showAdmin: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let showAdmin = config.show_admin ? true : false;

    if (app.globalData.showAdmin) {
      showAdmin = true;
    }

    wx.showLoading({
      title: '数据加载中...',
    })
    store.get().then(res => {
      let data = res.data;
      // 将 _id 给 id ,确保 marker 事件的正确触发
      data.map(item => {
        item.id = item._id
      });
      this.setData({
        stores: res.data,
        windowHeight: app.globalData.windowHeight,
        hideMe: false,
        showAdmin: showAdmin,
        defaultScale: config.default_scale
      }, () => {
        wx.hideLoading();
        wx.showToast({
          title: '双指缩放可以调整地图可视区域，查看更多美食',
          icon: 'none'
        })
      })
    })

    this.getOpenID()

    this.mapCtx = wx.createMapContext('map');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getCenterLocation();
  },

  onShow: function () {
    // #10 添加完成后更新一下 map
    store.get().then(res => {
      let data = res.data;
      data.map(item => {
        item.id = item._id
      });
      this.setData({
        stores: res.data
      })
    })
  },

  viewAll: function () {
    wx.navigateTo({
      url: '../list/list',
    })
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      wx.cloud.callFunction({
        name: 'checkUserAuth'
      }).then(res => {
        if (res.result.data.is_administrator) {
          app.globalData.is_administrator = true;
          wx.showModal({
            title: '管理员登陆成功',
            content: '管理员您好，是否要进入新增界面？',
            success: res => {
              if (res.cancel == false && res.confirm == true) {
                wx.navigateTo({
                  url: '../add/add',
                })
              } else {
                wx.showToast({
                  title: '您可以点击下方查看全部按钮管理已有数据',
                  icon: 'none'
                });
              }
            }
          })
        } else {
          wx.showToast({
            title: '您不是管理员，无法进入管理入口！',
            icon: 'none'
          });
        }
      })
    } else {
      // 处理未授权的场景
      wx.showModal({
        title: '授权失败',
        content: '您尚未授权获取您的用户信息，是否开启授权界面？',
        success: res => {
          if (res.confirm) {
            wx.openSetting({})
          }
        }
      })
    }
  },
  /**
   * 获取中心点经纬度
   */
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: (res) => {
        this.longitude=res.longitude;
        this.latitude=res.latitude;
        console.log("当前中心点的位置：", this.longitude, this.latitude);
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '我在' + config.appName + '上发现了好吃的，你也看看吧！',
      path: '/pages/map/map',
      imageUrl: "/images/share.jpg"
    }
  },
  onMarkerTap: function (event) {
    wx.navigateTo({
      url: '../info/info?id=' + event.markerId,
    })
  },
  getOpenID: function (event) {
    wx.cloud.callFunction({
      name: "getUserOpenId"
    }).then(res => {
      console.log('openID已复制', res)
      // wx.setClipboardData({
      //   data: res.result.openid,
      //   success: res => {
      //     wx.showToast({
      //       title: 'openID已复制',
      //     })
      //   }
      // })
    })
  },
  hideMe: function (res) {
    this.setData({
      hideMe: true
    })
  },
  showAdmin: function (res) {
    wx.setStorage({
      key: 'showAdmin',
      data: !this.data.showAdmin,
    })
    this.setData({
      showAdmin: !this.data.showAdmin
    })
  },
  search: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  }
})