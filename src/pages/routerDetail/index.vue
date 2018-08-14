<template>
  <view class="bus-router-detail">
    <block v-if="data">
      <view class="bus-router-detail__hd">
        <view class="bus-router-detail__info bus-router-detail__info--primary">
          <view class="bus-router-detail__name">{{ data.name }}</view>
          <bus-icon name="bus-swap"
                    extra-class="bus-router-detail__swap"
                    @click="swapRouterHandler" />
        </view>
        <view class="bus-router-detail__info">
          <view class="bus-router-detail__time">首班车：{{ data.startTime }}</view>
          <view class="bus-router-detail__time">末班车：{{ data.endTime }}</view>
          <view class="bus-router-detail__price">票价：￥{{ data.price }}</view>
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
              <text class="bus-router-detail__label">{{ item }}</text>
              <bus-icon name="bus-star"
                        extra-class="bus-router-detail__icon"
                        @click="collectionHandler(index)" />
            </view>
            <bus-stop :station="station"
                      v-if="currentIndex === index" />
          </view>
        </scroll-view>
      </view>
    </block>
    <bus-alert msg="没有此公交信息"
               button-text="返回"
               @click="gobackHandler"
               v-else-if="isEmpty" />
    <bus-alert type="error"
               msg="查询失败"
               button-text="重新查询"
               @click="getRouterDetail"
               v-else-if="isError" />
  </view>
</template>
<script>
import BusStop from './stop'
import { getBusByRouter } from '@/apis/routerDetail'

const createData = function() {
  return {
    data: null,
    direction: 0,
    request: null,
    station: null,
    isError: false,
    isEmpty: false,
    currentIndex: null
  }
}
export default {
  name: 'BusRouterDetail',
  components: {
    BusStop
  },
  onLoad() {
    // 重置数据源
    this.getRouterDetail()
  },
  onUnload() {
    this.$setData(createData())
    this.request && this.request.abort()
  },
  data() {
    return createData()
  },
  methods: {
    // 时间格式化
    timeFormat(value) {
      return value ? value.replace(/(^.{2})/, '$1:') : '-'
    },
    // 获取公交详情
    getRouterDetail() {
      wx.showLoading()
      this.request = getBusByRouter(this.$root.$mp.query.router)
        .then((data) => {
          this.data = data
          this.isEmpty = !data
          if (data) {
            data.startTime = this.timeFormat(data.startTime)
            data.endTime = this.timeFormat(data.endTime)
            data.price = data.price || '-'
          }
        })
        .catch((error) => {
          this.isError = true
          console.log(error)
        })
        .always(() => {
          wx.hideLoading()
        })
    },
    // 查询到站信息
    searchStopHandler(index) {
      if (this.currentIndex === index) {
        this.currentIndex = null
      } else {
        this.currentIndex = index
        this.station = {
          sid: this.data.sid,
          direction: this.direction,
          stationIndex: index + 1
        }
      }
    },
    // 反转路线
    swapRouterHandler() {
      const {
        data,
        data: { name, stations }
      } = this
      this.currentIndex = null
      this.direction = this.direction ? 0 : 1
      this.data = {
        ...data,
        stations: stations.slice().reverse(),
        name: name.replace(/(?:(\()(.*?)(--)(.*)(\)))/, '$1$4$3$2$5')
      }
    },
    // 收藏
    collectionHandler(index) {
      // 公交名称，站台下标
      console.log(index)
    },
    // 查询信息为空，返回
    gobackHandler() {
      wx.navigateBack()
    }
  }
}
</script>

<style lang="scss">
@include b(router-detail) {
  position: relative;
  height: 100%;
  @include extend-rule(col);
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
    @include extend-rule(list-item);
    @include when(active) {
      color: $--color-title;
      background: $--color-table-header;
    }
    padding: 0;
  }
  @include e(station) {
    @include extend-rule(between-row);
  }
  @include e(label) {
    padding-left: 10px;
  }
  @include e(icon) {
    padding: 15px 10px;
    color: $--color-text-light;
    font-size: $--font-size-h4;
  }
}
</style>
