// 引入SDK核心类
let QQMapWX = require('../libs/qqmap-wx-jssdk.js');
// 引入项目密钥配置
let {
  mapSubKey
} = require('../config.js');

// 实例化API核心类
let qqmapsdk = new QQMapWX({
  key: mapSubKey
});

module.exports = {
  qqmapsdk: qqmapsdk
}; 