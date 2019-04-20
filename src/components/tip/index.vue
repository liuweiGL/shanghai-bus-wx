<template>
  <transition>
    <view class="bus-tip" :style="style" :class="tipClass" v-show="show">
      <view class="bus-tip__text">{{ text }}</view>
    </view>
  </transition>
</template>
<script>
import { getValByPx } from '@/js/utils'
export default {
  name: 'BusTip',
  data() {
    return {
      tipClass: ''
    }
  },
  computed: {
    style() {
      const _top = getValByPx(this.top)
      return _top ? `top:${_top};` : ''
    }
  },
  watch: {
    show(show) {
      if (show) {
        this.tipClass = 'show'
        setTimeout(() => {
          this.tipClass = ''
          setTimeout(() => {
            this.$emit('update:show', false)
          }, 300)
        }, 2000)
      }
    }
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    top: {
      type: [String, Number],
      default: null
    },
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@include b(tip) {
  position: absolute;
  top: auto;
  left: 0;
  z-index: $--z-index-top;
  width: 100%;
  height: 40px;
  opacity: 0;
  font-size: $--font-size-base;
  color: $--color-white;
  background: $--color-primary;
  border-top: 1px solid $--color-primary-dark;
  transition: opacity 0.3s linear;
  &.show {
    opacity: 1;
  }
  @include e(text) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
}
</style>
