// pages/searchJob/searchJob.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageData: [],
        keyword: '',
        edit: true,
        ageShow: false,
        peopleShow: false,
        resData: [],
        msgObj: {
            aid: '',
            pid: '',
            addr: ''
        },
        peopleList: '',
        ageList: ''
    },
    ageShow() {
        this.setData({ ageShow: true })
    },
    changeAge(e) {
        var age = this.data.ageList,
            id = e.detail.id
        age.forEach(item => {
            if (item.id === id) {
                this.setData({
                    ['msgObj.aid']: id,
                    age: item.name
                })
            }
        })
        this.onClose();
        this.postData();
    },
    peopleShow() {
        this.setData({ peopleShow: true })
    },
    changePeople(e) {
        var age = this.data.ageList,
            id = e.detail.id
        age.forEach(item => {
            if (item.id === id) {
                this.setData({
                    ['msgObj.aid']: id,
                    age: item.name
                })
            }
        })
        this.onClose();
        this.postData();
    },
    onClose() {
        this.setData({
            ageShow: false,
            peopleShow: false
        })
    },
    postData(e) {
        let { msgObj } = this.data;
        if (e) {
            var type = e.currentTarget.dataset.type
            if (type === 'all') {
                msgObj = {
                    aid: 0,
                    pid: 0,
                    addr: ''
                }
            }
        }
        app.http({
            url: app.api.ApiLister,
            data: msgObj,
            method: 'POST'
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
        app.http({
            url: app.api.ApiSearch
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 0) {
                this.setData({
                    searchlist: data,
                    ageList: data.age,
                    peopleList: data.people
                })
            }
        })
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