<template>
  <view class="bus-search-history">
    <bus-list :data="data">
      <template slot="title">
        <view class="bus-search-history__hd">
          <text class="bus-search-history__title">搜索历史：</text>
          <button size="mini"
                  class="bus-search-history__btn"
                  hover-class="is-hover"
                  plain
                  @click="clearHistoryHandler">清除</button>
        </view>
      </template>
      <template slot="list">
        <view class="bus-search-history__item"
              v-for="item in data"
              :key="item"
              @click="itemClickHandler(item)">
          <bus-icon name="bus-time-circle"
                    extra-class="bus-search-history__icon" />
          <view class="bus-search-history__text">{{ item }}</view>
        </view>
      </template>
    </bus-list>
  </view>
</template>
<script>
import Store from '@/js/store'
import { throttle } from '@/js/utils'

const localKey = 'bus_search_history'

export default {
  name: 'BusComponentSearchHistory',
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
    }, 2000),
    itemClickHandler(item) {
      this.$emit('item-click', item)
    }
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
  height: 100%;
  @include e(hd) {
    color: $--color-title;
    background: $--color-background;
    @include extend-rule(between-row);
  }
  @include e(title) {
    padding-left: 10px;
    font-size: $--font-size-base;
  }
  @include e(btn) {
    &[plain] {
      margin: 0;
      line-height: 1;
      padding: $--padding;
      color: $--color-primary;
      font-size: $--font-size-base;
      border: none;
      border-radius: 0;
      @include when(hover) {
        color: $--color-primary-light;
      }
    }
  }
  @include e(item) {
    @include extend-rule(middle-row);
    @include extend-rule(list-item);
  }
  @include e(icon) {
    color: $--color-text-light;
  }
  @include e(text) {
    margin-left: 5px;
  }
}
</style>
