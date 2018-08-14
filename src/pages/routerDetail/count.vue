<template>
  <view class="bus-count">{{ text }}</view>
</template>

<script>
import { paddingLeftZero } from '@/js/utils'

export default {
  name: 'BusCount',
  beforeDestroy() {
    this.cancel()
  },
  data() {
    return {
      text: '',
      value: 0,
      timer: null,
      lastTime: null
    }
  },
  watch: {
    time: {
      immediate: true,
      handler: 'timeChangeHandler'
    }
  },
  methods: {
    timeChangeHandler(time) {
      this.value = parseInt(time)
      this.run()
    },
    run() {
      const now = Date.now()
      let { value, lastTime, run, format } = this
      // 第一次 `lastTime` 还没初始化
      value = Math.max(0, value - (now - (lastTime || now)) / 1000)
      this.value = value
      this.lastTime = now
      this.text = format(value)
      if (this.value > 0) {
        this.timer = setTimeout(run, 1000)
      }
    },
    format(value) {
      const min = Math.floor(value / 60)
      const sec = Math.floor(value % 60)
      return `${paddingLeftZero(min)}:${paddingLeftZero(sec)}`
    },
    cancel() {
      clearTimeout(this.timer)
    }
  },
  props: {
    time: {
      type: [Number, String],
      default: null
    }
  }
}
</script>

<style lang="scss">
@include b(count) {
  text-align: center;
  color: $--color-danger;
  font-size: $--font-size-h2;
}
</style>
