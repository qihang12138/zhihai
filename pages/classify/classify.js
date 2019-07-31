// pages/classify/classify.js
const app = getApp()
import area from '../../utils/area.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        areaList: area,
        pageData: {},
        dancerData: '',
        columns: '',
        active: 0,
        show: false,
        type: '',
        msgObj: {
            tid: 0,
            eid: 0,
            mid: 0,
            addr: '',
        }
    },
    getData(active) {
        app.http({
            url: app.api.ApiType
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 0) {
                this.setData({
                    pageData: data,
                    ['msgObj.tid']: active
                })
                this.postData()
            }
        })
    },
    classify(e) {
        var type = e.currentTarget.dataset.id,
            types = ['edu', 'major'],
            data = this.data.pageData,
            columns = []
        if (type) {
            data[types[type]].forEach(item => {
                columns.push(item.name)
            });
            this.setData({
                type: type,
                columns: columns,
                show: true
            });
        }
    },
    siteShow() {
        this.setData({ siteShow: true })
    },
    changeSite(e) {
        var site = '';
        e.detail.values.forEach(item => {
            if (item.name !== site) {
                site += item.name
            }
        })
        this.setData({
            ['msgObj.addr']: site,
        })
        this.onClose();
        this.postData()
    },
    onConfirm(e) {
        var type = this.data.type,
            types = ['eid', 'mid'],
            msgObj = 'msgObj.' + types[type];
        this.setData({
            [msgObj]: e.detail.index,
            show: false
        })
        this.postData()
    },
    onClose() {
        this.setData({
            show: false,
            siteShow: false
        })
    },
    changeTab(e) {
        let { msgObj } = this.data;
        msgObj = {
            tid: e.detail.index,
            eid: 0,
            mid: 0,
            addr: ''
        }
        this.setData({
            msgObj,
            active: e.detail.index
        })
        this.postData()
    },
    postData(e) {
        let { msgObj, active } = this.data;
        if (e) {
            var type = e.currentTarget.dataset.type
            if (type === 'all') {
                msgObj = {
                    tid: active,
                    eid: 0,
                    mid: 0,
                    addr: ''
                }
            }
        }
        app.http({
            url: app.api.ApiTypeLister,
            data: msgObj,
            method: 'POST'
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 0) {
                this.setData({
                    dancerData: data
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({ active: options.active })
        this.getData(options.active);
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