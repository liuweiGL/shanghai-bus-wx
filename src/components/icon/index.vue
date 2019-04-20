<template>
  <view
    :class="myClass"
    hover-class="is-hover"
    @click.stop="clickHandler"
  />
</template>
<script>
export default {
  name: 'BusIcon',
  computed: {
    myClass() {
      return (
        'bus-icon ' + this.name + (this.extraClass ? ' ' + this.extraClass : '')
      )
    }
  },
  methods: {
    clickHandler(event) {
      this.$emit('click', event)
    }
  },
  props: {
    name: {
      type: String,
      default: null,
      required: true
    },
    extraClass: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
@include b(icon) {
  color: $--color-primary;
  @include when(hover) {
    opacity: 0.5;
  }
}
</style>
