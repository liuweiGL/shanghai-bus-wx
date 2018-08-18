import Vue from 'vue'
import App from './App'

// css
import './scss/index.scss'

// component
import BusIcon from './components/icon'
import BusList from './components/list'
import BusAlert from './components/alert'
import BusButton from './components/button'
import BusLoading from './components/loading'

Vue.component('bus-icon', BusIcon)
Vue.component('bus-list', BusList)
Vue.component('bus-alert', BusAlert)
Vue.component('bus-button', BusButton)
Vue.component('bus-loading', BusLoading)

Vue.config.productionTip = false
App.mpType = 'app'

/**
 *  因为页面离开不会触发 `beforeDestroy` 事件，所以需要每次在 `onLoad` 事件中重新声明 `data` 数据
 *  为了方便给 `Vue` 原型添加一个重置 `data` 数据的方法。
 */
Vue.prototype.$setData = function(data) {
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      this[key] = data[key]
    }
  }
}

const app = new Vue(App)
app.$mount()
