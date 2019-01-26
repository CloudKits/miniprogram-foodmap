# 小程序云开发 - 美食图鉴模板


## 配置小程序

使用该小程序，你需要配置如下几个文件

### miniprogram/config.js

这个文件是小程序的核心配置文件，MTA 统计等工具的信息配置都在这里;其中：

1. `appName` : 小程序名称，在分享时会使用该名称
2. `mtaAppID`: 小程序在 MTA 的 AppID
3. `mtaEventID`: 小程序在 MTA 的 EventID
4. `envID` : 小程序云开发的环境 ID
5. `mapSubKey`:  小程序地图的 subKey
6. `center_longitude`: 小程序中心点的经度
7. `center_latitude`: 小程序中心点的纬度

### miniprogram/app.json

这个文件是小程序的基本配置文件，你需要配置默认的小程序标题

1. `navigationBarTitleText`: 这里是你的小程序的标题，建议和 `config.js` 文件中的 `appName` 保持一致，以确保不会使用户产生迷惑。