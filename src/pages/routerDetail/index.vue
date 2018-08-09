<template>
  <view class="bus-router-detail">
    <view class="bus-router-detail__hd">
      <view class="bus-router-detail__bd">
        <view class="bus-router-detail__list">
          <view class="bus-router-detail__item"
                v-for="(item,index) in list"
                :key="item"
                @click="selectItemHandler(index)">
            <text class="bus-router-detail__text">{{ item }}</text>
          </view>
        </view>
      </view>
    </view>
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
      list: null
    }
  },
  methods: {
    getRouterDetail(router) {
      getBusByRouter(router)
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
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
