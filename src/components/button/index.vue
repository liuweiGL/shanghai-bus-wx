<template>
  <view :class="['bus-button','bus-button--' + type,'is-' + size,plain ? 'is-plain' : '',extraClass]"
        hover-class="is-hover"
        @click="clickHandler">
    <slot />
  </view>
</template>

<script>
export default {
  name: 'BusButton',
  methods: {
    clickHandler(event) {
      this.$emit('click', event)
    }
  },
  props: {
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'primary', 'warn', 'text'].indexOf(value) > -1
      }
    },
    size: {
      type: String,
      default: 'mini',
      validator(value) {
        return ['mini', 'default'].indexOf(value) > -1
      }
    },
    plain: {
      type: Boolean,
      default: false
    },
    extraClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@include b(button) {
  font-size: $--font-size-h4;
  @include m(default) {
    color: $--color-text;
    background: $--color-white;
    border: 1px solid $--color-text-light;
  }
  @include m(primary) {
    color: $--color-white;
    background-color: $--color-primary;
    border: 1px solid $--color-primary-light;
    @include when(plain) {
      color: $--color-primary;
    }
  }
  @include m(warn) {
    color: $--color-white;
    background-color: $--color-danger;
    border: 1px solid $--color-danger-light;
    @include when(plain) {
      color: $--color-danger;
    }
  }
  @include m(text) {
    color: $--color-primary;
    background-color: transparent;
    border: none;
  }
  @include when(hover) {
    opacity: 0.5;
  }
  @include when(plain) {
    background-color: transparent;
  }
  @include when(mini) {
    display: inline-block;
    font-size: $--font-size-extra;
  }
}
</style>
