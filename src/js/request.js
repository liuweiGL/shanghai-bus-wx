import { resolveUrl } from '@/js/utils'

// 请求状态
const Status = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL'
}

class Request {
  static default = {
    baseURL: 'https://liuweigl.cn',
    // baseURL: 'http://localhost:3000',
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    header: {
      'content-type': 'application/json'
    }
  }
  constructor(options) {
    this.promise = null
    this.requestTask = null
    this.options = Object.assign({}, Request.default, options, {
      url: resolveUrl(Request.default.baseURL, options.url)
    })
    this.fetch()
  }
  fetch() {
    this.promise = new Promise((resolve, reject) => {
      this.requestTask = wx.request(
        Object.assign(this.options, {
          success: (response) => {
            const {
              data: resData,
              data: { status, data }
            } = response
            if (status.toUpperCase() === Status.SUCCESS) {
              resolve(data)
            } else {
              reject(resData)
            }
          },
          fail: (error) => reject(error)
        })
      )
    })
  }
  abort() {
    this.requestTask.abort()
  }
  then(fn) {
    return this.promise.then(fn)
  }
  catch(fn) {
    return this.promise.then(null, fn)
  }
  always(fn) {
    return this.promise.then(fn, fn)
  }
}

export default function(options) {
  return new Request(options)
}
