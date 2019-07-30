// pages/searchJob/searchJob.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchlist: [],
    keyword: '',
    edit: true,
    resData: []
  },
  select(e) {
    let { name } = e.currentTarget.dataset
    this.search(name)
    this.setData({ keyword: name })
  },
  inputKey(e) {
    let keyword = e.detail;
    if (keyword) {
      this.setData({ edit: false, keyword })
    }else {
      this.setData({ edit: true, keyword, resData: [] })
    }
  },
  search(word) {
    app.http({
      url: app.api.ApiIndexSearchLister,
      method: "POST",
      data: {
        keywords: word
      }
    }).then(res => {
      let { error_code, data } = res;
      if(error_code === 0) {
        this.setData({ edit: false, resData: data })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.http({
      url: app.api.ApiIndexSearch
    }).then(res => {
      let { error_code, data } = res;
      if(error_code === 0) {
        this.setData({ searchlist: data })
      }
    })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})