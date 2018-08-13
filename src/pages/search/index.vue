<template>
  <view class="bus-search">
    <view class="bus-search__hd">
      <input class="bus-search__input"
             type="text"
             placeholder="搜索"
             placeholder-class="bus-search__placeholder"
             v-model="searchText"
             auto-focus
             @confirm="searchHandler">
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
      <bus-auto-complete v-model="searchText"
                         v-if="searchText" />
      <bus-search-history :search-value="searchValue" />
    </view>
  </view>
</template>

<script>
import BusSearchHistory from './history'
import BusAutoComplete from './autoComplete'

const createData = function() {
  return {
    searchText: null,
    searchValue: null
  }
}

export default {
  name: 'BusComponentSearch',
  components: {
    BusAutoComplete,
    BusSearchHistory
  },
  onHide() {
    /**
     * 详情页返回搜索页触发
     * 传递数据到`历史记录`模块
     */
    this.searchValue = this.searchText
  },
  onUnload() {
    /**
     * 搜索页面返回首页触发
     * 重置数据
     */
    this.$setData(createData())
  },
  data() {
    return createData()
  },
  methods: {
    clearHandler() {
      this.searchText = null
    },
    searchHandler() {
      const { searchText } = this
      this.searchValue = searchText
      wx.navigateTo({
        url: `/pages/routerDetail/main?router=${searchText}`
      })
    }
  }
}
</script>

<style lang="scss">
@include b(search) {
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  @include e(hd) {
    flex: none;
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
    color: $--color-primary-lighter;
    font-size: $--font-size-extra;
  }
  @include e(icon) {
    position: absolute;
    top: 20px;
    right: 10px;
    padding: 8px 10px;
  }
  @include e(bd) {
    position: relative;
    flex: 1;
    overflow: hidden;
  }
}
</style>
