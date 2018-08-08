<template>
  <scroll-view class="bus-around-bus"
               scroll-y
               enable-back-to-top>
    <view class="bus-around-bus__hd">附近公交：</view>
    <bus-router-list :data="list" />
  </scroll-view>
</template>

<script>
import BusRouterList from '@/components/routerList'
export default {
  name: 'BusAroundBus',
  components: {
    BusRouterList
  },
  data() {
    return {
      list: Array.from({ length: 15 }).map((item, index) => {
        return {
          name: '公交路线' + index,
          desc: '-'
        }
      })
    }
  }
}
</script>

<style lang="scss">
@include b(around-bus) {
  height: 100%;
  @include e(hd) {
    padding: 10px 10px;
    font-size: $--font-size-base;
    background: $--color-background-light;
  }
}
</style>
