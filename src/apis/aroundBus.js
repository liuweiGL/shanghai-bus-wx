import request from '@/js/request'

export function getBusByLocation(location) {
  return request({
    url: '/bus/list',
    data: {
      location
    }
  })
}
