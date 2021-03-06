<template>
  <view class="bus-around-router">
    <bus-loading v-if="loading"/>
    <view class="bus-around-router__fail" v-else-if="fail">
      <!-- 打开设置面板 -->
      <button
        class="bus-around-router__btn"
        open-type="openSetting"
        type="primary"
        size="mini"
        plain
        @error="errorHandler"
        @opensetting="openSettingHandler"
        v-if="fail === 'PERMISSION'"
      >开启定位</button>
      <!--  打开反馈页面 -->
      <button
        class="bus-around-router__btn"
        open-type="feedback"
        type="primary"
        size="mini"
        plain
        v-else-if="fail === 'EXCEPTION'"
      >报告错误</button>
      <!-- 请求失败 -->
      <bus-alert
        type="warn"
        msg="请求失败"
        button-text="重新获取"
        @click="getRouterNames"
        v-else-if="fail === 'API'"
      />
      <!-- 请求失败 -->
      <bus-alert
        type="warn"
        msg="定位失败"
        button-text="重新定位"
        @click="getLocation"
        v-else-if="fail === 'LOCATION'"
      />
      <!-- 无公交数据 -->
      <bus-alert msg="附近没有公交" v-else-if="fail === 'EMPTY'"/>
    </view>
    <bus-list :data="list" @item-click="itemClickHandler" v-else>
      <template slot="title">
        <view class="bus-around-router__hd">
          <text class="bus-around-router__text">附近公交：</text>
          <bus-icon name="bus-sync" extra-class="bus-around-router__icon" @click="refreshHandler"/>
        </view>
      </template>
    </bus-list>
  </view>
</template>

<script>
import debounce from '@/js/debounce'
import { getBusByLocation } from '@/apis/aroundRouter'

// 失败原因
const Fail = {
  NONE: '',
  API: 'API',
  EMPTY: 'EMPTY',
  LOCATION: 'LOCATION',
  EXCEPTION: 'EXCEPTION',
  PERMISSION: 'PERMISSION'
}

export default {
  name: 'BusAroundBus',
  created() {
    this.getPermission()
  },
  data() {
    return {
      list: null,
      loading: false,
      fail: Fail.NONE
    }
  },
  methods: {
    getPermission() {
      wx.authorize({
        scope: 'scope.userLocation',
        success: this.getLocation,
        fail: (error) => {
          this.fail = Fail.PERMISSION
          console.log(error)
        }
      })
    },
    // 定位
    getLocation() {
      this.loading = true
      wx.getLocation({
        success: (data) => {
          this.loading = false
          this.location = `${data.longitude},${data.latitude}`
          this.getRouterNames()
        },
        fail: (error) => {
          // 定位失败
          this.loading = false
          this.fail = Fail.LOCATION
          console.log(error)
        }
      })
    },
    // 查询附件公交
    getRouterNames() {
      if (!this.location) {
        this.fail = Fail.LOCATION
        return
      }
      this.loading = true
      getBusByLocation(this.location)
        // getBusByLocation('121.4737,31.23037')
        .then((data) => {
          this.list = data
          this.loading = false
          this.fail = data && data.length ? Fail.NONE : Fail.EMPTY
        })
        .catch((error) => {
          // 请求失败
          this.fail = Fail.API
          this.loading = false
          console.log(error)
        })
    },
    // hook `API` 升级
    openSettingHandler(res) {
      // 用户开启，重新定位
      try {
        if (res.mp.detail.authSetting['scope.userLocation']) {
          this.getLocation()
        } else {
          this.fail = Fail.PERMISSION
        }
      } catch (error) {
        this.errorHandler(error)
      }
    },
    // 开启失败，打开反馈面板
    errorHandler(error) {
      this.fail = Fail.EXCEPTION
      console.log(error)
    },
    // 刷新
    refreshHandler: debounce(
      function() {
        this.getRouterNames()
      },
      1000,
      {
        leading: true
      }
    ),
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
  @include e(fail) {
    text-align: center;
  }
  @include e(btn) {
    padding: 4px 12px;
    margin-top: 100px;
  }
  .bus-loading-component {
    margin-top: 100px;
  }
}
</style>
