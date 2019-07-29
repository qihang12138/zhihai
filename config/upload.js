
const uploadFile = ({ url, filePath, name } = opt) => {
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: url,
            header: {
                token: '50a00a9b8d3402ed4f1b3ed4b890294b',
                uid: wx.getStorageSync('uid')
            },
            filePath: filePath,
            name: name,
            success(res) {
                const data = JSON.parse(res.data);
                resolve(data)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

module.exports = uploadFile;
