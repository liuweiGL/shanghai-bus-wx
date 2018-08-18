<template>
  <view class="bus-alert">
    <slot />
    <view class="bus-alert__inner">
      <icon :type="type"
            size="20" />
      <text class="bus-alert__text">{{ msg }}</text>
    </view>
    <button class="bus-alert__btn"
            type="primary"
            size="mini"
            plain
            @click="clickHandler"
            v-if="buttonText">{{ buttonText }}</button>
  </view>
</template>
<script>
import throttle from '@/js/throttle'
export default {
  name: 'BusAlert',
  methods: {
    clickHandler: throttle(function() {
      this.$emit('click')
    }, 1000)
  },
  props: {
    type: {
      type: String,
      default: 'info'
    },
    msg: {
      type: String,
      default: null
    },
    buttonText: {
      type: Function,
      default: null
    }
  }
}
</script>

<style lang="scss">
@include b(alert) {
  height: 300px;
  @include extend-rule(middle-col);
  @include e(inner) {
    @include extend-rule(center-row);
  }
  @include e(text) {
    margin-left: 5px;
    color: $--color-text-light;
    font-size: $--font-size-h4;
  }
  @include e(btn) {
    margin-top: 10px;
    @include extend-rule(small-btn);
  }
}
</style>
