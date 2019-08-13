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
        pageData: '',
        columns: [],
        edu: '',
        major: '',
        ball: true,
        honorThumb: '',
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
        tags: [],
        tag: '',
        msgObj: {
            username: '',
            sex: '',
            birth: '',
            major: '',
            edu: '',
            addr: '',
            phone: '',
            tag: [],
            marray: '',
            work: '',
            edu_history: '',
            train: '',
            school: '',
            honor: '',
            papers: ''
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
            ball: true
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
        this.ballShow();
    },
    changeMajor(e) {
        this.setData({
            major: e.detail.name,
            ['msgObj.major']: e.detail.id
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
    getData() {
        app.http({
            url: app.api.ApiDancerType
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 0) {
                data.tag.forEach(item => {
                    item.status = false
                })
                this.setData({
                    pageData: data,
                    majorlist: data.major,
                    edulist: data.edu,
                    tagList: data.tag
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
                    tag = data.tag;
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
                this.setData({
                    msgObj: data,
                    tags: tags,
                    tagList: tagList,
                    major: major,
                    edu: edu
                })

            }
        })
    },
    singleUpload(e) {
        let _this = this,
            { msgObj } = this.data,
            id = e.currentTarget.dataset.id,
            thumb = id + 'Thumb',
            type = 'msgObj.' + id;
        console.log(msgObj);




        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                const tempFilePaths = res.tempFilePaths,
                    tempImg = tempFilePaths[0];
                _this.setData({
                    [thumb]: tempImg
                })
                app.upload({
                    url: app.api.ApiAddImg,
                    filePath: tempImg,
                    name: 'image'
                }).then(res => {
                    console.log(msgObj.honor);
                    [type] = res.data
                    _this.setData({ msgObj: msgObj })
                    console.log(msgObj);

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
                if (element === '') {
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
        var newMsg = {
            username: oldMsg.username,
            sex: oldMsg.sex,
            birth: oldMsg.birth,
            major: oldMsg.major,
            edu: oldMsg.edu,
            addr: oldMsg.addr,
            phone: oldMsg.phone,
            tag: oldMsg.tag,
            marray: oldMsg.marray,
            work: oldMsg.work,
            edu_history: oldMsg.edu_history,
            train: oldMsg.train
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