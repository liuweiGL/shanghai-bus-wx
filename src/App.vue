<script>
/**
 * TODO: 下个版本发布的时候，删除该代码。
 */
import Store from '@/js/store'
import { COLLECTION_LOCAL_KEY } from '@/js/constants'
export default {
  name: 'BusApp',
  created() {
    this.checkUpdate()
  },
  methods: {
    checkUpdate() {
      const key = 'UPDATE_FLAG'
      Store.get(key).then((flag) => {
        if (!flag) {
          const updateManager = wx.getUpdateManager()
          updateManager.onUpdateReady(function() {
            wx.showModal({
              title: '更新提示',
              content: '新版本修复了详情页收藏bug，已收藏的站台将被清空。',
              showCancel: false,
              confirmColor: '#2f54eb',
              success: function(res) {
                if (res.confirm) {
                  Store.set('UPDATE_FLAG', true).then(() => {
                    Store.remove(COLLECTION_LOCAL_KEY).then(() => {
                      updateManager.applyUpdate()
                    })
                  })
                }
              }
            })
          })
        }
      })
    }
  }
}
</script>
