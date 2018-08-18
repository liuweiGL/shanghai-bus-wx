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
    if (hasOwnProperty(params, key)) {
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
 * 左边填充 `0`
 * @param {string} str
 * @param {number} len
 */
export function paddingLeftZero(str, len = 2) {
  while (str.toString().length < len) {
    str = '0' + str
  }
  return str
}

/**
 * 判断是否是函数
 * @param {any} value
 */
export function isFunction(value) {
  return typeof value === 'function'
}
/**
 * 判断是否是数组
 * @param {any} value
 */
export function isArray(value) {
  return Array.isArray(value)
}

/**
 * 判断是否是对象
 * @param {any} value
 */
export function isObject(value) {
  return (value !== null && typeof value === 'object') || isFunction(value)
}

/**
 * 判断对象是否有 `key` 属性
 * @param {object} value
 * @param {string} key
 */
export function hasOwnProperty(value, key) {
  return value.hasOwnProperty(key)
}
/**
 * 判断是否为空
 * 与 `_.isEmpty` 的区别是 `value` 为数字时，`_.isEmpty` 返回 `true`，这里返回 `false`
 * @param {any} data
 */
export function isEmpty(value) {
  if (!isObject(value)) {
    return !value && value !== 0
  }
  if (isArray(value)) {
    return !value.length
  } else {
    for (let key in value) {
      if (hasOwnProperty(value, key)) {
        return false
      }
    }
  }
  return true
}

/**
 * 拷贝：不考虑 `正则`、`函数` 等业务中不常用的场景
 * @param {any} value
 * @param {boolean} deep
 */
export function clone(value, deep = true) {
  if (!isObject(value)) {
    return value
  }
  if (isArray(value)) {
    return value.map((item) => clone(item, deep))
  } else {
    const tmp = {}
    for (let key in value) {
      if (hasOwnProperty(value, key)) {
        tmp[key] = clone(value[key], deep)
      }
    }
    return tmp
  }
}
wx.clone = clone
