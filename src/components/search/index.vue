<template>
  <view class="bus-search">
    <view class="bus-search__hd">
      <input type="text"
             class="bus-search__input"
             v-model="searchText"
             :placeholder="placeholder"
             auto-focus="autoFocus">
      <button type="primary"
              class="bus-search__btn">搜索</button>
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
    historySelectHandler(item) {
      console.log(item)
    }
  },
  props: {
    placeholder: {
      type: String,
      default: null
    },
    autoFocus: {
      type: Boolean,
      default: false
    }
  }
}
</script>
