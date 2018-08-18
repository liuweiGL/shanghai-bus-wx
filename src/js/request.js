import { resolveUrl } from '@/js/utils'

// 请求状态
const Status = {
  SUCCESS: 1,
  FAIL: 0
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
              data: { status, data }
            } = response
            if (status === Status.SUCCESS) {
              resolve(data)
            } else {
              reject(data)
            }
          },
          fail: (error) => reject(error)
        })
      )
    })
    return this
  }
  abort() {
    this.requestTask.abort()
    return this
  }
  then(fn) {
    this.promise.then(fn)
    return this
  }
  catch(fn) {
    this.promise.then(null, fn)
    return this
  }
  always(fn) {
    this.promise.then(fn, fn)
    return this
  }
}

export default function(options) {
  return new Request(options)
}
