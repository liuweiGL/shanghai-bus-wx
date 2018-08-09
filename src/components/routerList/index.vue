<template>
  <view class="bus-router-list">
    <view class="bus-router-list__item"
          v-for="item in data"
          :key="item">{{ item }}</view>
  </view>
</template>
<script>
export default {
  name: 'BusRouterList',
  props: {
    data: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss">
@include b(router-list) {
  @include e(item) {
    padding: 15px 10px;
    color: $--color-text;
    font-size: $--font-size-base;
    border-bottom: 0.5px solid $--color-border;
  }
}
</style>
