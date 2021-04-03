// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    way: 0,
    value: '',
    searchStorage: [],
    haveHistory: false,
    isMask: false,
    searchResults: {},
    garbageClassification: [
      {
        id: 0,
        className: '可回收垃圾',
        classUrl: '../../images/kehuishouwu.png',
        tips: ["尽量保持清洁干燥，避免污染", "立体包装物请清空内容物，清洁后压扁投放", "废纸应保持平整", "废玻璃制品及带尖锐角物品，应包裹后投放"]
      },
      {
        id: 1,
        className: '干垃圾或其他垃圾',
        classUrl: '../../images/qitalaji.png',
        tips: ["针对有水分的其他垃圾，应尽量沥干水分再投入容器内", "日常生活中遇到成分复杂、不易分离归类的物品，应投入其他垃圾容器内"]
      },
      {
        id: 2,
        className: '湿垃圾或厨余垃圾',
        classUrl: '../../images/chuyulaji.png',
        tips: ["纯流质的食物垃圾，如牛奶等，应直接倒入下水口","有包装的湿垃圾应将包装物去除后分类投放，包装物请投放对应的垃圾容器"]
      },
      {
        id: 3,
        className: '有害垃圾或干垃圾',
        classUrl: '../../images/youhailaji.png',
        tips: ["杀虫剂等压力罐装容器，应排空内容物后投放", "投放时请注意轻放", "易破损的请连带包装或包裹后轻放", "如易挥发，请密封后投放"]
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      way: options.way
    })
    this.openLocationsercher();
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

  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },

  onSearch() {
    var _this = this;
    if (_this.data.value.length == 0) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: 'https://api.66mz8.com/api/garbage.php',
        data: {
          name: _this.data.value
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          setTimeout(function () {
            wx.hideLoading()
          }, 500)

          // 修改内部数据
          let searchResults = res.data;
          if (searchResults.code == 200) {
            let garbageClassification = _this.data.garbageClassification;
            let id = 0;
            switch (res.data.data) {
              case "干垃圾或其他垃圾":
                id = 1;
                break;
              case "湿垃圾或厨余垃圾":
                id = 2;
                break;
              case "有害垃圾或干垃圾":
                id = 3;
                break;
            }
            searchResults.classUrl = garbageClassification[id].classUrl;
            searchResults.tips = garbageClassification[id].tips;

            _this.setData({
              searchResults: searchResults,
              isMask: !_this.data.isMask
            })
          } else {
            wx.showToast({
              title: searchResults.msg,
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: function () {
          console.log("请求失败");
        }
      })
      _this.updateHistory();
    }
  },

  //搜索记录点击搜索
  historySearch(e) {
    this.setData({
      value: e.currentTarget.dataset.name
    })
    this.onSearch()
  },

  //更新搜索记录
  updateHistory() {
    var _this = this;
    //将搜索记录更新到缓存
    var searchData = _this.data.searchStorage;
    var id = searchData.findIndex(_this.checkData);
    if (id != -1) {
      var item = searchData.splice(id, 1);
    }

    searchData.unshift({
      name: _this.data.value
    })

    wx.setStorageSync('searchData', searchData);
    _this.openLocationsercher();
  },

  checkData(e) {
    return e.name == this.data.value
  },

  //清除缓存历史
  clearSearchStorage() {
    let _this = this;
    wx.showModal({
      content: '确定清除搜索记录',
      success(res) {
        if (res.confirm) {
          wx.removeStorageSync('searchData')
          _this.setData({
            searchStorage: [],
            haveHistory: false,
          })
        }
      }
    })
  },

  //打开历史记录列表
  openLocationsercher() {
    let searchData = wx.getStorageSync('searchData');
    if (searchData.length > 0) {
      this.setData({
        searchStorage: wx.getStorageSync('searchData'),
        haveHistory: true
      })
    }
  },

  //隐藏结果弹窗
  hiddenMask() {
    this.setData({
      isMask: !this.data.isMask
    })
  },
  //录音

	 // 手指触摸开始
  touchStart: function () {
    var that = this
    console.log('录音中...')
    wx.showLoading({
      title: '正在录音',
    })
    wx.getRecorderManager().start() //开始录音api
  },
  // 手指触摸结束
  touchEnd: function () {
    var that = this
    console.log('录音结束')
    wx.showLoading({
      title: '正在识别语音',
    })
    wx.getRecorderManager().stop() //录音结束api
    wx.getRecorderManager().onStop((res) => {
      console.log(res)
      var time = res.duration //录音的时间
      var tempFilePath = res.tempFilePath //录音的路径
      if (time < 800) {
        wx.showToast({
          title: '说话时间太短',
          icon: 'none',
          duration: 1000
        })
      } else {
        //调用后台接口把录音转化成文字
      }
    });
  },

})