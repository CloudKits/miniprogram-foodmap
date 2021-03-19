//index.js

Page({
  data: {
    painting: {},
    shareImage: "",
    userAvatarUrl: "",
    userName: "",
  },
  onLoad() {
    // this.eventDraw()
  },
  eventDraw() {
    wx.showLoading({
      title: "绘制分享图片中",
      mask: true,
    });
    this.setData({
      painting: {
        width: 375,
        height: 555,
        clear: true,
        views: [
          // 海报底图
          {
            type: "image",
            url: "../../images/share/poster.png",
            top: 0,
            left: 0,
            width: 375,
            height: 555,
          },
          // 用户头像
          {
            type: "image",
            url: this.data.userAvatarUrl,
            top: 100,
            left: 180,
            width: 90,
            height: 90,
          },
          // 用户昵称
          {
            type: "text",
            content: `${this.data.userName},谢谢你`,
            fontSize: 20,
            color: "#402D16",
            textAlign: "center",
            top: 160,
            left: 190,
            bolder: true,
          },
          {
            type: "text",
            content: "已成为第一位上传盲道问题的筑路",
            fontSize: 15,
            color: "#563D20",
            textAlign: "left",
            top: 180,
            left: 80,
          },
          // {
          //   type: "image",
          //   url: "../../images/share/art.png",
          //   top: 180,
          //   left: 48,
          //   width: 280,
          //   height: 180,
          // },
          // {
          //   type: "text",
          //   content: "<<看与被看>>",
          //   fontSize: 20,
          //   lineHeight: 24,
          //   color: "#212121",
          //   textAlign: "center",
          //   top: 380,
          //   left: 190,
          //   width: 100,
          // },
        ],
      },
    });
  },
  eventSave() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success(res) {
        wx.showToast({
          title: "保存图片成功",
          icon: "success",
          duration: 2000,
        });
      },
    });
  },
  eventGetImage(event) {
    console.log(event);
    wx.hideLoading();
    const { tempFilePath, errMsg } = event.detail;
    if (errMsg === "canvasdrawer:ok") {
      this.setData({
        shareImage: tempFilePath,
      });
    }
  },
  onGotUserInfo: function (e) {
    console.log("nickename", e.detail.userInfo.nickName);
    console.log("avatarUrl", e.detail.userInfo.avatarUrl);
    this.setData(
      {
        userName: e.detail.userInfo.nickName,
        userAvatarUrl: e.detail.userInfo.avatarUrl,
      },
      function () {
        this.eventDraw();
      }
    );
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("xxxxx");
    return {
      title:
        "我在" + config.appName + "上标记了一处盲道问题，你也快来加入我们吧",
      path: "/pages/map/map",
      imageUrl: "/images/share.jpg",
    };
  },
  /**
   * 用户分享到朋友圈
   */
  onShareTimeline: function () {
    console.log("xxxxx");
    return {
      title:
        "我在" + config.appName + "上标记了一处盲道问题，你也快来加入我们吧",
      path: "/pages/map/map",
      imageUrl: "/images/share.jpg",
    };
  },
});
