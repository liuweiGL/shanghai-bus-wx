<template>
  <view class="bus-loading">
    <view class="bus-loading__dot"
          :style="style1" />
    <view class="bus-loading__dot"
          :style="style2" />
    <view class="bus-loading__dot"
          :style="style3" />
  </view>
</template>
<script>
export default {
  name: 'BusLoading',
  mounted() {
    this.show && this.doAnimate()
  },
  data() {
    return {
      style1: '',
      style2: '',
      style3: '',
      timer: null
    }
  },
  computed: {
    style() {
      return `background:${this.color};`
    }
  },
  watch: {
    show(show) {
      if (show) {
        this.doAnimate()
      } else {
        clearTimeout(this.timer)
      }
    }
  },
  methods: {
    translate(style, val, delay) {
      this[style] = this.style + `opacity:${val};`
    },
    doAnimate() {
      // 第一帧
      setTimeout(() => {
        this.translate('style1', 1)
        this.translate('style2', 0.3)
        this.translate('style3', 0.3)
      }, 0)
      //  第二帧
      setTimeout(() => {
        this.translate('style1', 0.3)
        this.translate('style2', 1)
        this.translate('style3', 0.3)
      }, 400)
      //  第三帧
      setTimeout(() => {
        this.translate('style1', 0.3)
        this.translate('style2', 0.3)
        this.translate('style3', 1)
      }, 800)
      this.timer = setTimeout(this.doAnimate, 1200)
    }
  },
  props: {
    show: {
      type: Boolean,
      defalut: false
    },
    color: {
      type: String,
      default: '#fff'
    }
  }
}
</script>
<style lang="scss">
@include b(loading) {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  @include e(dot) {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: 0 5px;
    opacity: 0.5;
    transition: opacity 0.2s;
  }
}
</style>
