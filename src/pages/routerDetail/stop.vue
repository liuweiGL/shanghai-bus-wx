<template>
  <view :class="clazz">
    <scroll-view scroll-x
                 v-if="data">
      <view class="bus-stop__card">
        <bus-count :format="format"
                   :time="data[0]['time']" />
        <view class="bus-stop__extra-info">
          <view class="bus-stop__station-num">剩余{{ data[0]['stationSum'] }}站</view>
          <view class="bus-stop__distance">约{{ data[0]['distance'] }}米</view>
        </view>
        <view class="bus-stop__plate-number">车牌：{{ data[0]['plateNumber'] }}</view>
        <slot name="scope" />
      </view>
    </scroll-view>
    <view class="bus-stop__card bus-stop__card--transparent"
          v-else>
      <bus-loading v-if="loading" />
      <bus-button type="primary"
                  plain
                  @click="queryStopInfo"
                  v-else-if="isError">重新查询</bus-button>
      <view class="bus-stop__empty"
            v-else>
        <bus-icon name="bus-naozhong"
                  extra-class="bus-stop__empty-icon" />
        <text class="bus-stop__empty-text">等待发车</text>
      </view>
      <view class="bus-stop__slot-wrap">
        <slot name="scope" />
      </view>
    </view>
  </view>
</template>

<script>
import BusCount from './count'
import { getStopInfo } from '@/apis/routerDetail'
export default {
  name: 'BusStop',
  components: {
    BusCount
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
  computed: {
    clazz() {
      return 'bus-stop ' + this.extraClass
    }
  },
  watch: {
    station: {
      immediate: true,
      handler: 'queryStopInfo'
    }
  },
  methods: {
    queryStopInfo() {
      this.data = null
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
    },
    // 暴露给父组件调用
    refresh() {
      this.queryStopInfo()
    }
  },
  props: {
    station: {
      // 要查询的站台
      type: Object,
      default: null
    },
    scope: {
      type: Object,
      default: null
    },
    extraClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@include b(stop) {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  @include e(card) {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 4px;
    color: $--color-text-light;
    font-size: $--font-size-desc;
    background: $--color-white;
    @include m(transparent) {
      background: transparent;
    }
  }
  @include e(extra-info) {
    @include extend-rule(center-row);
  }
  @include e(distance) {
    margin-left: 5px;
  }
  @include e(plate-number) {
    text-align: center;
  }
  @include e(reload) {
    height: 48px;
  }
  @include e(empty) {
    @include extend-rule(bottom-row);
  }
  @include e(empty-icon) {
    color: $--color-disable;
    font-size: $--font-size-h2;
  }
  @include e(empty-text) {
    margin-left: 5px;
    color: $--color-disable;
  }
  @include e(slot-wrap) {
    margin-top: 10px;
  }
}
</style>
