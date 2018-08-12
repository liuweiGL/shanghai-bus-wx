<template>
  <view class="bus-query-empty">
    <view class="bus-query-empty__row">
      <icon type="info"
            size="20" />
      <view class="bus-query-empty__text">没有相关数据</view>
    </view>
    <view class="bus-query-empty__row">
      <button class="bus-query-empty__btn"
              @click="gobak">返回</button>
    </view>
  </view>
</template>
<script>
export default {
  name: 'BusQueryEmpty',
  methods: {
    gobak() {
      wx.navigateBack()
    }
  }
}
</script>

<style lang="scss">
@include b(query-empty) {
  position: absolute;
  top: 200px;
  left: 0;
  width: 100%;
  @include e(row) {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    color: $--color-text;
    & + .bus-query-error__row {
      margin-top: 20px;
    }
  }
  @include e(text) {
    margin-left: 5px;
  }
  @include e(btn) {
    width: 50%;
  }
}
</style>
