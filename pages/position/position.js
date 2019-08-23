// pages/position//position.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageData: '',
        id: 0,
        star: 0
    },
    getData() {
        app.http({
            url: app.api.ApiDetailJob,
            data: {
                id: this.data.id
            }
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 0) {
                data.time = app.util.YMD(new Date(data.time * 1000));
                this.setData({
                    pageData: data,
                    star: data.sc - 0
                })
            }
        })
    },
    resume() {
        app.http({
            url: app.api.ApiApplyJob,
            data: {
                jid: this.data.id
            }
        }).then(res => {
            if (res.error_code === 0) {
                app.util.toast({
                    title: '投递成功'
                })
            } else {
                app.util.toast({
                    title: '请勿重复投递',
                    icon: 'none'
                })
            }
        })
    },
    changeStar() {
        var star = this.data.star,
            id = this.data.pageData.id
        app.http({
            url: app.api.ApiCollection,
            data: {
                id: id
            }
        }).then(res => {
            if (res.error_code === 0) {
                this.setData({ star: !star })
            }
        })



    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({ id: options.id })
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