Component({
  data: {
    active: 0, // 当前选中第几个tab
    list: [
      {
        "url": "/pages/index/index",
        "icon": "wap-home",
        "text": "首页"
      },
      {
        "url": "/pages/forum/forum",
        "icon": "smile-comment-o",
        "text": "论坛"
      },
      {
        "url": "/pages/test/test",
        "icon": "question-o",
        "text": "答题"
      },
      {
        "url": "/pages/person/person",
        "icon": 'friends-o',
        "text": "我的",
      }
    ],
    icon: [
      {
        normal: 'wap-home-o',
        active: 'wap-home'
      },
      {
        normal: 'smile-comment-o',
        active: 'smile-comment'
      },
      {
        normal: 'question-o',
        active: 'question'
      },
      {
        normal: 'friends-o',
        active: 'friends'
      },
    ]
  },
  // 组件的方法列表
  methods: {
    onChange(event) {
      // event.detail是vant-app的tabbar组件选择的序号
      // 相当于获取点击van-tabbar-item的序号
      this.setData({
        active: event.detail ,
      });
      this.switchTab(this.data.list[event.detail].url)
    },
    // 自定义tab切换方法增加回调
    switchTab(url, callback) {
      if (callback) {
        callback();
      }
      // 调用微信的switchTab切换tabbar
      wx.switchTab({ url });
    },
    init() {
      const page = getCurrentPages().pop();
      const index = this.data.list.findIndex(item => item.url === `/${page.route}`)
      this.changeIcon(index);
      this.setData({
        active: index
      });
    },

    changeIcon(index) {
      let arr = this.data.list;
      for (let i = 0; i < 4; i++) {
        if(i == index) {
          arr[i].icon = this.data.icon[i].active
        }else {
          arr[i].icon = this.data.icon[i].normal
        }
      }
      console.log(arr);
      this.setData({
        list:arr
      })
    }
  }
});