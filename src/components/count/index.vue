<template>
  <view class="bus-count">{{ text }}</view>
</template>

<script>

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
      lastTime: Date.now()
    }
  },
  watch: {
    date: {
      immediate: true,
      handler: 'dateChangeHandler'
    }
  },
  methods: {
    dateChangeHandler(date) {
      if (!date) {
        this.cancel()
        return
      }
      if (date instanceof Date) {
        this.value = date.getTime()
      } else if (typeof date === 'string') {
        this.value = new Date(date).getTime()
      } else {
        this.value = parseInt(date)
      }
      this.run()
    },
    run() {
      const now = Date.now()
      const { value, lastTime, run, format } = this
      this.value = Math.max(0, value - (now - lastTime))
      this.lastTime = now
      this.text = format(value)
      if (this.value > 0) {
        this.timer = setTimeout(run, 1000)
      }
    },
    cancel() {
      clearTimeout(this.timer)
    }
  },
  props: {
    date: {
      type: [Number, String, Date],
      default: null
    },
    format: {
      type: Function,
      required: true
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
