const http = function({url, method = 'GET', data = {}} = option) {
    return new Promise((resolve, reject) => {
      if(!url) return reject('url 不能为空');
      wx.request({
        url: url, //仅为示例，并非真实的接口地址
        data: data,
        method: method,
        header: {
          'content-type': 'application/json', // 默认值
          token: '50a00a9b8d3402ed4f1b3ed4b890294b',
          uid: wx.getStorageSync('uid')
        },
        success (res) {
          console.log('接口: ' + url);
          console.log(res.data);
          if(res.statusCode === 200) {
            resolve(res.data);
            if(res.data.error_code === 501) {
              wx.redirectTo({
                url: '/pages/logIn/logIn'
              })
            }
          }
        },
        fail (err) {
          reject(err);
        }
      })
    })
  }
  
  module.exports = http;