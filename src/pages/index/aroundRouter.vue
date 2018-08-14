<template>
  <view class="bus-around-router">
    <bus-loading v-if="loading" />
    <view class="bus-around-router__fail"
          v-else-if="fail">
      <!-- 可以使用 `button` 打开设置面板 -->
      <button class="bus-around-router__btn"
              open-type="openSetting"
              type="primary"
              size="mini"
              plain
              @error="errorHandler"
              @opensetting="openSettingHandler"
              v-if="!canIUse && fial === 'PERMISSION'">{{ btnText }}</button>
      <!-- 可以使用 `button` 打开反馈页面 -->
      <button class="bus-around-router__btn"
              open-type="feedback"
              type="primary"
              size="mini"
              plain
              v-else-if="!canIUse && fial === 'EXCEPTION'">{{ btnText }}</button>
      <!-- `button` 暂不支持开放能力 -->
      <bus-alert type="warn"
                 msg="请升级微信版本"
                 v-else-if="canIUse && fail === 'EXCEPTION'" />
      <!-- 可以使用 `api` 直接打开设置页面 -->
      <button class="bus-around-router__btn"
              type="primary"
              size="mini"
              plain
              @click="otherFailHandler"
              v-else>{{ btnText }}</button>
    </view>
    <!-- 无公交数据 -->
    <bus-alert msg="附近没有公交"
               v-else-if="isEmpty" />
    <bus-list :data="list"
              @item-click="itemClickHandler"
              v-else>
      <template slot="title">
        <view class="bus-around-router__hd">
          <text class="bus-around-router__text">附近公交：</text>
          <bus-icon name="bus-sync"
                    extra-class="bus-around-router__icon"
                    @click="refreshHandler" />
        </view>
      </template>
    </bus-list>
  </view>
</template>

<script>
import { throttle } from '@/js/utils'
import { getBusByLocation } from '@/apis/aroundRouter'

// 失败原因
const Fail = {
  NONE: '',
  API: 'API',
  LOCATION: 'LOCATION',
  PERMISSION: 'PERMISSION',
  EXCEPTION: 'EXCEPTION'
}

export default {
  name: 'BusAroundBus',
  created() {
    this.getPermission()
  },
  data() {
    return {
      list: null,
      fail: Fail.NONE,
      loading: false,
      isEmpty: false,
      canIUse: wx.canIUse('openSetting')
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
        case Fail.EXCEPTION:
          return '报告错误'
        default:
          return ''
      }
    }
  },
  methods: {
    getPermission() {
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
      if (!this.location) {
        return Promise.reject(this.getPermission())
      }
      this.loading = true
      return getBusByLocation(this.location)
        .then((data) => {
          this.list = data
          this.isEmpty = !(data && data.length)
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
        },
        fail: this.errorHandler
      })
    },
    // 异常情况处理逻辑
    otherFailHandler() {
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
          this.canIUse && this.openSetting()
          break
      }
    },
    // hook `API` 升级
    openSettingHandler({ authSetting }) {
      console.log(authSetting)
      // 用户开启，重新定位
      if (authSetting['scope.userLocation']) {
        this.getLocation()
      }
    },
    // 开启失败，打开反馈面板
    errorHandler(error) {
      console.log(error)
      this.fail = Fail.EXCEPTION
    },
    // 刷新
    refreshHandler: throttle(function(event) {
      this.getRouterNames()
    }, 1000),
    // 选择 路线 => 详情页
    itemClickHandler(item) {
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
    font-size: $--font-size-base;
    background: $--color-background;
    @include extend-rule(between-row);
  }
  @include e(text) {
    padding-left: 10px;
  }
  @include e(icon) {
    padding: $--padding;
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
    @include extend-rule(small-btn);
  }
  .bus-loading {
    margin-top: 100px;
  }
}
</style>
