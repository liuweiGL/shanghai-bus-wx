<template>
  <scroll-view class="bus-collection"
               scroll-y>
    <view class="bus-collection__wrap">
      <view class="bus-collection__card"
            v-for="(router,key) in data"
            :key="key">
        <view class="bus-collection__item-hd">
          <view class="bus-collection__primary-info">
            <view class="bus-collection__name">{{ router.name }}</view>
            <bus-icon name="bus-sync"
                      extra-class="bus-collection__refresh"
                      @click="refreshHandler(router.name)" />
          </view>
          <view class="bus-collection__extra-info">
            <view class="bus-collection__time">首班车：{{ router.startTime }}</view>
            <view class="bus-collection__time">末班车：{{ router.endTime }}</view>
            <view class="bus-collection__price">票价：￥{{ router.price }}</view>
          </view>
        </view>
        <scroll-view class="bus-collection__list"
                     scroll-x>
          <view class="bus-collection__item"
                v-for="(station,index) in router.stations"
                :key="station">
            <bus-stop :station="getParams(router,station)"
                      :scope="{title:station.name}"
                      :ref="router.sid">
              <template slot="scope">
                <view class="bus-collection__stop-title">{{ scope.title }}</view>
              </template>
            </bus-stop>
            <view class="bus-collection__delete">
              <bus-button type="text"
                          @click="deleteHandler(router.name,index)">删除</bus-button>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <bus-alert v-if="isEmpty"
               msg="还没有收藏公交哦" />
  </scroll-view>
</template>
<script>
import Store from '@/js/store'
import BusStop from '../routerDetail/stop'
import debounce from '@/js/debounce'
import { isEmpty } from '@/js/utils'
import { COLLECTION_LOCAL_KEY } from '@/js/constants'

const createData = function() {
  return {
    data: null,
    scope: {},
    isEmpty: false,
    currentSid: null
  }
}
export default {
  name: 'BusCollection',
  components: {
    BusStop
  },
  onShow() {
    // 获取收藏的站台数据
    this.getData()
  },
  onHide() {
    // 重置数据
    this.$setData(createData())
  },
  data() {
    return createData()
  },
  methods: {
    getData() {
      /**
       * 站台数据
       * {
       *   sid: {
       *     name: 公交名称,
       *     direction: 行驶方向,
       *     stations: 收藏的站台列表
       *   }
       * }
       */
      Store.get(COLLECTION_LOCAL_KEY).then((data) => {
        this.data = data
        this.isEmpty = isEmpty(data)
      })
    },
    // 查询到站信息的参数
    getParams(router, station) {
      return {
        sid: router.sid,
        direction: router.direction,
        stationIndex: station.index + 1
      }
    },
    // 刷新路线
    refreshHandler: debounce(
      function(name) {
        try {
          this.$refs[name].forEach((item) => item.refresh())
        } catch (e) {
          wx.showToast({
            icon: 'none',
            duration: 1000,
            title: '刷新失败'
          })
          console.log(e)
        }
      },
      500,
      {
        leading: true
      }
    ),
    // 删除站台
    deleteHandler(name, index) {
      const { data } = this
      const stations = data[name]['stations']
      wx.showModal({
        title: '确定删除？',
        content: `当前站台：${stations[index]['name']}`,
        confirmColor: '#2f54eb',
        success: (res) => {
          if (res.confirm) {
            stations.splice(index, 1)
            if (!stations.length) {
              delete data[name]
              this.isEmpty = isEmpty(data)
            }
            Store.set(COLLECTION_LOCAL_KEY, this.data)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
@include b(collection) {
  height: 100%;
  @include e(wrap) {
    padding: 10px;
  }
  @include e(card) {
    background: $--color-background;
    @include extend-rule(list-item);
    & + & {
      margin-top: 10px;
    }
  }
  @include e(list) {
    white-space: nowrap;
  }
  @include e(item) {
    display: inline-flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
    margin: 10px 10px 0;
    padding: 0;
    height: 130px;
    width: calc(50% - 20px);
    border-radius: 4px;
    vertical-align: middle;
    box-sizing: border-box;
    background: $--color-white;
    @include extend-rule(list-item);
  }
  @include e(hd) {
    padding: 5px 0;
  }
  @include e(primary-info) {
    @include extend-rule(between-row);
  }
  @include e(refresh) {
    padding: 10px;
  }
  @include e(name) {
    font-weight: bold;
    color: $--color-title;
    font-size: $--font-size-h4;
  }
  @include e(extra-info) {
    color: $--color-text-light;
    @include extend-rule(row);
  }
  @include e(time) {
    flex: 1;
    font-size: $--font-size-desc;
  }
  @include e(price) {
    flex: 1;
    font-size: $--font-size-desc;
  }
  @include e(stop-title) {
    margin-top: 5px;
    color: $--color-title;
  }
  @include e(delete) {
    padding: 0 10px 5px 0;
    text-align: center;
  }
}
</style>
