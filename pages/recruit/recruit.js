// pages/recruit/recruit.js
const app = getApp()
import Toast from '../../vant/toast/toast';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        msgObj: {
            name: '',
            age: '',
            edu: '',
            money: '',
            content: '',
            addr: '',
            phone: '',
        }
    },
    changeMsgObj(e) {
        var id = e.currentTarget.dataset.id,
            msgObj = 'msgObj.' + id
        this.setData({
            [msgObj]: e.detail
        })
    },
    submit() {
        app.http({
            url: app.api.ApiSaveJob,
            data: this.data.msgObj,
            method: 'POST'
        }).then(res => {
            let { error_code, data, msg } = res;
            if (error_code === 1) {
                Toast(msg);
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},
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