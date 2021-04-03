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
            classUrl: '../../images/kehuishouwu.png',
          },
          {
            id: 1,
            className: '其它垃圾',
            classUrl: '../../images/qitalaji.png',
          },
          {
            id: 2,
            className: '厨余垃圾',
            classUrl: '../../images/chuyulaji.png',
          },
          {
            id: 3,
            className: '有害垃圾',
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
    
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },

  onSearch(e) {
    wx.navigateTo({
      url: '../search/search?way=' + e.currentTarget.dataset.way,
    })
  },
  
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().init();
  },


  //跳转登陆页面
  toLogin() {
    wx.navigateTo({
      url: '../login/login',
    })
  }
})
