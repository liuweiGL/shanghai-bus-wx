<template>
  <view class="bus-router-detail">
    <block v-if="data">
      <view class="bus-router-detail__hd">
        <view class="bus-router-detail__info bus-router-detail__info--primary">
          <view class="bus-router-detail__name">{{ data.name }}</view>
          <view class="bus-router-detail__swap bus-icon bus-swap"
                hover-class="is-hover" />
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
                :class="currentIndex === index ? 'is-active':''"
                v-for="(item,index) in data.stations"
                :key="index"
                @click="searchStopHandler(index)">
            <view class="bus-router-detail__station">
              <text>{{ item.name }}</text>
              <view class="bus-router-detail__right bus-icon bus-right" />
            </view>
            <bus-stop :station="station"
                      v-if="currentIndex === index" />
          </view>
        </scroll-view>
      </view>
    </block>
    <view class="bus-router-detail__tips"
          v-else>
      <button type="primary"
              class="bus-router-detail__btn"
              v-if="fail === 'ERROR'">重新查询</button>
      <icon type="warn"
            v-else-if="fail === 'EMPTY'">没有此公交路线信息</icon>
    </view>
  </view>
</template>
<script>
import BusStop from './stop'
import { getBusByRouter } from '@/apis/routerDetail'

export default {
  name: 'BusRouterDetail',
  components: {
    BusStop
  },
  onLoad() {
    // this.getRouterDetail(this.$root.$mp.query.router)
    this.getRouterDetail('1604')
  },
  data() {
    return {
      data: null,
      routers: null,
      loading: true,
      isError: false,
      isEmpty: false,
      station: null,
      currentIndex: null
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
          } else {
            this.isEmpty = true
          }
        })
        .catch((error) => {
          this.isError = true
          console.log(error)
        })
    },
    searchStopHandler(index) {
      this.currentIndex = this.currentIndex === index ? null : index
    }
  }
}
</script>

<style lang="scss">
@include b(router-detail) {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  @include e(hd) {
    flex: none;
    padding: 15px 10px;
    background: $--color-background;
    border-bottom: 1px solid $--color-divider;
  }
  @include e(bd) {
    flex: 1;
    overflow: hidden;
  }
  @include e(info) {
    display: flex;
    padding: 5px 0;
    @include m(primary) {
      justify-content: space-between;
    }
  }
  @include e(name) {
    font-weight: bold;
    color: $--color-title;
    font-size: $--font-size-h4;
  }
  @include e(swap) {
    padding: 0 10px;
    color: $--color-primary;
    font-size: $--font-size-h2;
    @include when(hover) {
      color: $--color-primary-lighter;
    }
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
    @include list-item;
    @include when(active) {
      color: $--color-title;
      background: rgba($--color-background,.01);
    }
  }
  @include e(station) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @include e(right) {
    color: $--color-text-light;
  }
  @include e(tips) {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
  }
  @include e(btn) {
    @include big-btn;
  }
}
</style>
