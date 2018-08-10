/**
 * 解析 `url` => `location` 格式
 * @param {string} url
 */
export function parseUrl(url) {
  const result = {}
  const keys = [
    'href',
    'origin',
    'protocol',
    'host',
    'hostname',
    'post',
    'path',
    'search',
    'hash'
  ]
  const reg = /(([^:]*:)\/\/(([^:/?#]*) (:\d+)? ))(\/[^?#]*)?(\?[^#]*)?(#.*)?/
  const match = reg.exec(url)
  keys.forEach((key, index) => {
    result[key] = match[index] || ''
  })
  return result
}

/**
 * 路径拼接
 * @param {string} baseUrl
 * @param {string} url
 */
export function resolveUrl(baseUrl, url) {
  return /^https?:|^\/\//.test(url)
    ? url
    : baseUrl.replace(/\/$/, '') + '/' + url.replace(/^\//, '')
}

/**
 * 解析URL中的参数
 * @param {string} url
 * @return {object} params
 */
export function parseUrlParams(url) {
  let match
  const params = {}
  const reg = /(?:\?|&)([^&#]*)/g
  // 不要把正则表达式 `字面量`（或者RegExp构造器）放在 while 条件表达式里，由于迭代时 `lastIndex` 属性的值每次都被重置，如果匹配，将会造成死循环；
  // 确保使用 `g` 标记，否则同样会造成死循环
  // see detial: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
  while ((match = reg.exec(url)) !== null) {
    const pair = match[1].split('=')
    const key = pair[0].trim()
    const val = pair[1].trim()
    params[key] = val
  }
  return params
}

/**
 * 把参数添加到URL中，原有参数会被覆盖
 * @param {string} url
 * @param {object} params
 */
export function urlMixin(url, params) {
  const oldPrams = parseUrlParams(url)
  const match = /^[^?]*/.exec(url)
  const origin = match ? match[0] : ''
  return origin + queryString(Object.assign(oldPrams, params))
}

/**
 * `object`类型的参数转换为 `queryString` 类型：a: b => a = b
 * @param {object} params
 */
export function queryString(params) {
  let pairs = []
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      let val = params[key]
      val =
        typeof val === 'object'
          ? Array.isArray(val)
            ? val.toString()
            : JSON.stringify(val)
          : val
      pairs.push(`${key}=${val}`)
    }
  }
  return pairs.join('&')
}

/**
 * 为css数值添加 `px` 单位
 * @param {any} val
 */
export function getValByPx(val) {
  return /^\d+$/.test(val) ? val + 'px' : val
}

/**
 * 节流函数
 * @param {function} fn
 * @param {number} delay
 */
export function throttle(fn, delay = 0) {
  delay = Number(delay)
  if (typeof fn !== 'function' || typeof delay !== 'number') {
    throw new TypeError()
  }
  let self
  let lastCallTime = 0
  return function() {
    self = this
    const now = Date.now()
    // 对参数使用slice会阻止某些JavaScript引擎中的优化
    // see detail: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments
    if (now - lastCallTime > delay) {
      const callArg =
        arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
      lastCallTime = now
      fn.apply(self, callArg)
    }
  }
}
