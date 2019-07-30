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
        sexlist: [
            {
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
            train: ''
        }
    },
    textInput(e) {
        let { detail: {
                value
              },
              currentTarget: {
                  dataset: {
                      type
                    }
                }  
            } = e
        this.setData({
            ['msgObj.'+type]: value
        })
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
    onClose() {
        this.setData({
            majorShow: false,
            eduShow: false,
            siteShow: false,
            tagShow: false
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
    bindDateChange(e) {// 选择出生日期
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
    onTag(e) { // 选择职业标签
        var { id, index } = e.currentTarget.dataset,
        { tagList, msgObj } = this.data;

        msgObj.tag.indexOf(id) > -1 ? msgObj.tag.splice( msgObj.tag.indexOf(id), 1) : msgObj.tag.push(id)
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
                    tagList: data.tag
                })
            }
        })

        app.http({
            url: app.api.ApiDancer
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
                if(!element.length) {
                    flag = false;
                    break;
                }
            }
        }

        if(!flag) {
            app.util.toast({
                title: '请填写完整资料',
                icon: 'none'
            })
            return
        }

        app.util.verifyPhone(msgObj.phone).then(res => {
        return
        app.http({
            url: app.api.ApiDancerSave,
            method: 'POST'
        }).then(res => {
            let { error_code, data } = res;
            if (error_code === 0) {
                this.setData({
                    pageData: data
                })
            }
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