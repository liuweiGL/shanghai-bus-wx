<template>
  <view class="bus-search-history">
    <view class="bus-search-history__title">搜索历史：</view>
    <view class="bus-search-history__list"
          v-for="item in list"
          :key="item">
      <text class="bus-search-history__tag"
            @click="itemClickHandler(item)">{{ item }}</text>
    </view>
  </view>
</template>
<script>
export default {
  name: 'BusComponentSearchHistory',
  data() {
    return {
      list: null
    }
  },
  methods: {
    itemClickHandler(item) {
      this.$emit('select', item)
    }
  },
  props: {
    searchText: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
@include b(search-history) {
}
</style>
