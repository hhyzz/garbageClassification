// pages/search/search.js

//
const record_manager=wx.getRecorderManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authed: false,
    camera: false,
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
    recording: false,
    result:'',
    resultBox: false,
    photoSrc: '',
    goCamera: false,
    photoResult: '',
    photoResultBox: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      way: options.way
    })
    this.openLocationsercher();
    if (options.way == 1) {
      this.get_record_auth();
    }
    if (options.way == 2) {
      this.get_camera_auth();
    }
  },

  //获取录音权限
  get_record_auth() {
    var that = this;
    wx.getSetting().then(res=> {
      if (res.authSetting['scope.record']) {
        that.setData({authed: true})
      } else {
        wx.authorize({
          scope: 'scope.record',
        }).then(res=> {
          that.setData({ authed: true })
        }).catch(err=> {
          that.cancel_auth()
        })
      }
    })
  },

  cancel_auth() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '未授权无法录音！',
      cancelText: '不授权',
      confirmText: '去授权',
      success: res => {
        if (res.confirm) {
          wx.openSetting({
            success(res) {
              if (res.authSetting['scope.record']) {
                that.setData({authed: true})
              }
            }
          })
        }
      }
    })
  },

  //获取拍照权限
  get_camera_auth() {
    var that = this;
    wx.getSetting().then(res => {
      if (res.authSetting['scope.camera']) {
        that.setData({ camera: true })
      } else {
        wx.authorize({
          scope: 'scope.camera',
        }).then(res => {
          that.setData({ camera: true })
        }).catch(err => {
          that.cancel_camera()
        })
      }
    })
  },

  cancel_camera() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '未授权无法拍照！',
      cancelText: '不授权',
      confirmText: '去授权',
      success: res => {
        if (res.confirm) {
          wx.openSetting({
            success(res) {
              if (res.authSetting['scope.camera']) {
                that.setData({ camera: true })
              }
            }
          })
        }
      }
    })
  },

  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },

  // 点击搜索触发
  onSearch() {
    var _this = this;
    if (_this.data.value.length == 0) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none',
        duration: 2000
      })
    } else {
      _this.inSearch(_this.data.value);
      _this.updateHistory();
    }
  },

  // 调用接口识别物品
  inSearch(e) {
    var _this = this;
    wx.showLoading({
      title: '查询中',
    })
    wx.request({
      url: 'https://api.66mz8.com/api/garbage.php',
      data: {
        name: e
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
    const options={
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 48000,
      format: 'PCM'
    }
    record_manager.start(options) //开始录音api
    this.setData({
      recording: true
    })
  },
  // 手指触摸结束
  touchEnd: function () {
    record_manager.stop() //录音结束api
    this.setData({ 
      recording: false,
      resultBox: false,
     })
    this.bind_stop()
  },

  bind_stop() {
    var that = this;
    record_manager.onStop(res => {
      console.log(res)
      var time = res.duration //录音的时间
      var tf = res.tempFilePath //录音的路径
      console.log(time);

      if (time < 800) {
        wx.showToast({
          title: '说话时间太短',
          icon: 'none',
          duration: 1000
        })
      } else {
        const fs = wx.getFileSystemManager()
        fs.readFile({
          filePath: tf,
          success(res) {
            const buffer = res.data
            console.log(buffer);
            that.audio_rec(buffer)
          }
        })
      }
    });
  },

  // 调用云函数识别
  audio_rec(data) {
    var that = this;
    wx.showLoading({
      title: '语音识别中',
    })
    wx.cloud.callFunction({
      name:'audio_rec',
      data:{data}
    }).then(res=>{
      console.log(res)
      if(res.errMsg=="cloud.callFunction:ok" && res.result.err_no==0){
        var result_list = res.result.result
        this.setData({
          result: (result_list.join('')).replace(/。/g,''),
          resultBox: true
        })
        wx.hideLoading()
      } else {
        wx.showToast({
          title: '识别失败',
          icon: 'none'
        })
      }
    }).catch(err=>{
      console.log("err", err);
      wx.showToast({
        title: '识别失败',
        icon: 'none'
      })
    })
  },

  // 语音识别结果查询
  recordSearch() {
    this.inSearch(this.data.result)
  },

  // 拍照图像识别物品
  takePhoto() {
    let goCamera = this.data.goCamera
    if (!goCamera) {
      this.setData({
        goCamera: true
      })
    } else {
      const ctx = wx.createCameraContext()
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          console.log(res)
          this.setData({
            photoSrc: res.tempImagePath,
            goCamera: false
          })

          let filePath = res.tempImagePath;
          const cloudPath = `imageRecognition/${Date.now()}${filePath.match(/\.[^.]+?$/)}`

          // 上传照片临时路径
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success:res=> {
              let fileID = res.fileID;
              wx.showLoading({
                title: '识别中',
              })

              // 调用云函数
              wx.cloud.callFunction({
                name: 'camera_rec',
                data: { fileID }
              }).then(res => {
                console.log(res.result.info.result)
                if (res.errMsg == "cloud.callFunction:ok" && res.result.info.result.length > 0) {
                  this.setData({
                    photoResult: res.result.info.result,
                    photoResultBox: true
                  })
                  wx.hideLoading()
                } else {
                  wx.showToast({
                    title: '识别失败',
                    icon: 'none'
                  })
                }
              }).catch(err => {
                console.log("err", err);
                wx.showToast({
                  title: '识别失败',
                  icon: 'none'
                })
              })
            }
          })
        }
      })
    }
  },

  // 点击照片识别后的物品查询
  photoSearch(e) {
    this.inSearch(e.currentTarget.dataset.keyword)
  }

})