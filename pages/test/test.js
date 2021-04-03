// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    numberOptions: [
      {
        id: 0,
        name: '20道题',
      },
      {
        id: 1,
        name: '30道题',
      },
      {
        id: 2,
        name: '40道题',
      },
      {
        id: 3,
        name: '50道题',
      },
    ],
    isChecked: false,
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
    this.setData({
      isChecked: false,
      numberOptions: [
        {
          id: 0,
          name: '20道题',
        },
        {
          id: 1,
          name: '30道题',
        },
        {
          id: 2,
          name: '40道题',
        },
        {
          id: 3,
          name: '50道题',
        },
      ],
    })
  },

  //单选函数
  radioChoose: function (e) {
    var that = this
    var this_checked = e.currentTarget.dataset.id
    var numberOptionsList = this.data.numberOptions
    for (var i = 0; i < numberOptionsList.length; i++) {
      if (numberOptionsList[i].id == this_checked) {
        numberOptionsList[i].checked = true;
      }
      else {
        numberOptionsList[i].checked = false;
      }
    }
    that.setData({
      isChecked: true,
      numberOptions: numberOptionsList
    })
  },

  toVerify() {
    let isChecked = this.data.isChecked;
    if (!isChecked) {
      wx.showModal({
        showCancel: false,
        content: '请选择答题题数',
        confirmColor: '#6e9bcc'
      })
    } else {
      wx.navigateTo({
        url: '../testTime/testTime',
      })
    }
  }

})