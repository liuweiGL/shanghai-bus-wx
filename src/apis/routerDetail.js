import request from '@/js/request'

/**
 * 根据工具路线查询详情
 * @param {string} router
 */
export function getBusByRouter(router) {
  return request({
    url: '/bus/detail',
    data: {
      router
    }
  })
}

/**
 * 查询公交到站信息
 * @param {object} station
 * {
 *   sig: string, // 公交标识
 *   stoptype: number, // 行驶方向
 *   stopid: number // 站台下标
 * }
 */
export function getStopInfo(station) {
  return request({
    url: 'bus/stop',
    data: station
  })
}
