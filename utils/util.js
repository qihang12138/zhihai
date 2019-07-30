const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const YMD = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
const toast = ({ title = '提示文字', icon = 'success', duration = 1500 } = option) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: icon,
            duration,
            success() {
                setTimeout(resolve, duration);
            }
        })
    })
}

let phoneTest = ["133", "149", "153", "173", "177", "180", "181", "189", "199", "130", "131", "132", "145", "155", "156", "166", "171", "175", "176", "185", "186", "166", "134", "135", "136", "137", "138", "139", "147", "150", "151", "152", "157", "158", "159", "172", "178", "182", "183", "184", "187", "188", "198"];

const newTestPhone = phone => phone.length === 11 && phoneTest.includes(phone.slice(0,3))

const verifyPhone = (phone) => {
    return new Promise((resolve, reject) => {
      // let res = testPhone(parseInt(phone))
      let res = newTestPhone(phone + '')
      if(res) {
        resolve(res)
      }else {
        toast({
          title: '手机号格式不正确',
          icon: 'none'
        })
        reject(res)
      }
    })
  }

module.exports = {
    formatTime: formatTime,
    toast: toast,
    YMD: YMD,
    verifyPhone
}