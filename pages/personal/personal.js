// pages/personal/personal.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        level: ['未认证', '舞者', '机构'],
        identity: false,
        show: false
    },
    getData() {
        app.http({
            url: app.api.ApiUserIndex
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 0) {
                this.setData({
                    pageData: data
                })
                if (data.level === 2) {
                    this.setData({ identity: true });
                    app.http({
                        url: app.api.ApiUserIndex
                    }).then(res => {

                    })
                }
            }
        })
    },
    show() {
        this.setData({ show: true })
    },
    onClose() {
        this.setData({ show: false })
    },
    onChange(e) {
        this.setData({
            identity: e.detail.id
        })
        this.onClose();
    },
    // 未认证
    unverified() {
        app.util.toast({
            title: '请先认证机构',
            icon: 'none'
        }).then(() => {
            wx.navigateTo({
                url: '/pages/agency/agency'
            })
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