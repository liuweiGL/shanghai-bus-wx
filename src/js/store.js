/**
 * 简单封装 `数据缓存` API
 */
export default {
  get(key) {
    return new Promise((resolve, reject) => {
      wx.getStorageInfo({
        success({ keys }) {
          if (keys.includes(key)) {
            wx.getStorage({
              key,
              success(res) {
                resolve(res.data)
              },
              fail: reject
            })
          } else {
            resolve(null)
          }
        },
        fail: reject
      })
    })
  },
  set(key, data) {
    return new Promise((resolve, reject) => {
      wx.getStorageInfo({
        success(res) {
          if (res.currentSize >= res.limitSize) {
            reject(new Error('memory not enough'))
          } else {
            wx.setStorage({
              key,
              data,
              success: resolve,
              fail: reject
            })
          }
        },
        fail: reject
      })
    })
  },
  remove(key) {
    const _remove = function(key) {
      return new Promise((resolve, reject) => {
        wx.removeStorage({
          key,
          success: resolve,
          fail: reject
        })
      })
    }
    if (Array.isArray(key)) {
      return Promise.all(key.map(_remove))
    } else {
      return _remove(key)
    }
  }
}
