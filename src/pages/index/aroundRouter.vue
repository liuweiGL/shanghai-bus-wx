<template>
  <view class="bus-around-router">
    <bus-tip top="0"
             text="刷新路线成功"
             :show.sync="showTip" />
    <scroll-view class="bus-around-router__scroll"
                 scroll-y
                 @scrolltoupper="scrolltoupperHandler">
      <view class="bus-around-router__hd">附近公交：</view>
      <view class="bus-around-router__fail"
            v-if="fail">
        <button type="primary"
                class="bus-around-router__btn"
                @click="failHandler">{{ btnText }}</button>
      </view>
      <bus-router-list :data="list"
                       @item-click="selectItemHandler"
                       v-else />
    </scroll-view>
  </view>
</template>

<script>
import BusTip from '@/components/tip'
import { throttle } from '@/js/utils'
import BusRouterList from '@/components/routerList'
import { getBusByLocation } from '@/apis/aroundRouter'

// 失败原因
const Fail = {
  API: 'API',
  LOCATION: 'LOCATION',
  PERMISSION: 'PERMISSION'
}

export default {
  name: 'BusAroundBus',
  components: {
    BusTip,
    BusRouterList
  },
  created() {
    this.init()
  },
  data() {
    return {
      list: null,
      fail: false,
      showTip: false
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
      // getBusByLocation(this.location)
      return getBusByLocation('121.4737,31.23037')
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
    },
    // 下拉刷新
    scrolltoupperHandler: throttle(function(event) {
      this.getRouterNames().then(() => {
        this.showTip = true
      })
    }, 500),
    selectItemHandler(item) {
      wx.navigateTo({
        url: `/pages/routerDetail/main?router=${item}`
      })
    }
  }
}
</script>

<style lang="scss">
@include b(around-router) {
  position: relative;
  height: 100%;
  @include e(hd) {
    padding: 15px 10px;
    font-size: $--font-size-base;
    background: $--color-background-light;
  }
  @include e(loading) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
  }
  @include e(scroll) {
    height: 100%;
  }
}
</style>
