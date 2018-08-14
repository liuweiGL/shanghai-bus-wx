<template>
  <view class="bus-auto-complete">
    <bus-list :data="list"
              @item-click="itemclickHandler" />
  </view>
</template>
<script>
import routers from '@/js/routers'
import { debounce } from '@/js/utils'

// 把路线名称短的排前面，文字按 `unicode` 排序
routers.sort((a, b) => {
  const lenCompare = a.length - b.length
  return lenCompare === 0 ? a[0].charCodeAt(0) - b[0].charCodeAt(0) : lenCompare
})

export default {
  name: 'BusAutoComplete',
  data() {
    return {
      list: null
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: 'filterRoutersHandler'
    }
  },
  methods: {
    itemclickHandler(item) {
      this.$emit('item-click', item)
    },
    filterRoutersHandler: debounce(function(searchText) {
      this.list = routers
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
@include b(auto-complete) {
  position: absolute;
  top: 0;
  left: 0;
  z-index: $--z-index-top;
  width: 100%;
  height: 100%;
  background: $--color-white;
}
</style>
