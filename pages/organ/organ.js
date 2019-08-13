// pages/organ/organ.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageData: '',
        tabsOn: 0,
        tabs: ''
    },
    tabsOn(e) {
        var id = e.currentTarget.dataset.id,
            data = this.data.pageData,
            tabs = [data.comper, data.near, data.goods]
        this.setData({
            tabsOn: id,
            tabs: tabs[id]
        })
    },
    toSearch() {
        wx.navigateTo({
            url: '/pages/searchOrgan/searchOrgan'
        })
    },
    getData() {
        app.http({
            url: app.api.ApiOrganIndex
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 0) {
                this.setData({
                    pageData: data,
                    tabs: data.comper
                })
            }
            wx.stopPullDownRefresh()
        })
    },
    nav(e) {
        var lat = e.currentTarget.dataset.lat - 0,
            lng = e.currentTarget.dataset.lng - 0;
        wx.openLocation({
            latitude: lat,
            longitude: lng,
            scale: 18
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