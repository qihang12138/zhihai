// pages/opinion/opinion.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        image: '',
        msgObj: {
            phone: '',
            image: '',
            content: ''
        }
    },
    changeMsgObj(e) {
        var id = e.currentTarget.dataset.id,
            msgObj = "msgObj." + id;
        this.setData({
            [msgObj]: e.detail.value || e.detail
        });
    },
    submit() {
        var msgObj = this.data.msgObj,
            flag = true;
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
        app.util.verifyPhone(msgObj.phone).then(() => {
            app.http({
                url: app.api.ApiOpinion,
                data: msgObj,
                method: 'POST'
            }).then(res => {
                if (res.error_code === 0) {
                    // 提交成功soming
                    wx.navigateBack({
                        delta: 1
                    })
                } else {
                    app.util.toast({
                        title: '请勿频繁提交',
                        icon: 'none'
                    })
                }
            })
        })
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
                    image: tempImg
                })
                app.upload({
                    url: app.api.ApiAddImg,
                    filePath: tempImg,
                    name: 'image'
                }).then(res => {
                    _this.setData({
                        ['msgObj.image']: res.data
                    })
                })
            }
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