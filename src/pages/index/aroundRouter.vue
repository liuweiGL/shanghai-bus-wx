<template>
  <view class="bus-around-router">
    <scroll-view class="bus-around-router__scroll"
                 scroll-y>
      <view class="bus-around-router__hd">
        <text class="bus-around-router__text">附近公交：</text>
        <view class="bus-around-router__icon bus-icon bus-sync"
              hover-class="is-hover"
              @click="refreshHandler" />
      </view>
      <bus-loading v-if="loading" />
      <view class="bus-around-router__fail"
            v-else-if="fail">
        <button class="bus-around-router__btn"
                type="primary"
                size="mini"
                plain
                @click="failHandler">{{ btnText }}</button>
      </view>
      <bus-router-list :data="list"
                       v-else />
    </scroll-view>
  </view>
</template>

<script>
import BusTip from '@/components/tip'
import { throttle } from '@/js/utils'
import BusLoading from '@/components/loading'
import BusRouterList from '@/components/routerList'
import { getBusByLocation } from '@/apis/aroundRouter'

// 失败原因
const Fail = {
  NONE: '',
  API: 'API',
  LOCATION: 'LOCATION',
  PERMISSION: 'PERMISSION'
}

export default {
  name: 'BusAroundBus',
  components: {
    BusTip,
    BusLoading,
    BusRouterList
  },
  created() {
    this.init()
  },
  data() {
    return {
      list: null,
      fail: Fail.NONE,
      loading: false
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
      this.loading = true
      return getBusByLocation(this.location)
        .then((data) => {
          this.list = data
          this.fail = Fail.NONE
          this.loading = false
        })
        .catch((error) => {
          // 请求失败，提示重新请求
          setTimeout(() => {
            this.fail = Fail.API
            this.loading = false
          }, 200)
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
    // 刷新
    refreshHandler: throttle(function(event) {
      this.getRouterNames().then(() => {
        wx.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 1000
        })
      })
    }, 1000)
  }
}
</script>

<style lang="scss">
@include b(around-router) {
  position: relative;
  height: 100%;
  @include e(hd) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: $--font-size-base;
    background: $--color-background;
  }
  @include e(text) {
    padding-left: 10px;
  }
  @include e(icon) {
    padding: 15px 10px;
    color: $--color-primary;
    @include when(hover) {
      color: $--color-primary-lighter;
    }
  }
  @include e(scroll) {
    height: 100%;
  }
  @include e(fail) {
    text-align: center;
  }
  @include e(btn) {
    padding: 4px 12px;
    margin-top: 100px;
  }
  .bus-loading {
    margin-top: 100px;
  }
}
</style>
