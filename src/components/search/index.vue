<template>
  <view class="bus-search">
    <view class="bus-search__hd">
      <input type="text"
             class="bus-search__input"
             v-model="searchText"
             :placeholder="placeholder"
             placeholder-class="bus-search__placeholder"
             auto-focus="autoFocus"
             @confirm="confirmHandler">
      <icon size="16"
            color="#b2b2b2"
            type="search"
            class="bus-search__icon"
            v-if="!searchText" />
      <icon size="16"
            color="#888"
            type="clear"
            class="bus-search__icon"
            @click="clearHandler"
            v-if="!!searchText" />
    </view>
    <view class="bus-search__bd">
      <bus-search-history :search-text="searchText"
                          @select="historySelectHandler" />
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
  },
  props: {
    placeholder: {
      type: String,
      default: '搜索'
    },
    autoFocus: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@include b(search) {
  @include e(hd) {
    padding: 8px 10px;
    background-color: #efeff4;
    border-top: 1rpx solid #d7d6dc;
    border-bottom: 1rpx solid #d7d6dc;
  }
  @include e(input) {
    height: 28px;
    line-height: 28px;
    padding: 0 30px 0 10px;
    border: 0.5px solid #d7d6dc;
    border-radius: 5px;
  }
  @include e(placeholder) {
    text-align: center;
  }
  @include e(icon) {
    position: absolute;
    right: 20px;
    top: 15px;
  }
}
</style>
