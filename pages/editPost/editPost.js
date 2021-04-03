// pages/editPost/editPost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    title_length: 0,
    text_length: 0,
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

  cancel() {
    wx.switchTab({
      url: `/pages/forum/forum`,
    })
  },

  inputsTitle(e) {
    var value = e.detail.value;
    this.setData({
      title_length: value.length
    })
  },

  inputsContent(e) {
    var value = e.detail.value;
    this.setData({
      text_length: value.length
    })
  },

  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      },
    });
  },
})