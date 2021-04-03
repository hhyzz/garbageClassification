// pages/testTime/testTime.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerOptions: [
      {
        id: 0,
        name: '可回收物',
      },
      {
        id: 1,
        name: '其他垃圾',
      },
      {
        id: 2,
        name: '厨余垃圾',
      },
      {
        id: 3,
        name: '有害垃圾',
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

  },

  //单选函数
  radioChoose: function (e) {
    var that = this
    var this_checked = e.currentTarget.dataset.id
    var answerOptionsList = this.data.answerOptions
    for (var i = 0; i < answerOptionsList.length; i++) {
      if (answerOptionsList[i].id == this_checked) {
        answerOptionsList[i].checked = true;
      }
      else {
        answerOptionsList[i].checked = false;
      }
    }
    console.log(answerOptionsList);
    that.setData({
      isChecked: true,
      answerOptions: answerOptionsList
    })
  },

  goNext() {
    let isChecked = this.data.isChecked;
    if (!isChecked) {
      wx.showModal({
        showCancel: false,
        content: '请选择答案',
        confirmColor: '#6e9bcc'
      })
    } else {
      wx.navigateTo({
        url: '../result/result',
      })
    }
  }
})