<template>
  <view class="bus-router-detail">
    <block v-if="data">
      <view class="bus-router-detail__hd">
        <view class="bus-router-detail__info">
          <view class="bus-router-detail__name">{{ data.name }}</view>
        </view>
        <view class="bus-router-detail__info">
          <view class="bus-router-detail__time">首班车：{{ data.startTime || '-' }}</view>
          <view class="bus-router-detail__time">末班车：{{ data.endTime || '-' }}</view>
          <view class="bus-router-detail__price">票价：￥{{ data.price|| '-' }}</view>
        </view>
      </view>
      <view class="bus-router-detail__bd">
        <scroll-view class="bus-router-detail__list"
                     scroll-y>
          <view class="bus-router-detail__item"
                v-for="(item,index) in data.stations"
                :key="index">
            <text>{{ item.name }}</text>
            <view class="iconfont icon-arrowdown" />
          </view>
        </scroll-view>
      </view>
    </block>
    <view class="bus-router-detail__tips"
          v-else>
      <button type="primary"
              class="bus-common__btn--big"
              v-if="fail === 'ERROR'">重新查询</button>
      <icon type="warn"
            v-else-if="fail === 'EMPTY'">没有此公交路线信息</icon>
    </view>
  </view>
</template>
<script>
import { getBusByRouter } from '@/apis/routerDetail'

export default {
  name: 'BusRouterDetail',
  onLoad() {
    // this.getRouterDetail(this.$root.$mp.query.router)
    this.getRouterDetail('49路')
  },
  data() {
    return {
      data: null,
      routers: null,
      loading: true,
      isError: false,
      isEmpty: false
    }
  },
  methods: {
    getRouterDetail(router) {
      getBusByRouter(router)
        .then((data) => {
          const { routers } = data
          if (routers && routers.length) {
            this.routers = routers
            this.data = routers[0]
            console.log(this.data)
          } else {
            this.isEmpty = true
          }
        })
        .catch((error) => {
          this.isError = true
          console.log(error)
        })
    },
    selectItemHandler(index) {
      console.log(index)
    }
  }
}
</script>

<style lang="scss">
@include b(router-detail) {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  @include e(hd) {
    flex: none;
  }
  @include e(hd) {
    flex: 1;
    overflow: hidden;
    padding: 15px 20px;
    background: $--color-background;
  }
  @include e(info) {
    display: flex;
    padding: 5px 0;
  }
  @include e(name) {
    font-weight: bold;
    color: $--color-title;
    font-size: $--font-size-base;
  }
  @include e(time) {
    flex: 1;
    color: $--color-text-light;
    font-size: $--font-size-desc;
  }
  @include e(price) {
    flex: 1;
    color: $--color-text-light;
    font-size: $--font-size-desc;
  }
  @include e(list) {
    height: 100%;
  }
  @include e(item) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include list-item;
  }
  @include e(tips) {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
  }
}
</style>
