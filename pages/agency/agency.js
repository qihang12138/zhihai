// pages/perfect/perfect.js
import area from '../../utils/area.js'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        areaList: area,
        scaleShow: false,
        ageShow: false,
        siteShow: false,
        pageData: '',
        ageList: [],
        scaleList: [],
        age: '',
        scale: '',
        msgObj: {
            name: '',
            yid: '',
            pid: '',
            addr: '',
            phone: '',
            marry: '',
            content: '',
            image: [],
            logo: ''
        }
    },
    textInput(e) {
        let {
            detail: {
                value
            },
            currentTarget: {
                dataset: {
                    type
                }
            }
        } = e
        this.setData({
            ['msgObj.' + type]: value
        })
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
                    ['msgObj.yid']: id,
                    age: item.name
                })
            }
        })
        this.onClose();
    },
    scaleShow() {
        this.setData({ scaleShow: true })
    },
    changeScale(e) {
        var scale = this.data.scaleList,
            id = e.detail.id
        scale.forEach(item => {
            if (item.id === id) {
                this.setData({
                    ['msgObj.pid']: id,
                    scale: item.name
                })
            }
        })
        this.onClose();
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
    },
    onClose() {
        this.setData({
            scaleShow: false,
            ageShow: false,
            siteShow: false
        });
    },
    changeMsgObj(e) {
        var id = e.currentTarget.dataset.id;
        var msgObj = "msgObj." + id;
        this.setData({
            [msgObj]: e.detail
        });
    },
    toggleSex() {
        let sexShow = this.data.sexShow;
        this.setData({
            sexShow: !sexShow
        })
    },
    selectSex(e) {
        let { name } = e.detail;
        this.setData({
            ['msgObj.sex']: name
        })
        this.toggleSex()
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
    bindDateChange(e) { // 选择出生日期
        let { value } = e.detail;

        this.setData({
            ['msgObj.birth']: value
        })
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
    getData() {
        app.http({
            url: app.api.ApiOrganType
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 0) {
                this.setData({
                    ageList: data.age,
                    scaleList: data.people
                })
            }
        })

        app.http({
            url: app.api.ApiOrgan
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 1) {
                this.setData({
                    msgObj: data
                })
            }
        })


    },
    submit() {
        let { msgObj } = this.data;
        let flag = true;

        for (const key in msgObj) {
            if (msgObj.hasOwnProperty(key)) {
                const element = msgObj[key];
                if (!element.length) {
                    flag = false;
                    break;
                }
            }
        }

        if (!flag) {
            app.util.toast({
                title: '请填写完整资料',
                icon: 'none'
            })
            return
        }

        app.util.verifyPhone(msgObj.phone).then(res => {
            app.http({
                url: app.api.ApiDancerSave,
                data: msgObj,
                method: 'POST'
            }).then(res => {
                let { error_code, msg } = res;

                app.util.toast({
                    title: msg,
                    icon: error_code === 0 ? 'success' : 'none'
                }).then(() => {
                    if (error_code === 0) {
                        // 提交成功soming

                    }
                })
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