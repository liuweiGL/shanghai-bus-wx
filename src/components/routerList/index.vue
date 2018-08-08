<template>
  <view class="bus-router-list">
    <view class="bus-router-list__item"
          v-for="item in data"
          :key="item">
      <view class="bus-router-list__name">{{ item.name }}</view>
      <view class="bus-router-list__desc">{{ item.desc }}</view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'BusRouterList',
  data() {
    return {}
  },
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
    padding: 10px;
    border-bottom: 0.5px solid $--color-border;
  }
  @include e(name) {
    color: $--color-text;
    font-size: $--font-size-base;
  }
  @include e(desc) {
    color: $--color-text-light;
    font-size: $--font-size-desc;
  }
}
</style>
