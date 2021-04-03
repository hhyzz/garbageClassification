// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: true,
    ismask: true,
    isNoVerified: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  toChangeBox: function () {
    this.setData({
      isLogin: !this.data.isLogin
    })
  },

  showMask: function() {
    this.setData({
      ismask: !this.data.ismask
    })
  },
})