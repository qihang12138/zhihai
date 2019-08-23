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
        siteShow: false,
        sexShow: false,
        yearShow: false,
        pageData: '',
        columns: [],
        edu: '',
        major: '',
        ball: true,
        sexlist: [{
                name: '男'
            },
            {
                name: '女'
            },
            {
                name: '保密'
            }
        ],
        flag: 0,
        tags: [],
        tag: '',
        thumbs: [],
        msgObj: {
            username: '',
            sex: '',
            birth: '',
            major: '',
            edu: '',
            addr: '',
            home: '',
            phone: '',
            tag: [],
            marray: '',
            work: '',
            edu_history: '',
            school: '',
            honor_img: [],
            papers: '',
            teach_time: []
        },
        timeList: [''],
        teach_time: ''
    },
    changeTime(e) {
        this.setData({
            teach_time: e.detail
        });
        var teach_time = this.data.teach_time.join(",")
        console.log(teach_time);

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
    toggleSex() {
        let sexShow = this.data.sexShow;
        this.setData({
            sexShow: !sexShow,
            ball: false
        })
    },
    selectSex(e) {
        let { name } = e.detail;
        this.setData({
            ['msgObj.sex']: name
        })
        this.toggleSex()
        this.ballShow();
    },
    ballShow() {
        this.setData({ ball: false })
    },
    onClose() {
        this.setData({
            majorShow: false,
            eduShow: false,
            siteShow: false,
            tagShow: false,
            ball: true,
            timeShow: false,
            yearShow: false
        });
    },
    site() {
        this.setData({ siteShow: true })
        this.ballShow();
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
        this.ballShow();
    },
    changeMajor(e) {
        this.setData({
            major: e.detail.name,
            ['msgObj.major']: e.detail.id
        })
        this.onClose();
    },
    changeYear(e) {
        this.setData({
            teach_year: e.detail.name,
            ['msgObj.teach_year']: e.detail.id
        })
        this.onClose();
    },
    changeEdu(e) {
        this.setData({
            edu: e.detail.name,
            ['msgObj.edu']: e.detail.id
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
        this.ballShow();
    },
    tagShow() {
        this.setData({
            tagShow: true
        })
        this.ballShow();
    },
    timeShow() {
        this.setData({
            timeShow: true
        })
        this.ballShow();
    },
    yearShow() {
        this.setData({
            yearShow: true
        })
        this.ballShow();
    },
    onTag(e) { // 选择职业标签
        var { id, index } = e.currentTarget.dataset, { tagList, msgObj } = this.data;

        msgObj.tag.indexOf(id) > -1 ? msgObj.tag.splice(msgObj.tag.indexOf(id), 1) : msgObj.tag.push(id)
        tagList[index].status = !tagList[index].status;

        // 按顺序选中id
        var resTag = tagList.filter(item => item.status).map(item => item.name)
            // console.log('resTag: ', resTag);
        this.setData({
            ['msgObj.tag']: msgObj.tag,
            tagList: tagList,
            tags: resTag
        })
    },
    onTime(e) { // 选择职业标签
        var { id, index } = e.currentTarget.dataset, { timeList, msgObj } = this.data;

        msgObj.teach_time.indexOf(id) > -1 ? msgObj.teach_time.splice(msgObj.teach_time.indexOf(id), 1) : msgObj.teach_time.push(id)
        timeList[index].status = !timeList[index].status;

        // 按顺序选中id
        var resTime = timeList.filter(item => item.status).map(item => item.name)
            // console.log('resTag: ', resTag);
        this.setData({
            ['msgObj.teach_time']: msgObj.teach_time,
            timeList: timeList,
            teach_time: resTime
        })
    },
    getData() {
        app.http({
            url: app.api.ApiDancerType
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 0) {
                data.tag.forEach(item => {
                    item.status = false
                })
                data.teach_time.forEach(item => {
                    item.status = false
                })
                this.setData({
                    pageData: data,
                    majorlist: data.major,
                    edulist: data.edu,
                    tagList: data.tag,
                    timeList: data.teach_time,
                    yearList: data.teach_year
                })
            }
        })

        app.http({
            url: app.api.ApiDancer
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 1) {
                let tagList = this.data.tagList,
                    tags = this.data.tags,
                    tag = data.tag,
                    honor_img = data.honor_img,
                    papers = data.papers
                tag = tag.map(item => parseInt(item)).sort();

                tagList.forEach((item, index) => {
                    if (tag.includes(item.id)) {
                        item.status = true
                        tags.push(item.name)
                    }
                })

                var { majorlist, edulist, major, edu } = this.data;
                majorlist.forEach(item => {
                    if (item.id == data.major) {
                        major = item.name
                    }
                })
                edulist.forEach(item => {
                    if (item.id == data.edu) {
                        edu = item.name
                    }
                })
                data.addr = data.addr.slice(0, data.addr.indexOf('区') + 1)
                this.setData({
                    msgObj: data,
                    tags: tags,
                    tagList: tagList,
                    major: major,
                    edu: edu,
                    thumbs: honor_img,
                    papersThumb: papers
                })

            }
        })
    },
    addImgs() {
        let { thumbs, msgObj } = this.data,
            _this = this;

        if (msgObj.honor_img.length >= 9) {
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
                if (msgObj.honor_img.length + tempFilePaths.length >= 9) {
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
                        msgObj.honor_img.push(res.data)
                        _this.setData({ flag: 1 })
                    })
                })
            }
        })

        this.setData({ msgObj: msgObj })

    },
    delImg(e) {
        var thumbs = this.data.thumbs,
            id = e.currentTarget.dataset.id,
            honor_img = this.data.msgObj.honor_img,
            flag = this.data.flag;
        thumbs.splice(id, 1);
        if (flag) {
            honor_img.splice(id, 1);
        }
        this.setData({ thumbs: thumbs });
    },
    singleUpload() {
        let _this = this,
            { msgObj } = this.data

        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                const tempFilePaths = res.tempFilePaths,
                    tempImg = tempFilePaths[0];
                _this.setData({
                    papersThumb: tempImg
                })
                app.upload({
                    url: app.api.ApiAddImg,
                    filePath: tempImg,
                    name: 'image'
                }).then(res => {
                    _this.setData({
                        ['msgObj.papers']: res.data
                    })
                })
            }
        })
    },
    submit() {
        let { msgObj } = this.data;
        let flag = true;
        // console.log(msgObj);

        for (const key in msgObj) {
            if (msgObj.hasOwnProperty(key)) {
                const element = msgObj[key];
                if (element === '') {
                    flag = false;
                    break;
                }
            }
        }
        console.log(msgObj);

        if (!flag) {
            app.util.toast({
                title: '请填写完整资料',
                icon: 'none'
            })
            return
        }
        var oldMsg = this.data.msgObj;
        oldMsg.honor_img = oldMsg.honor_img.map(item => {
            return item.slice(item.indexOf('/uploads'));
        })
        var oldMsg = this.data.msgObj;
        var newMsg = {
            username: oldMsg.username,
            sex: oldMsg.sex,
            birth: oldMsg.birth,
            major: oldMsg.major,
            edu: oldMsg.edu,
            addr: oldMsg.addr + oldMsg.home,
            phone: oldMsg.phone,
            tag: oldMsg.tag,
            marray: oldMsg.marray,
            work: oldMsg.work,
            edu_history: oldMsg.edu_history,
            school: oldMsg.school,
            honor: oldMsg.honor_img,
            papers: oldMsg.papers,
            teach_time: oldMsg.teach_time,
            teach_year: oldMsg.teach_year
        }

        app.util.verifyPhone(msgObj.phone).then(res => {
            app.http({
                url: app.api.ApiDancerSave,
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
    onShow: function() {},

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