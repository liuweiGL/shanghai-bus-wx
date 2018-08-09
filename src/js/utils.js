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
