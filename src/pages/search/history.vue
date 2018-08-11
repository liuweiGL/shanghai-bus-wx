<template>
  <view class="bus-search-history">
    <view class="bus-search-history__hd">
      <text class="bus-search-history__title">搜索历史：</text>
      <button size="mini"
              class="bus-search-history__btn"
              hover-class="is-hover"
              plain>清除</button>
    </view>
    <bus-router-list :data="list" />
  </view>
</template>
<script>
import BusRouterList from '@/components/routerList/index'

export default {
  name: 'BusComponentSearchHistory',
  components: {
    BusRouterList
  },
  data() {
    return {
      list: Array.from({ length: 5 }).map((item, index) => {
        return {
          name: '公交路线' + index,
          desc: '-'
        }
      })
    }
  },
  watch: {
    router: 'addItem'
  },
  methods: {
    addItem() {
      // const {router,list}=this
    },
    itemClickHandler(item) {
      this.$emit('select', item)
    }
  },
  props: {
    router: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss">
@include b(search-history) {
  @include e(hd) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    color: $--color-title;
    background: $--color-background;
  }
  @include e(title) {
    padding-left: 10px;
    font-size: $--font-size-base;
  }
  @include e(btn) {
    margin: 0;
    color: $--color-primary;
    border: none;
    border-radius: 0;
    @include when(hover) {
      color: $--color-primary-light;
    }
  }
}
</style>
