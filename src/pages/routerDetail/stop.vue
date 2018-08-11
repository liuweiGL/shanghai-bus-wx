<template>
  <view class="bus-stop">
    <view class="plate-number">车牌号：{{ data.plateNumber }}</view>
    <view class="bus-stop__extra">
      <view class="bus-stop__station-num">途径站数：{{ data.stationSum }}</view>
      <view class="bus-stop__distance">途径距离：{{ data.distance }}米</view>
      <view class="bus-stop__time">预计时间：{{ data.time }}</view>
    </view>
  </view>
</template>

<script>
// import { getStopInfo } from '@/apis/routerDetail'

export default {
  name: 'BusStop',
  created() {
    console.log('111')
  },
  data() {
    return {
      data: {}
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
