// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

var AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;

var APP_ID = "24005893"
var API_KEY = "wEkoh2eK4FAQMwXcFGmtPjEK"
var SECRET_KEY = "nS97D2DW1T8gxVa4f1w3NKKcr8U1UY8G"

// 云函数入口函数
exports.main = async (event, context) => {
  var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY)

  const { fileID } = event;

  const res = await cloud.downloadFile({
    fileID
  })

  const buffer = res.fileContent;
  let image = buffer.toString("base64");

  // 调用通用物体识别
  const info = await client.advancedGeneral(image)
  
  return {
    info
  }
}