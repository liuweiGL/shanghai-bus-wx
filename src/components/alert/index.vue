<template>
  <view class="bus-alert">
    <slot/>
    <view class="bus-alert__inner">
      <icon :type="type" size="20"/>
      <text class="bus-alert__text">{{ msg }}</text>
    </view>
    <bus-button
      extra-class="bus-alert__btn"
      type="primary"
      :loading="buttonLoading"
      :disabled="buttonLoading"
      :scope="{buttonText}"
      plain
      @click="clickHandler"
      v-if="buttonText"
    >
      <template slot="scope">
        <text>{{ scope.buttonText }}</text>
      </template>
    </bus-button>
  </view>
</template>
<script>
import throttle from '@/js/throttle'
export default {
  name: 'BusAlert',
  data() {
    return {
      scope: {} // 占位，mpvue的bug，slot中绑定的状态必须在父组件注册，不然会报错
    }
  },
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
      type: String,
      default: null
    },
    buttonLoading: {
      type: Boolean,
      default: false
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
  }
}
</style>
