// pages/issue/issue.js
const app = getApp()
import Toast from '../../vant/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: 0,
        pageData: ''
    },
    status(e) {
        this.setData({ status: e.detail.index });
        this.getData();
    },
    del(e) {
        var id = e.currentTarget.dataset.id;
        app.http({
            url: app.api.ApiDelete,
            data: { id: id }
        }).then(res => {
            let { error_code, msg } = res;
            if (error_code === 0) {
                Toast.success(msg);
                this.getData();
            } else {
                Toast.fail(msg);
            }

        })
    },
    getData() {
        app.http({
            url: app.api.ApiMyRelease,
            data: { status: this.data.status }
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 0) {
                this.setData({
                    pageData: data
                })
            }
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
        this.getData();
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