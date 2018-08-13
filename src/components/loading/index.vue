<template>
  <view class="bus-loading">
    <view class="bus-loading__wrap">
      <view class="bus-loading__item"
            :style="style" />
      <view class="bus-loading__item"
            :style="style" />
      <view class="bus-loading__item"
            :style="style" />
      <view class="bus-loading__item"
            :style="style" />
      <view class="bus-loading__item"
            :style="style" />
      <view class="bus-loading__item"
            :style="style" />
      <view class="bus-loading__item"
            :style="style" />
      <view class="bus-loading__item"
            :style="style" />
      <view class="bus-loading__item"
            :style="style" />
      <view class="bus-loading__item"
            :style="style" />
      <view class="bus-loading__item"
            :style="style" />
      <view class="bus-loading__item"
            :style="style" />
    </view>
  </view>
</template>

<script>
export default {
  name: 'BusLoading',
  data() {
    return {
      style: ''
    }
  },
  watch: {
    color: {
      immediate: true,
      handler(color) {
        color && (this.style = `background:${color};`)
      }
    }
  },
  props: {
    color: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
@include b(loading) {
  position: relative;
  height: 48px;
  @include e(wrap) {
    position: absolute;
    top: 50%;
    left: 0;
    margin-left: 50%;
    width: 48px;
    height: 100%;
    transform: translate(-25%, -50%) scale(0.5);
  }
  @include e(item) {
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 10px;
    background: $--color-primary;
    border-radius: 24%;
    transform-origin: 2px 24px;
    animation: bus-loading linear 1s infinite;
    &:nth-child(1) {
      transform: rotate(0deg);
      animation-delay: -0.916666666666667s;
    }
    &:nth-child(2) {
      transform: rotate(30deg);
      animation-delay: -0.833333333333333s;
    }
    &:nth-child(3) {
      transform: rotate(60deg);
      animation-delay: -0.75s;
    }
    &:nth-child(4) {
      transform: rotate(90deg);
      animation-delay: -0.666666666666667s;
    }
    &:nth-child(5) {
      transform: rotate(120deg);
      animation-delay: -0.583333333333333s;
    }
    &:nth-child(6) {
      transform: rotate(150deg);
      animation-delay: -0.5s;
    }
    &:nth-child(7) {
      transform: rotate(180deg);
      animation-delay: -0.416666666666667s;
    }
    &:nth-child(8) {
      transform: rotate(210deg);
      animation-delay: -0.333333333333333s;
    }
    &:nth-child(9) {
      transform: rotate(240deg);
      animation-delay: -0.25s;
    }
    &:nth-child(10) {
      transform: rotate(270deg);
      animation-delay: -0.166666666666667s;
    }
    &:nth-child(11) {
      transform: rotate(300deg);
      animation-delay: -0.083333333333333s;
    }
    &:nth-child(12) {
      transform: rotate(330deg);
      animation-delay: 0s;
    }
  }
  @keyframes bus-loading {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>
