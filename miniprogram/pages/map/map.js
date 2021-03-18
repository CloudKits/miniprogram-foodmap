const app = getApp();
const config = require("../../config.js");
const db = wx.cloud.database();
const store = db.collection("store");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    stores: {},
    occurpyProblemNumber: 2,
    errorProblemNumber: 1,
    designProblemNumber: 3,
    longitude: config.center_longitude,
    latitude: config.center_latitude,
    windowHeight: 600,
    mapSubKey: config.mapSubKey,
    hideMe: true,
    showAdmin: false,
    windowHeight: app.globalData.windowHeight,
    defaultScale: config.default_scale,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let showAdmin = config.show_admin ? true : false;

    if (app.globalData.showAdmin) {
      showAdmin = true;
    }
    this.setData({
      showAdmin: showAdmin,
    });
    this.getOpenID();
    this.getCenterLocation();
    this.getMarkerData();
    this.data.mapCtx = wx.createMapContext("map");
    wx.showToast({
      title: "双指缩放可以调整地图可视区域",
      icon: "none",
    });
  },

  /**
   * 生命周期函数--监听页面的显示
   */

  onShow: function () {
    this.getMarkerData();
  },

  getMarkerData: function () {
    wx.showLoading({
      title: "数据加载中...",
    });

    store.get().then((res) => {
      let data = res.data;
      /**
       * 处理 occurpyProblemNumber,errorProblemNumber,designProblemNumber
       */
      let occurpyProblemNumber = 0;
      let errorProblemNumber = 0;
      let designProblemNumber = 0;
      res.data.forEach((item) => {
        if (item.label === "盲道破损") {
          errorProblemNumber++;
        } else if (item.label === "盲道占用") {
          occurpyProblemNumber++;
        } else if (item.label === "盲道设计") {
          designProblemNumber++;
        }
      });

      this.setData({
        occurpyProblemNumber,
        errorProblemNumber,
        designProblemNumber,
      });

      /***
       * 处理marker
       * 将 _id 给 id ,确保 marker 事件的正确触发
       */
      data.map((item) => {
        item.id = item._id;
        item.width = 20;
        item.height = 25;
        item.title = item.problemLabel;
        // const label = item.label;
        // item.label = { content: label, color: "#24292e", fontSize: 12 };
        // item.label = { content: "", color: "#24292e", fontSize: 12 };
      });
      this.setData({
          stores: data,
        },
        () => {
          wx.hideLoading();
        }
      );
    });
  },

  viewAll: function () {
    wx.navigateTo({
      url: "../list/list",
    });
  },

  addMarker: function () {
    wx.navigateTo({
      url: "../add/add",
    });
  },

  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      wx.cloud
        .callFunction({
          name: "checkUserAuth",
        })
        .then((res) => {
          if (res.result.data.is_administrator) {
            app.globalData.is_administrator = true;
            wx.showModal({
              title: "管理员登陆成功",
              content: "管理员您好，是否要进入新增界面？",
              success: (res) => {
                if (res.cancel == false && res.confirm == true) {
                  wx.navigateTo({
                    url: "../add/add",
                  });
                } else {
                  wx.showToast({
                    title: "您可以点击下方查看全部按钮管理已有数据",
                    icon: "none",
                  });
                }
              },
            });
          } else {
            wx.showToast({
              title: "您不是管理员，无法进入管理入口！",
              icon: "none",
            });
          }
        });
    } else {
      // 处理未授权的场景
      wx.showModal({
        title: "授权失败",
        content: "您尚未授权获取您的用户信息，是否开启授权界面？",
        success: (res) => {
          if (res.confirm) {
            wx.openSetting({});
          }
        },
      });
    }
  },

  /**
   * 获取用户经纬度
   */
  getCenterLocation: function () {
    wx.getLocation({
      type: "gcj02",
      success: (res) => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        });
        console.log(
          "当前中心点的位置：",
          this.data.longitude,
          this.data.latitude
        );
      },
      fail: (err) => {
        wx.showToast({
          title: "请确认你的手机GPS定位已经打开",
          icon: "fail",
        });
        console.log("err", err);
      },
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
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
    return {
      title: "我在" + config.appName + "上标记了一处盲道问题，你也快来加入我们吧",
      path: "/pages/map/map",
      imageUrl: "/images/share.jpg",
    };
  },

  onMarkerTap: function (event) {
    wx.navigateTo({
      url: "../info/info?id=" + event.markerId,
    });
  },

  getOpenID: function (event) {
    wx.cloud
      .callFunction({
        name: "getUserOpenId",
      })
      .then((res) => {
        console.log("openID已复制", res);
        // wx.setClipboardData({
        //   data: res.result.openid,
        //   success: res => {
        //     wx.showToast({
        //       title: 'openID已复制',
        //     })
        //   }
        // })
      });
  },
  addOccurpy: function () {
    this.setData({
      occurpyProblemNumber: this.data.occurpyProblemNumber + 1,
    });
  },
  hideMe: function (res) {
    this.setData({
      hideMe: true,
    });
  },
  showAdmin: function (res) {
    wx.setStorage({
      key: "showAdmin",
      data: !this.data.showAdmin,
    });
    this.setData({
      showAdmin: !this.data.showAdmin,
    });
  },
  search: function () {
    wx.navigateTo({
      url: "../search/search",
    });
  },
});