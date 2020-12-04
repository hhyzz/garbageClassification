Component({
  data: {
    active: 0, // 当前选中第几个tab
    icon: {
      home: 'wap-home',
      forum:'smile-comment-o',
      test:'question-o',
      person:'friends-o',
    },
  },
  // 组件的方法列表
  methods: {
    onChange: function (event) {
      // event.detail是vant-app的tabbar组件选择的序号
      // 相当于获取点击van-tabbar-item的序号
      if (event.detail === 0) {
        this.switchTab("/pages/index/index");
        // 设置选中
        this.setData({
          active: event.detail,
          icon:{
            home: 'wap-home',
            forum:'smile-comment-o',
            test:'question-o',
            person:'friends-o',
          }
        });
      } else if(event.detail === 1){
        this.switchTab("/pages/index/index");
        // 设置选中
        this.setData({
          active: event.detail,
          icon:{
            home: 'wap-home-o',
            forum:'smile-comment',
            test:'question-o',
            person:'friends-o',
          }
        });
      } else if(event.detail === 2){
        this.switchTab("/pages/index/index");
        // 设置选中
        this.setData({
          active: event.detail,
          icon:{
            home: 'wap-home-o',
            forum:'smile-comment-o',
            test:'question',
            person:'friends-o',
          }
        });
      } else {
        this.switchTab("/pages/index/index");
        // 设置选中
        this.setData({
          active: event.detail,
          icon:{
            home: 'wap-home-o',
            forum:'smile-comment-o',
            test:'question-o',
            person:'friends',
          }
        });
      }
    },
    // 自定义tab切换方法增加回调
    switchTab: function (url, callback) {
      if (callback) {
        callback();
      }
      // 调用微信的switchTab切换tabbar
      wx.switchTab({ url });
    }
  }
});