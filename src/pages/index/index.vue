<template>
  <view class="bus-index">
    <view class="bus-index__search">
      <view class="bus-index__search-inner"
            @click="gotoSeachHandler">
        <text class="bus-index__search-placeholder">搜索</text>
        <icon size="16"
              type="search"
              color="#597ef7"
              class="bus-index__search-icon" />
      </view>
    </view>
    <view class="bus-index__around-router">
      <bus-around-router />
    </view>
  </view>
</template>

<script>
import BusAroundRouter from './aroundRouter'

export default {
  name: 'BusIndex',
  components: {
    BusAroundRouter
  },
  onShareAppMessage() {
    return {
      title: '附近公交'
    }
  },
  methods: {
    gotoSeachHandler() {
      wx.navigateTo({
        url: '/pages/search/main'
      })
    }
  }
}
</script>

<style lang="scss">
@include b(index) {
  position: relative;
  height: 100%;
  @include extend-rule(col);
  @include e(search) {
    flex: none;
    padding: 20px 10px;
    background-color: $--color-primary;
  }
  @include e(search-inner) {
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 0.5px solid $--color-primary-lighter;
    border-radius: 5px;
  }
  @include e(search-placeholder) {
    color: $--color-primary-lighter;
    font-size: $--font-size-base;
  }
  @include e(search-icon) {
    position: absolute;
    top: 20px;
    right: 10px;
    padding: 8px 10px;
  }
  @include e(around-router) {
    flex: 1;
    overflow: hidden;
  }
}
</style>
