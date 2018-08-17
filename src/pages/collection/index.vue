<template>
  <view class="bus-collection">
    <view class="bus-collection__list"
          v-for="(router,key) in data"
          :key="key">
      <view class="bus-collection__item">

        <view class="bus-collection__item-title">
          <view class="bus-collection__name">{{ router.name }}</view>
          <view class="bus-collection__extra-info">
            <view class="bus-collection__time">首班车：{{ router.startTime }}</view>
            <view class="bus-collection__time">末班车：{{ router.startTime }}</view>
            <view class="bus-collection__price">票价：￥{{ router.pricce }}</view>
          </view>
        </view>
        <bus-list :data="router.stations"
                  v-if="expands.includes(router.name)">
          <slot name="list">
            <view class="bus-collection__item"
                  v-for="station in router.stations"
                  :key="station">
              <bus-stop :station="getParams(router)" />
            </view>
          </slot>
        </bus-list>
      </view>
    </view>
  </view>
</template>
<script>
import Store from '@/js/store'
import BusStop from '../routerDetail/stop'
import { COLLECTION_LOCAL_KEY } from '@/js/constants'

const createData = function() {
  return {
    data: null,
    expands: []
  }
}
export default {
  name: 'BusCollection',
  components: {
    BusStop
  },
  onShow() {
    // 获取收藏的站台数据
    this.getData()
  },
  onHide() {
    // 重置数据
    this.$setData(createData())
  },
  data() {
    return createData()
  },
  methods: {
    getData() {
      /**
       * 站台数据
       * {
       *   sid: {
       *     name: 公交名称,
       *     direction: 行驶方向,
       *     stations: 收藏的站台列表
       *   }
       * }
       */
      Store.get(COLLECTION_LOCAL_KEY).then((data) => {
        this.data = data
      })
    },
    // 查询到站信息的参数
    getParams(router) {
      return {
        sid: router.sid,
        direction: router.direction,
        stationIndex: router.index + 1
      }
    },
    removeStationHandler(index) {
      this.data.splice(index, 1)
      Store.set(COLLECTION_LOCAL_KEY, this.data)
    }
  }
}
</script>

<style lang="scss">
@include b(collection) {
  height: 100%;
}
</style>
