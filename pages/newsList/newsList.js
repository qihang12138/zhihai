// pages/newsList/newsList.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageData: {}
    },

    getData(id) {
        app.http({
            url: app.api.ApiNews,
            data: {
                type: id
            }
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 0) {
                data.forEach(item => {
                    item.time = app.util.YMD(new Date(item.time * 1000));
                })
                this.setData({
                    pageData: data
                })
            }
            wx.stopPullDownRefresh()
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var id = options.id - 0,
            title = ['新闻资讯', '专业学习', '机构大学']
        wx.setNavigationBarTitle({
            title: title[id]
        })
        this.getData(id);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        this.getData();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})