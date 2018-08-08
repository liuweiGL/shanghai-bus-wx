<template>
  <view class="bus-index">
    <view class="bus-index__search">
      <view class="bus-index__search-inner"
            @click="navigateHandler">
        <text class="bus-index__search-placeholder">搜索</text>
        <icon size="16"
              type="search"
              color="#597ef7"
              class="bus-index__search-icon" />
      </view>
    </view>
    <view class="bus-index__scroll">
      <bus-around-bus />
    </view>
  </view>
</template>

<script>
import BusAroundBus from './aroundBus'

export default {
  name: 'BusIndex',
  components: {
    BusAroundBus
  },
  created() {},
  data() {
    return {}
  },
  methods: {
    navigateHandler() {
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
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
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
  @include e(scroll) {
    flex: 1;
    height: 100%;
  }
}
</style>
