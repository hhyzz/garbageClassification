// pages/forum/forum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scopeOptions: [
      {
        id: 0,
        name: '可回收物',
      },
      {
        id: 1,
        name: '其它垃圾',
      },
    ],
    show: false,
    actions: [
      {
        name: '本周内',
      },
      {
        name: '本月内',
      },
      {
        name: '全部',
      },
    ],
    ischecked: 0,
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
    this.getTabBar().init();
  },

  onChooseShow() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    console.log(event.detail);
  },

  changeTab(e) {
    this.setData({ ischecked: e.currentTarget.dataset.id });
  },

  goTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },

  goEdit() {
    wx.navigateTo({
      url: '../editPost/editPost',
    })
  }
})