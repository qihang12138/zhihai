const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        autoplay: true,
        interval: 5000,
        duration: 1000,
        circular: true,
        pageData: ''
    },
    toSearch() {
        wx.navigateTo({
            url: '/pages/searchJob/searchJob'
        })
    },
    getData() {
        app.http({
            url: app.api.ApiIndex
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 0) {
                data.news.forEach(item => {
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
        this.getData();
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