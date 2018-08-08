import request from '@/js/request'

export function getBusByRouter(routerName) {
  return request({
    url: '/bus/detail',
    data: {
      routerName
    }
  })
}
