// pages/classify/classify.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageData: '',
        dancerData: '',
        columns: '',
        show: false,
        type: '',
        msgObj: {
            tid: 0,
            eid: 0,
            mid: 0,
            addr: '',
        }
    },
    getData() {
        app.http({
            url: app.api.ApiType
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 0) {
                this.setData({
                    pageData: data
                })
            }
        })
    },
    classify(e) {
        var type = e.currentTarget.dataset.id,
            types = ['type', 'edu', 'major'],
            data = this.data.pageData,
            columns = []
        data[types[type]].forEach(item => {
            columns.push(item.name)
        });
        this.setData({
            type: type,
            columns: columns,
            show: true
        });
    },
    onConfirm(e) {
        var type = this.data.type,
            types = ['addr', 'eid', 'mid'],
            msgObj = 'msgObj.' + types[type];
        this.setData({
            [msgObj]: e.detail.index,
            show: false
        })
        this.postData()
    },
    onClose() {
        this.setData({
            show: false
        })
    },
    changeTab(e) {
        var msgObj = 'msgObj.tid'
        this.setData({
            [msgObj]: e.detail.index
        })
        this.postData()
    },
    postData() {
        app.http({
            url: app.api.ApiTypeLister,
            data: this.data.msgObj,
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
        this.getData();
        this.postData();
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