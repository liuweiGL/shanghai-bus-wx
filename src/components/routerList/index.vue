<template>
  <view class="bus-router-list">
    <view class="bus-router-list__item"
          hover-class="is-hover"
          v-for="item in data"
          :key="item"
          @click="itemClickHandler(item)">{{ item }}</view>
  </view>
</template>
<script>
export default {
  name: 'BusRouterList',
  methods: {
    itemClickHandler(item) {
      typeof this.selectHandler === 'function' && this.selectHandler(item)
      wx.navigateTo({
        url: `/pages/routerDetail/main?router=${item}`
      })
    }
  },
  props: {
    data: {
      type: Array,
      default: null
    },
    selectHandler: {
      type: Function,
      default: null
    }
  }
}
</script>

<style lang="scss">
@include b(router-list) {
  @include e(item) {
    @include list-item;
  }
}
</style>
