// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()  
  const administrator = process.env.ADMIN.split('|');

  /**
   * @task #13 添加管理员身份校验函数 ID
   * @chapter 1.5.10.2  添加管理员身份校验函数 ID
   * 请取消下方代码的注释
   */

  // if (administrator.indexOf(wxContext.OPENID) == -1){
  //   return {
  //     data:{
  //       is_administrator:false
  //     }
  //   }
  // }else{
  //   return {
  //     data: {
  //       is_administrator: true
  //     }
  //   }
  // }

}