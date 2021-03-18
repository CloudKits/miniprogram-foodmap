const app = getApp();
const db = wx.cloud.database();
const store = db.collection("store");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    problemLabel: "",
    images: [],
    imagesTempUrl: [],
    content: "",
    iconPath: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  chooseLocation: function (event) {
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting["scope.userLocation"]) {
          wx.authorize({
            scope: "scope.userLocation",
            success: (res) => {
              wx.chooseLocation({
                success: (res) => {
                  this.setData({
                    address: `${res.address} ${res.name}`,
                    latitude: res.latitude,
                    longitude: res.longitude,
                  });
                },
              });
            },
          });
        } else {
          wx.chooseLocation({
            success: (res) => {
              this.setData({
                address: `${res.address}+${res.name}`,
                latitude: res.latitude,
                longitude: res.longitude,
              });
            },
          });
        }
      },
    });
  },

  createItem: function (event) {
    wx.showLoading({
      title: "上传数据中...",
    });

    store
      .add({
        data: {
          address: this.data.address,
          longitude: this.data.longitude,
          latitude: this.data.latitude,
          problemLabel: this.data.problemLabel,
          iconPath: this.data.iconPath,
          images: this.data.images,
          content: event.detail.value.content,
        },
      })
      .then((res) => {
        wx.hideLoading();
        wx.showToast({
          title: "创建成功！",
          icon: "success",
          success: (res) => {
            wx.navigateTo({
              url: "../map/map",
            });
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  },

  getImageUrl: function (fileList) {
    wx.cloud.getTempFileURL({
      fileList,
      success: (res) => {
        const imagesTempUrl = this.data.imagesTempUrl;
        res.fileList.forEach((item) => {
          if (item.tempFileURL)
            imagesTempUrl.push({
              url: item.tempFileURL,
              isImage: true,
              deletable: false,
            });
        });
        this.setData({
          imagesTempUrl,
        });
      },
      fail: (err) => {
        console.log("id转换为临时链接失败", err);
      },
    });
  },

  uploadImage: function (e) {
    wx.chooseImage({
      count: 9,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        wx.showLoading({ title: "上传中" });
        let tempFilePaths = res.tempFilePaths;
        let items = [];
        for (const tempFilePath of tempFilePaths) {
          items.push({
            src: tempFilePath,
          });
        }
        const uploadTask = items.map((item) => this.uploadPhoto(item.src));

        Promise.all(uploadTask)
          .then((result) => {
            let urls = [];
            for (const file of result) {
              urls.push(file.fileID);
            }

            this.getImageUrl(urls);

            const images = this.data.images;

            images.push(...urls);

            this.setData(
              {
                images,
              },
              (res) => {
                wx.hideLoading();
                wx.showToast({ title: "上传图片成功", icon: "success" });
              }
            );
          })
          .catch(() => {
            wx.hideLoading();
            wx.showToast({ title: "上传图片错误", icon: "error" });
          });

        this.setData({ tempPhoto: items });
      },
    });
  },
  uploadPhoto(filePath) {
    return wx.cloud.uploadFile({
      cloudPath: `${Date.now()}-${Math.floor(
        Math.random(0, 1) * 10000000
      )}.png`,
      filePath,
    });
  },

  onChangeRadio(event) {
    const problemLabel = event.detail;
    let iconPath = "";
    switch (problemLabel) {
      case "盲道占用":
        iconPath = "/images/marker/occupy.png";
        break;

      case "盲道设计":
        iconPath = "/images/marker/design.png";
        break;

      default:
        iconPath = "/images/marker/error.png";
        break;
    }
    this.setData({
      problemLabel,
      iconPath,
    });
  },
});
