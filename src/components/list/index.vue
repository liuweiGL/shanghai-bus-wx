<template>
  <view class="bus-list">
    <scroll-view class="bus-list__inner"
                 scroll-y>
      <view class="bus-list__hd">
        <slot name="title">
          <view class="bus-list__title">{{ title||'' }}</view>
        </slot>
      </view>
      <view class="bus-list__bd">
        <!-- 注意：插槽的作用域是在当前组件下 -->
        <slot name="item">
          <view class="bus-list__item"
                v-for="(item, index) in data"
                :key="index"
                @click="clickHandler(item,index)">{{ item }}</view>
        </slot>
      </view>
    </scroll-view>
  </view>
</template>
<script>
export default {
  name: 'BusList',
  methods: {
    clickHandler(item, index) {
      this.$emit('item-click', item, index)
    }
  },
  props: {
    data: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
@include b(list) {
  height: 100%;
  overflow: hidden;
  @include e(inner) {
    height: 100%;
  }
  @include e(hd) {
    font-size: $--font-size-base;
    background: $--color-background;
  }
  @include e(title) {
    color: $--color-title;
    font-size: $--font-size-h4;
  }
  @include e(bd) {
  }
  @include e(item) {
    @include extend-rule(list-item);
  }
}
</style>
