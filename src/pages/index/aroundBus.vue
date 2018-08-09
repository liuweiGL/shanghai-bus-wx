<template>
  <scroll-view class="bus-around-bus"
               scroll-y>
    <view class="bus-around-bus__hd">附近公交：</view>
    <view class="bus-around-bus__fail"
          v-if="fail">
      <button type="primary"
              class="bus-around-bus__btn"
              @click="failHandler">{{ btnText }}</button>
    </view>
    <bus-router-list :data="list"
                     v-else />
  </scroll-view>
</template>

<script>
import BusRouterList from '@/components/routerList'
import { getBusByLocation } from '@/apis/aroundBus'

// 失败原因
const Fail = {
  API: 'API',
  LOCATION: 'LOCATION',
  PERMISSION: 'PERMISSION'
}

export default {
  name: 'BusAroundBus',
  components: {
    BusRouterList
  },
  created() {
    this.init()
  },
  data() {
    return {
      list: null,
      fail: false
    }
  },
  computed: {
    btnText() {
      switch (this.fail) {
        case Fail.API:
          return '重新获取'
        case Fail.LOCATION:
          return '重新定位'
        case Fail.PERMISSION:
          return '开启定位'
        default:
          return ''
      }
    }
  },
  methods: {
    init() {
      wx.authorize({
        scope: 'scope.userLocation',
        success: this.getLocation, // 用户允许定位
        fail: () => {
          // 用户禁止定位，提示用户开启，并使用开启指导
          this.fail = Fail.PERMISSION
        }
      })
    },
    // 定位
    getLocation() {
      wx.getLocation({
        success: (data) => {
          this.location = `${data.longitude},${data.latitude}`
          this.getRouterNames()
        },
        fail: (error) => {
          // 定位失败，提示重新定位
          this.fail = Fail.LOCATION
          console.log(error)
        }
      })
    },
    // 查询附件公交
    getRouterNames() {
      getBusByLocation(this.location)
        .then((data) => {
          this.list = data.routerNames
          this.fail = false
        })
        .catch((error) => {
          // 请求失败，提示重新请求
          this.fail = Fail.API
          console.log(error)
        })
    },
    // 指导用户开启权限
    openSetting() {
      wx.openSetting({
        success: ({ authSetting }) => {
          // 用户开启，重新定位
          if (authSetting['scope.userLocation']) {
            this.getLocation()
          }
        }
      })
    },
    // 异常情况处理逻辑
    failHandler() {
      switch (this.fail) {
        case Fail.API:
          // 重新获取数据
          this.getRouterNames()
          break
        case Fail.LOCATION:
          // 重新定位
          this.getLocation()
          break
        case Fail.PERMISSION:
          // 指导用户开启定位权限
          this.openSetting()
          break
      }
    }
  }
}
</script>

<style lang="scss">
@include b(around-bus) {
  height: 100%;
  @include e(hd) {
    padding: 15px 10px;
    font-size: $--font-size-base;
    background: $--color-background-light;
  }
}
</style>
