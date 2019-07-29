// pages/perfect/perfect.js
import area from '../../utils/area.js'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        areaList: area,
        majorShow: false,
        eduShow: false,
        tagShow: false,
        pageData: '',
        columns: [],
        siteShow: false,
        tags: [],
        tag: '',
        msgObj: {
            name: '',
            sex: '',
            age: '',
            major: '',
            edu: '',
            addr: '',
            tel: '',
            tag: []
        }
    },
    onChange(event) {
        const { picker, value, index } = event.detail;
        console.log(event);
        var msgObj = "msgObj.addr";
        this.setData({

        })
    },
    onClose() {
        this.setData({
            majorShow: false,
            eduShow: false,
            siteShow: false
        });
    },
    site() {
        this.setData({ siteShow: true })
    },
    changeMsgObj(e) {
        var id = e.currentTarget.dataset.id;
        var msgObj = "msgObj." + id;
        this.setData({
            [msgObj]: e.detail
        });
    },
    confirm(e) {
        var msgObj = "msgObj.addr";
        var addr = ''
        e.detail.values.forEach(item => {
            addr += item.name + ' '
        })
        this.setData({
            [msgObj]: addr,
            confirm: true
        });
        this.onClose();
        console.log(this.data.msgObj)
    },
    majorShow() {
        var data = this.data.pageData.major;
        var columns = [];
        data.forEach(item => {
            columns.push(item.name)
        });
        this.setData({
            columns: columns,
            majorShow: true
        })
    },
    changeMajor(e) {
        var msgObj = "msgObj.major"
        this.setData({
            [msgObj]: e.detail.value,
        })
        this.onClose();
    },
    changeEdu(e) {
        var msgObj = "msgObj.edu"
        this.setData({
            [msgObj]: e.detail.value,
        })
        this.onClose();
    },
    eduShow() {
        var data = this.data.pageData.edu;
        var columns = [];
        data.forEach(item => {
            columns.push(item.name)
        });
        this.setData({
            columns: columns,
            eduShow: true
        })
    },
    tagShow() {
        this.setData({
            tagShow: true
        })
    },
    onTag(e) { // 选择职业标签
        var { id, index } = e.currentTarget.dataset,
        { tagList, tags } = this.data;

        tags.indexOf(id) > -1 ? tags.splice( tags.indexOf(id), 1) : tags.push(id)
        tagList[index].status = !tagList[index].status;
        
        // 按顺序选中id
        // var resTag = tagList.filter(item => item.status).map(item => item.id)
        // console.log('resTag: ', resTag);
        this.setData({
            tags: tags,
            tagList: tagList
        })
    },
    changeTag() {
        var msgObj = "msgObj.tag"
        this.setData({
            [msgObj]: this.data.tag,
        })
        this.onClose();
    },
    getData() {
        app.http({
            url: app.api.ApiDancerType
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 0) {
                // data.news.forEach(item => {
                //     item.time = app.util.YMD(new Date(item.time * 1000));
                // })
                data.tag.forEach(item => {
                    item.status = false
                })
                this.setData({
                    pageData: data,
                    tagList: data.tag
                })
            }
        })
    },
    submit() {
        app.http({
            url: app.api.ApiDancerSave,

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