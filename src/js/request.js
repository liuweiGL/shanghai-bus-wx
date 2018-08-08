const defaultOptions = {
  method: 'GET',
  dataType: 'json',
  responseType: 'text',
  header: {
    'content-type': 'application/json'
  }
}

class Request {
  constructor(options) {
    this.promise = null
    this.requestTask = null
    this.options = Object.assign({}, defaultOptions, options, {
      fail: this.fail,
      success: this.success
    })
  }
  fetch() {
    this.promise = new Promise(() => {
      this.requestTask = wx.request(this.options)
    })
  }
  success(response) {
    console.log(response)
    this.promise.resolve(response)
  }
  fail(error) {
    this.promise.catch(error)
  }
  abort() {
    this.requestTask.abort()
  }
  then(fn) {
    return this.promise.then(fn)
  }
  catch (fn) {
    return this.promise.then(null, fn)
  }
  always(fn) {
    return this.promise.then(fn, fn)
  }
}

export default function (options) {
  return new Request(options)
}
