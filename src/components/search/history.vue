<template>
  <view class="bus-search-history">
    <view class="bus-search-history__hd">
      <text class="bus-search-history__title">搜索历史：</text>
      <button size="mini"
              class="bus-search-history__btn"
              hover-class="is-hover"
              plain>清除</button>
    </view>
    <scroll-view ref="list"
                 class="bus-search-history__list"
                 scroll-y>
      <view class="bus-search-history__item"
            v-for="item in list"
            :key="item">
        <view class="bus-search-history__name">{{ item.name }}</view>
        <view class="bus-search-history__desc">{{ item.desc }}</view>
      </view>
    </scroll-view>
  </view>
</template>
<script>
export default {
  name: 'BusComponentSearchHistory',
  updated() {
    this.setHeight()
  },
  data() {
    return {
      list: []
    }
  },
  watch: {
    router: 'addItem'
  },
  methods: {
    setHeight() {
      console.log(this.$refs.list)
    },
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
    padding: 10px;
  }
  @include e(btn) {
    margin: 0;
    color: $--color-primary;
    border: none;
    border-radius: 0;
    @include when(hover){
      color: $--color-primary-light;
    }
  }
  @include e(list) {
    height: 200px;
  }
}
</style>
