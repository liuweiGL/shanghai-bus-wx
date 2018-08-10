<template>
  <view class="bus-router-detail">
    <block v-if="data">
      <view class="bus-router-detail__hd">
        <view class="bus-common__row">
          <view class="bus-common__col">{{ data.name }}</view>
          <view class="bus-common__col is-fixed">￥{{ data.price }}</view>
        </view>
        <view class="bus-common__row">
          <view class="bus-common__col">首班车：{{ data.startTime }}</view>
          <view class="bus-common__col">末班车：{{ data.endTime }}</view>
        </view>
      </view>
      <view class="bus-router-detail__bd">
        <view class="bus-router-detail__list">
          <view class="bus-router-detail__item"
                v-for="(item,index) in data.stations"
                :key="index">
            <text>{{ item.name }}</text>
            <view class="iconfont icon-arrowdown"/>
          </view>
        </view>
      </view>
    </block>
    <block v-else>
      <button type="primary"
              class="bus-common__btn--big"
              v-if="fail === 'ERROR'">重新查询</button>
      <icon type="warn"
            v-else-if="fail === 'EMPTY'">没有此公交路线信息</icon>
    </block>
  </view>
</template>
<script>
import { getBusByRouter } from '@/apis/routerDetail'

export default {
  name: 'BusRouterDetail',
  onLoad() {
    this.getRouterDetail(this.$root.$mp.query.router)
  },
  data() {
    return {
      data: null,
      routers: null,
      loading: true,
      isError: false,
      isEmpty: false
    }
  },
  methods: {
    getRouterDetail(router) {
      getBusByRouter(router)
        .then((data) => {
          const { routers } = data
          if (routers && routers.length) {
            this.routers = routers
            this.data = routers[0]
          } else {
            this.isEmpty = true
          }
        })
        .catch((error) => {
          this.isError = true
          console.log(error)
        })
    },
    selectItemHandler(index) {
      console.log(index)
    }
  }
}
</script>

<style lang="scss">
@include b(router-detail) {
}
</style>
