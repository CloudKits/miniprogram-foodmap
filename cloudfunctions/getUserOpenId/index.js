// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  /**
   * @task #12 获取用户身份 ID
   * @chapter 1.5.10.1  获取用户身份 ID
   * 请取消下方代码的注释
   */

  // const wxContext = cloud.getWXContext()

  // return {
  //   openid: wxContext.OPENID
  // }
}