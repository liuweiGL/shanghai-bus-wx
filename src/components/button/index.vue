<template>
  <view
    :class="['bus-button','bus-button--' + type,'is-' + size,{ 'is-plain': plain },{ 'is-disabled': disabled },extraClass]"
    hover-class="is-hover"
    @click.stop="clickHandler"
  >
    <bus-icon
      name="bus-loading"
      extra-class="bus-button__icon"
      v-if="loading"
    />
    <view class="bus-button__label">
      <slot />
      <slot name="scope" />
    </view>
  </view>
</template>

<script>
export default {
  name: 'BusButton',
  methods: {
    clickHandler(event) {
      !this.disabled && this.$emit('click', event)
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
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    extraClass: {
      type: String,
      default: ''
    },
    scope: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss">
@include b(button) {
  padding: 5px 10px;
  text-align: center;
  border-radius: 4px;
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
  @include when(disabled) {
    opacity: 0.3;
  }
  @include when(mini) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: $--font-size-extra;
  }
  @include e(icon) {
    display: block;
    margin: 0;
    color: currentColor;
    font-weight: bold;
    font-size: $--font-size-base;
    @include extend-rule(spinning);
  }
  @include e(label) {
    margin-left: 5px;
  }
}
</style>
