// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()  
  const administrator = process.env.ADMIN.split('|');
  
  /**
   * @Task 4.5.10.2  添加管理员身份校验函数
   * 请在下方输入你的代码
   */

}