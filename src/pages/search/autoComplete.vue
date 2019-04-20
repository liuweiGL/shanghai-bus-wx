<template>
  <view class="bus-autocomplete">
    <bus-list :data="data">
      <template slot="list">
        <view
          class="bus-autocomplete__item"
          v-for="item in data"
          :key="item"
          @click="itemClickHandler(item)"
        >
          <icon type="search" size="14" color="rgba(0, 0, 0, .45)"/>
          <view class="bus-autocomplete__text">{{ item }}</view>
        </view>
      </template>
    </bus-list>
  </view>
</template>
<script>
import routers from '@/js/routers'
import debounce from '@/js/debounce'

// 把路线名称短的排前面，文字按 `unicode` 排序
routers.sort((a, b) => {
  const lenCompare = a.length - b.length
  return lenCompare === 0 ? a[0].charCodeAt(0) - b[0].charCodeAt(0) : lenCompare
})

export default {
  name: 'BusAutocomplete',
  data() {
    return {
      data: null
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: 'filterRoutersHandler'
    }
  },
  methods: {
    itemClickHandler(item) {
      console.log(item)
      this.$emit('item-click', item)
    },
    filterRoutersHandler: debounce(function(searchText) {
      this.data = routers
        .filter((item) => item.indexOf(searchText) > -1)
        .slice(0, 10)
    }, 300)
  },
  props: {
    value: {
      type: String,
      default: null
    }
  }
}
</script>
<style lang="scss">
@include b(autocomplete) {
  position: absolute;
  top: 0;
  left: 0;
  z-index: $--z-index-top;
  width: 100%;
  height: 100%;
  background: $--color-white;
  @include e(item) {
    @include extend-rule(middle-row);
    @include extend-rule(list-item);
    padding: 15px 20px;
  }
  @include e(text) {
    margin-left: 5px;
  }
}
</style>
