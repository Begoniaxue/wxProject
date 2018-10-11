//index.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    myProducts: [],
    deltipHid:true,
    isSuc:true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  beginDraw:function(){
    wx.navigateTo({
      url: '../draw/draw'
    })
  },
  onLoad: function () {
    // wx.clearStorageSync()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.getStorage({
      key: 'myImg',
      success:response=> {
        this.setData({myProducts:response.data})
      }
    })
  },
  onReady:function(){
   

  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showDeleteTip:function(e){
    this.setData({ deltipHid:false});
    this.data.myProducts.splice(e.currentTarget.dataset.value,1)
    wx.setStorage({
      key: 'myImg',
      data:  this.data.myProducts,
    })
    this.setData({ myProducts: this.data.myProducts})
  },
  saveImg:function(e){
    var that = this;
        //保存到手机相册
       wx.saveImageToPhotosAlbum({
         filePath: e.currentTarget.dataset.value,
         success:function(res){
           that.setData({ isSuc:false})
           setTimeout(function () {
             that.setData({ isSuc: true })
          
           }, 1000)
         },
         fail:function(){
           console.log('fail')
         }
       })
  }
})
