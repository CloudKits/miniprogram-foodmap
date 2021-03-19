Component({
  properties: {
    //属性值可以在组件使用时指定
    isCanDraw: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal) {
        newVal && this.drawPic();
      },
    },
  },
  data: {
    isModal: false, //是否显示拒绝保存图片后的弹窗
    imgDraw: {}, //绘制图片的大对象
    sharePath: "", //生成的分享图
    visible: false,
  },
  methods: {
    handlePhotoSaved() {
      this.savePhoto(this.data.sharePath);
    },
    handleClose() {
      this.setData({
        visible: false,
      });
    },
    drawPic() {
      if (this.data.sharePath) {
        //如果已经绘制过了本地保存有图片不需要重新绘制
        this.setData({
          visible: true,
        });
        this.triggerEvent("initData");
        return;
      }
      wx.showLoading({
        title: "生成中",
      });
      this.setData({
        imgDraw: {
          width: "1210rpx",
          height: "1830rpx",
          background:
            "https://6d61-map-4g0ciu1x80002ab0-1305236624.tcb.qcloud.la/poster/poster.png?sign=8e64452badeadc8e80770a1b6bcf6a67&t=1616160878",
          views: [
            // 图画
            {
              type: "image",
              url:
                "https://6d61-map-4g0ciu1x80002ab0-1305236624.tcb.qcloud.la/poster/art.png?sign=732932151b7b452221a989d97a46f7ba&t=1616160915",
              css: {
                top: "680rpx",
                left: "260rpx",
                width: "674rpx",
                height: "500rpx",
                borderRadius: "16rpx",
                borderWidth: "20rpx",
                borderColor: "#ffffff",
                shadow: "0px 1px 5px #B8B8B8",
              },
            },

            // 头像
            {
              type: "image",
              url:
                wx.getStorageSync("avatarUrl") ||
                "https://qiniu-image.qtshe.com/default-avatar20170707.png",
              css: {
                top: "80rpx",
                left: "480rpx",
                width: "254rpx",
                height: "254rpx",
                borderWidth: "3rpx",
                borderColor: "#0063a9",
                borderRadius: "127rpx",
              },
            },
            {
              type: "text",
              text: wx.getStorageSync("nickName") || "微信昵称获取失败",
              css: {
                top: "360rpx",
                left: "600rpx",
                fontSize: "80rpx",
                align: "center",
                color: "black",
                fontWeight: "bolder",
              },
            },
            {
              type: "text",
              text: `已成为第`,
              css: {
                top: "500rpx",
                left: "250rpx",
                fontSize: "50rpx",
                align: "left",
                color: "black",
                fontWeight: "normal",
              },
            },
            {
              type: "text",
              text: `1`,
              css: {
                top: "500rpx",
                left: "460rpx",
                fontSize: "50rpx",
                align: "left",
                color: "#006de4",
                fontWeight: "normal",
              },
            },
            {
              type: "text",
              text: `位上传盲道问题的筑路`,
              css: {
                top: "500rpx",
                left: "500rpx",
                fontSize: "50rpx",
                align: "left",
                color: "black",
                fontWeight: "normal",
              },
            },
            {
              type: "text",
              text: `者，并获得了视障人士分享的视界`,
              css: {
                top: "560rpx",
                left: "250rpx",
                fontSize: "50rpx",
                align: "left",
                color: "black",
                fontWeight: "normal",
              },
            },

            // 二维码
            {
              type: "image",
              url: "https://qiniu-image.qtshe.com/20190605index.jpg",
              css: {
                bottom: "80rpx",
                left: "180rpx",
                width: "220rpx",
                height: "220rpx",
                borderRadius: "110rpx",
              },
            },

            {
              type: "text",
              text: `<<看与被看>>`,
              css: {
                bottom: "540rpx",
                left: "605rpx",
                fontSize: "50rpx",
                align: "center",
                color: "black",
                fontWeight: "normal",
              },
            },

            {
              type: "text",
              text: `摄影师：傅高山 |`,
              css: {
                bottom: "470rpx",
                left: "340rpx",
                fontSize: "50rpx",
                align: "left",
                color: "black",
                fontWeight: "normal",
              },
            },

            {
              type: "text",
              text: `低视力`,
              css: {
                bottom: "470rpx",
                left: "730rpx",
                fontSize: "50rpx",
                align: "left",
                color: "#006de4",
                fontWeight: "normal",
              },
            },
          ],
        },
      });
    },
    onImgErr(e) {
      wx.hideLoading();
      wx.showToast({
        title: "生成分享图失败，请刷新页面重试",
      });
    },
    onImgOK(e) {
      wx.hideLoading();
      this.setData({
        sharePath: e.detail.path,
        visible: true,
      });
      //通知外部绘制完成，重置isCanDraw为false
      this.triggerEvent("initData");
    },
    preventDefault() {},
    // 保存图片
    savePhoto(path) {
      wx.showLoading({
        title: "正在保存...",
        mask: true,
      });
      this.setData({
        isDrawImage: false,
      });
      wx.saveImageToPhotosAlbum({
        filePath: path,
        success: (res) => {
          wx.showToast({
            title: "保存成功",
            icon: "none",
          });
          setTimeout(() => {
            this.setData({
              visible: false,
            });
          }, 300);
        },
        fail: (res) => {
          wx.getSetting({
            success: (res) => {
              let authSetting = res.authSetting;
              if (!authSetting["scope.writePhotosAlbum"]) {
                this.setData({
                  isModal: true,
                });
              }
            },
          });
          setTimeout(() => {
            wx.hideLoading();
            this.setData({
              visible: false,
            });
          }, 300);
        },
      });
    },
  },
});
