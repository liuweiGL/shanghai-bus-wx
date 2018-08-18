<template>
  <scroll-view class="bus-collection"
               scroll-y>
    <view class="bus-collection__wrap">
      <view class="bus-collection__card"
            v-for="(router,key) in data"
            :key="key">
        <view class="bus-collection__item-title">
          <view class="bus-collection__name">{{ router.name }}</view>
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
                      :title="station.name" />
            <view class="bus-collection__delete">
              <bus-button type="text"
                          @click="deleteHandler(router.sid,index)">删除</bus-button>
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
import { isEmpty, clone } from '@/js/utils'
import { COLLECTION_LOCAL_KEY } from '@/js/constants'

const createData = function() {
  return {
    data: null,
    isEmpty: false,
    isRefresh: false
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
  // 下拉刷新
  onPullDownRefresh: debounce(
    function() {
      wx.showToast({ title: '111' })
      if (!this.isEmpty) {
        // 备份数据
        const _data = clone(this.data)
        // 重置数据
        this.$setData(createData())
        // 赋值，重新渲染 `stop` 组件
        this.$nextTick(() => {
          this.data = _data
          wx.stopPullDownRefresh()
        })
      } else {
        wx.stopPullDownRefresh()
      }
    },
    2000,
    {
      leading: true
    }
  ),
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
    deleteHandler(sid, index) {
      const { data } = this
      const stations = data[sid]['stations']
      wx.showModal({
        title: '确定删除？',
        content: `当前站台：${stations[index]['name']}`,
        confirmColor: '#2f54eb',
        success: (res) => {
          if (res.confirm) {
            stations.splice(index, 1)
            if (!stations.length) {
              delete data[sid]
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
    .bus-stop__empty {
      margin: 20px 0;
    }
  }
  @include e(title) {
    padding: 5px 0;
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
  @include e(delete) {
    padding: 0 10px 15px 0;
    text-align: center;
  }
}
</style>
