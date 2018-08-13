<template>
  <view class="bus-search-history">
    <scroll-view class="bus-search-scroll"
                 scroll-y>
      <view class="bus-search-history__hd">
        <text class="bus-search-history__title">搜索历史：</text>
        <button size="mini"
                class="bus-search-history__btn"
                hover-class="is-hover"
                plain
                @click="clearHistoryHandler">清除</button>
      </view>
      <bus-router-list :data="data" />
    </scroll-view>
  </view>
</template>
<script>
import Store from '@/js/store'
import { throttle } from '@/js/utils'
import BusRouterList from '@/components/routerList/index'

const localKey = 'bus_search_history'

export default {
  name: 'BusComponentSearchHistory',
  components: {
    BusRouterList
  },
  onLoad() {
    Store.get(localKey).then((data) => {
      this.data = data
    })
  },
  onUnload() {
    // 页面离开时，保存数据到本地
    Store.set(localKey, this.data)
  },
  data() {
    return {
      data: null
    }
  },
  watch: {
    searchValue: 'addItem'
  },
  methods: {
    addItem() {
      const { data, searchValue } = this
      if (!searchValue) {
        return
      }
      if (!data) {
        this.data = [searchValue]
      } else if (!data.includes(searchValue)) {
        data.push(searchValue)
      }
    },
    clearHistoryHandler: throttle(function() {
      this.data = null
      Store.remove(localKey)
    }, 2000)
  },
  props: {
    searchValue: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
@include b(search-history) {
  flex: 1;
  overflow: hidden;
  @include e(scroll) {
    height: 100%;
  }
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
    &[plain] {
      margin: 0;
      color: $--color-primary;
      border: none;
      border-radius: 0;
      @include when(hover) {
        color: $--color-primary-light;
      }
    }
  }
}
</style>
