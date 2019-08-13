// pages/company/company.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageData: '',
        id: 0,
        phone: ''
    },
    callPhone(e) {
        let { phone } = e.currentTarget.dataset;

        wx.makePhoneCall({
            phoneNumber: phone
        })
    },
    getData() {
        var id = this.data.id;
        app.http({
            url: app.api.ApiOrganDetail + '?id=' + id
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 0) {
                var phone = data.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
                this.setData({
                    pageData: data,
                    phone: phone
                })
            }
        })
    },
    getUser() {
        app.http({
            url: app.api.ApiUserIndex
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 0) {
                this.setData({
                    level: data.level
                })
                console.log(this.data.level);
            }
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
        this.setData({ id: options.id })
        this.getData();
        this.getUser();
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