// pages/recruit/recruit.js
const app = getApp()
import Toast from '../../vant/toast/toast';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ageShow: false,
        eduShow: false,
        moneyShow: false,
        msgObj: {
            name: '',
            age: '',
            edu: '',
            money: '',
            content: '',
            addr: '',
            phone: '',
        },
        age: [
            { name: '1-3年' },
            { name: '3-5年' },
            { name: '5-8年' },
            { name: '8年以上' }
        ],
        edu: [
            { name: '高中' },
            { name: '大专' },
            { name: '本科' },
            { name: '研究生' }
        ],
        money: [
            { name: '3-5k' },
            { name: '5-8k' },
            { name: '8-10k' },
            { name: '10k以上' }
        ]
    },
    changeMsgObj(e) {
        var id = e.currentTarget.dataset.id,
            msgObj = 'msgObj.' + id
        this.setData({
            [msgObj]: e.detail
        })
    },
    ageShow() {
        this.setData({
            ageShow: true
        })
    },
    eduShow() {
        this.setData({
            eduShow: true
        })
    },
    moneyShow() {
        this.setData({
            moneyShow: true
        })
    },
    selectAge(e) {
        let { name } = e.detail;
        this.setData({
            ['msgObj.age']: name
        });
        this.onClose()
    },
    selectEdu(e) {
        let { name } = e.detail;
        this.setData({
            ['msgObj.edu']: name
        });
        this.onClose()
    },
    selectMoney(e) {
        let { name } = e.detail;
        this.setData({
            ['msgObj.money']: name
        });
        this.onClose()
    },
    onClose() {
        this.setData({
            ageShow: false,
            eduShow: false,
            moneyShow: false,
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