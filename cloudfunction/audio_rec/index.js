// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

var baidu = require('baidu-aip-sdk').speech

var APP_ID ="23983485"
var API_KEY = "HAEny47qUzMmIKdGHYEK6omR"
var SECRET_KEY = "GakyNe6hsvN69qbfLFjzplQcUvPFevkc"


// 云函数入口函数
exports.main = async (event, context) => {
  var client = new baidu(APP_ID,API_KEY,SECRET_KEY)

  var buffer = new Buffer.from(event.data.data)

  var res = await client.recognize(buffer,'pcm',16000)
  return res
}