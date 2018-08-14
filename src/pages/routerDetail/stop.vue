<template>
  <view class="bus-stop">
    <bus-loading v-if="loading" />
    <scroll-view scroll-x
                 v-else-if="data">
      <view class="bus-stop__card"
            v-for="(item,index) in data"
            :key="index">
        <bus-count :format="format"
                   :time="item.time" />
        <view class="bus-stop__extra-info">
          <view class="bus-stop__station-num">剩余{{ item.stationSum }}站</view>
          <view class="bus-stop__distance">约{{ item.distance }}米</view>
        </view>
        <view class="bus-stop__plate-number">车牌：{{ item.plateNumber }}</view>
      </view>
    </scroll-view>
    <view class="bus-stop__reload"
          v-else-if="isError">
      <button type="primary"
              size="mini"
              plain
              @click.stop="queryStopInfo">重新查询</button>
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
import { getStopInfo } from '@/apis/routerDetail'
export default {
  name: 'BusStop',
  components: {
    BusCount,
    BusLoading
  },
  created() {
    this.queryStopInfo()
  },
  beforeDestroy() {
    this.request.abort()
  },
  data() {
    return {
      data: null,
      request: null,
      loading: false,
      isError: false
    }
  },
  methods: {
    queryStopInfo() {
      this.loading = true
      this.request = getStopInfo(this.station)
        .then((data) => {
          this.$nextTick(() => {
            this.data = data
          })
        })
        .catch((error) => {
          console.log(error)
          this.$nextTick(() => {
            this.isError = true
          })
        })
        .always(() => {
          setTimeout(() => {
            this.loading = false
          }, 200)
        })
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
  padding-bottom: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  @include e(card) {
    display: inline-block;
    padding: 10px;
    color: $--color-text-light;
    font-size: $--font-size-desc;
    background: $--color-white;
    border-radius: 4px;
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
  @include e(reload) {
    display: flex;
    align-items: center;
    height: 48px;
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
