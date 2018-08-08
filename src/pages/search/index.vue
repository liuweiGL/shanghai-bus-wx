<template>
  <view class="bus-search">
    <view class="bus-search__hd">
      <input type="text"
             class="bus-search__input"
             v-model="searchText"
             placeholder="搜索"
             placeholder-class="bus-search__placeholder"
             auto-focus
             @confirm="confirmHandler">
      <icon size="16"
            type="search"
            color="#597ef7"
            class="bus-search__icon"
            v-if="!searchText" />
      <icon size="16"
            type="clear"
            color="#85a5ff"
            class="bus-search__icon"
            @click="clearHandler"
            v-if="!!searchText" />
    </view>
    <view class="bus-search__bd">
      <bus-search-history />
    </view>
  </view>
</template>

<script>
import BusSearchHistory from './history'

export default {
  name: 'BusComponentSearch',
  components: {
    BusSearchHistory
  },
  data() {
    return {
      searchText: null
    }
  },
  methods: {
    clearHandler() {
      this.searchText = null
    },
    historySelectHandler(item) {
      console.log(item)
    },
    confirmHandler(event) {
      console.log(event)
    }
  }
}
</script>

<style lang="scss">
@include b(search) {
  @include e(hd) {
    padding: 20px 10px;
    background-color: $--color-primary;
  }
  @include e(input) {
    height: 32px;
    line-height: 32px;
    padding: 0 30px 0 10px;
    color: $--color-white;
    font-size: $--font-size-base;
    border: 0.5px solid $--color-primary-light;
    border-radius: 5px;
  }
  @include e(placeholder) {
    text-align: center;
    color: $--color-primary-light;
    font-size: $--font-size-extra;
  }
  @include e(icon) {
    position: absolute;
    top: 20px;
    right: 10px;
    padding: 8px 10px;
  }
}
</style>
