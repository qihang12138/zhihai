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
        logoThumb: '',
        thumbs: [],
        ball: true,
        msgObj: {
            name: '',
            yid: '',
            pid: '',
            addr: '',
            phone: '',
            marray: '',
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
        console.log(value, type);

    },
    singleUpload() {
        let _this = this,
            { msgObj } = this.data;

        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                const tempFilePaths = res.tempFilePaths,
                    tempImg = tempFilePaths[0];
                _this.setData({ logoThumb: tempImg })
                app.upload({
                    url: app.api.ApiAddImg,
                    filePath: tempImg,
                    name: 'image'
                }).then(res => {
                    msgObj.logo = res.data
                    _this.setData({ msgObj: msgObj })
                })
            }
        })
    },
    ageShow() {
        this.setData({ ageShow: true })
        this.ballShow();
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
        this.ballShow();
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
        this.ballShow();
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
    ballShow() {
        this.setData({ ball: false })
    },
    onClose() {
        this.setData({
            scaleShow: false,
            ageShow: false,
            siteShow: false,
            ball: true
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
    previewImage(e) {
        let { current } = e.currentTarget.dataset, { thumbs } = this.data;

        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: thumbs // 需要预览的图片http链接列表
        })
    },
    addImgs() {
        let { thumbs, msgObj } = this.data,
            _this = this;

        if (msgObj.image.length >= 9) {
            app.util.toast({
                title: '最大只能上传9张',
                icon: 'none'
            })
            return
        }

        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
                if (msgObj.image.length + tempFilePaths.length >= 9) {
                    app.util.toast({
                        title: '最大只能上传9张',
                        icon: 'none'
                    })
                    return
                }
                // TODO: 数组去重(好像不需要了)
                thumbs = thumbs.concat(tempFilePaths)
                _this.setData({ thumbs })
                tempFilePaths.forEach(item => {
                    // TODO: 封装多图上传函数
                    app.upload({
                        url: app.api.ApiAddImg,
                        filePath: item,
                        name: 'image'
                    }).then(res => {
                        msgObj.image.push(res.data)
                    })
                })
            }
        })

        this.setData({ msgObj: msgObj })
        console.log(this.data.msgObj);

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
                let { ageList, scaleList } = this.data;
                ageList.forEach(item => {
                    if (item.id === data.yid) {
                        this.setData({ age: item.name })
                    }
                });
                scaleList.forEach(item => {
                    if (item.id === data.pid) {
                        this.setData({ scale: item.name })
                    }
                })
                this.setData({
                    msgObj: data,
                    thumbs: data.image,
                    logoThumb: data.logo
                })
                console.log(data.logo);

            }

        })
    },
    delImg(e) {
        var thumbs = this.data.thumbs,
            id = e.currentTarget.dataset.id
        thumbs.splice(id, 1);
        this.setData({ thumbs: thumbs });

    },
    submit() {
        let { msgObj } = this.data;
        let flag = true;
        msgObj.pid += ''
        msgObj.yid += ''
        for (const key in msgObj) {
            if (msgObj.hasOwnProperty(key)) {
                const element = msgObj[key];
                if (element === '' || element.length === 0) {
                    console.log(element);
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
        var oldMsg = this.data.msgObj;
        oldMsg.image = oldMsg.image.map(item => {
            return item.slice(item.indexOf('/uploads'));

        })
        console.log(oldMsg.image);

        oldMsg.logo = oldMsg.logo.slice(oldMsg.logo.indexOf('/uploads'));
        var newMsg = {
            name: oldMsg.name,
            yid: oldMsg.yid,
            pid: oldMsg.pid,
            addr: oldMsg.addr,
            phone: oldMsg.phone,
            marray: oldMsg.marray,
            content: oldMsg.content,
            image: oldMsg.image,
            logo: oldMsg.logo
        }
        app.http({
                url: app.api.ApiOrganSave,
                data: newMsg,
                method: 'POST'
            }).then(res => {
                let { error_code, msg } = res;

                app.util.toast({
                    title: msg,
                    icon: error_code === 0 ? 'success' : 'none'
                }).then(() => {
                    if (error_code === 0) {
                        // 提交成功soming
                        wx.navigateBack({
                            delta: 1
                        })

                    }
                })
            })
            // app.util.verifyPhone(msgObj.phone).then(res => {

        // })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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