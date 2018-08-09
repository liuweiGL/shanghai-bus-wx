import request from '@/js/request'

export function getBusByRouter(router) {
  return request({
    url: '/bus/detail',
    data: {
      router
    }
  })
}
