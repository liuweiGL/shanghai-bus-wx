<template>
  <view class="bus-search">
    <view class="bus-search__hd">
      <input
        class="bus-search__input"
        type="text"
        placeholder="搜索"
        placeholder-class="bus-search__placeholder"
        v-model="searchText"
        auto-focus
        @confirm="searchHandler"
      >
      <icon size="16" type="search" color="#597ef7" class="bus-search__icon" v-if="!searchText"/>
      <icon
        size="16"
        type="clear"
        color="#85a5ff"
        class="bus-search__icon"
        @click="clearHandler"
        v-if="!!searchText"
      />
    </view>
    <view class="bus-search__bd">
      <bus-autocomplete v-model="searchText" @item-click="itemClickHandler" v-if="searchText"/>
      <bus-history :search-value="searchValue" @item-click="itemClickHandler"/>
    </view>
  </view>
</template>

<script>
import BusHistory from './history'
import BusAutocomplete from './autocomplete'

const createData = function() {
  return {
    searchText: null,
    searchValue: null
  }
}

export default {
  name: 'BusSearch',
  components: {
    BusHistory,
    BusAutocomplete
  },
  onShareAppMessage() {
    return {
      title: '公交搜索'
    }
  },
  onHide() {
    /**
     * 详情页返回搜索页触发
     * 清空搜索
     */
    this.searchText = null
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
    itemClickHandler(item) {
      this.searchText = item
      this.searchHandler()
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
  height: 100%;
  @include extend-rule(col);
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
