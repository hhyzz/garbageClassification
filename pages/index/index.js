//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    value: '',
    active: 0,
    loading: false,
    classLists: {
      success: true,
      message: 'string',
      statusCode: 200,
      data: {
        count: 4,
        results: [
          {
            id: 0,
            className: '可回收物',
            classSynopsis: '可回收物主要包括废纸、塑料、玻璃、金属和布料五大类。这些垃圾通过综合处理回收利用，可以减少污染，节省资源。',
            classUrl: '../../images/kehuishouwu.png',
          },
          {
            id: 1,
            className: '其它垃圾',
            classSynopsis: '其他垃圾（上海称干垃圾）包括除上述几类垃圾之外的砖瓦陶瓷、渣土、卫生间废纸、纸巾等难以回收的废弃物及尘土、食品袋（盒）。',
            classUrl: '../../images/qitalaji.png',
          },
          {
            id: 2,
            className: '厨余垃圾',
            classSynopsis: '厨余垃圾（上海称湿垃圾）包括剩菜剩饭、骨头、菜根菜叶、果皮等食品类废物。经生物技术就地处理堆肥，每吨可生产0.6~0.7吨有机肥料。',
            classUrl: '../../images/chuyulaji.png',
          },
          {
            id: 3,
            className: '有害垃圾',
            classSynopsis: '有害垃圾含有对人体健康有害的重金属、有毒的物质或者对环境造成现实危害或者潜在危害的废弃物。这些垃圾一般使用单独回收或填埋处理。',
            classUrl: '../../images/youhailaji.png',
          },
        ],
      },
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    Toast('搜索' + this.data.value);
  },
  onClick() {
    Toast('搜索' + this.data.value);
  }
})
