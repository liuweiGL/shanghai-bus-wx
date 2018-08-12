<template>
  <view class="bus-query-error">
    <view class="bus-query-error__row">
      <icon type="warn"
            size="20" />
      <view class="bus-query-error__text">查询失败</view>
    </view>
    <view class="bus-query-error__row">
      <button class="bus-query-error__btn"
              type="primary"
              @click="reload">重新加载</button>
    </view>

  </view>
</template>
<script>
export default {
  name: 'BusQueryError',
  props: {
    reload: {
      type: Function,
      required: true
    }
  }
}
</script>

<style lang="scss">
@include b(query-error) {
  position: absolute;
  top: 200px;
  left: 0;
  width: 100%;
  @include e(row) {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $--color-text;
    & + .bus-query-error__row {
      margin-top: 20px;
    }
  }
  @include e(text) {
    margin-left: 5px;
    color: $--color-text;
    font-size: $--font-size-h4;
  }
  @include e(btn) {
    width: 50%;
  }
}
</style>
