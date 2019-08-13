// pages/about/about.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageData: '',
        header: '',
        id: 0
    },
    callPhone(e) {
        let { phone } = e.currentTarget.dataset;

        wx.makePhoneCall({
            phoneNumber: phone
        })
    },
    getData(id, url) {
        app.http({
            url: url + '?id=' + this.data.id
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 0) {
                if (data.image == null) {
                    data.image = '../../image/header.png'
                }
                this.setData({
                    pageData: data,
                    header: data.image
                })
                console.log(this.data.header);

            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({ id: options.id })

        var url = options.teach == 1 ? app.api.ApiTeacherDetail : app.api.ApiDetail
        this.getData(options.id, url);
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