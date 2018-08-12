<template>
  <view class="bus-stop">
    <bus-loading v-if="loading" />
    <scroll-view scroll-x
                 v-else-if="data">
      <view class="bus-stop__card"
            v-for="(item,index) in data"
            :key="index">
        <bus-count :format="format"
                   :date="item.time * 1000" />
        <view class="bus-stop__extra-info">
          <view class="bus-stop__station-num">剩余{{ item.stationSum }}站</view>
          <view class="bus-stop__distance">约{{ item.distance }}米</view>
        </view>
        <view class="bus-stop__plate-number">车牌：{{ item.plateNumber }}</view>
      </view>
    </scroll-view>
    <view class="bus-stop__reload"
          v-else-if="isError">
      <button type="primary">重新查询</button>
    </view>
    <view class="bus-stop__empty"
          v-else>
      <view class="bus-stop__empty-icon bus-icon bus-naozhong" />
      <text class="bus-stop__empty-text">等待发车</text>
    </view>
  </view>
</template>

<script>
import BusCount from '@/components/count'
import BusLoading from '@/components/loading'
import { paddingLeftZero } from '@/js/utils'
import { getStopInfo } from '@/apis/routerDetail'
export default {
  name: 'BusStop',
  components: {
    BusCount,
    BusLoading
  },
  created() {
    this.init()
  },
  beforeDestroy() {
    this.request.abort()
  },
  data() {
    return {
      data: null,
      request: null,
      loading: true,
      isError: false
    }
  },
  methods: {
    init() {
      const { station } = this
      if (!station) {
        return
      }
      this.request = getStopInfo(station)
        .then((data) => {
          this.$nextTick(() => {
            this.data = data
          })
        })
        .catch((error) => {
          this.$nextTick(() => {
            this.isError = true
          })
          console.log(error)
        })
        .always(() => {
          this.loading = false
        })
    },
    format(value) {
      const total = Math.floor(value / 1000)
      const min = Math.floor(total / 60)
      const sec = Math.floor(total % 60)
      return `${paddingLeftZero(min)}:${paddingLeftZero(sec)}`
    }
  },
  props: {
    station: {
      // 要查询的站台
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss">
@include b(stop) {
  position: relative;
  padding-top: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  @include e(card) {
    display: inline-block;
    padding: 10px;
    color: $--color-text-light;
    font-size: $--font-size-desc;
    background: $--color-white;
    & + .bus-stop__card {
      margin-left: 10px;
    }
  }
  @include e(extra-info) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @include e(distance) {
    margin-left: 5px;
  }
  @include e(plate-number) {
    text-align: center;
  }
  @include e(empty) {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    color: $--color-disable;
  }
  @include e(empty-icon) {
    font-size: $--font-size-h2;
  }
  @include e(empty-text) {
    margin-left: 5px;
  }
}
</style>
