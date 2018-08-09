import { resolveUrl } from '@/js/utils'

class RequestFactory {
  static default = {
    baseURL: '',
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    header: {
      'content-type': 'application/json'
    }
  }
  static create(options) {
    return new RequestFactory(options)
  }
  constructor(options) {
    this.promise = null
    this.requestTask = null
    this.options = Object.assign({}, RequestFactory.default, options, {
      url: resolveUrl(RequestFactory.default.baseURL, options.url),
      fail: this.fail.bind(this),
      success: this.success.bind(this)
    })
    this.fetch()
  }
  fetch() {
    this.promise = new Promise((resolve, reject) => {
      this.requestTask = wx.request(this.options)
    })
  }
  success(response) {
    console.log(response)
    this.promise.resolve(response)
  }
  fail(error) {
    this.promise.reject(error)
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

export default RequestFactory
