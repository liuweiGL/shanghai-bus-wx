import Vue from 'vue'
import App from './App'

// css
import './scss/index.scss'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      'pages/index/main', // 首页
      'pages/search/main', // 搜索页
      '^pages/routerDetail/main' // 路线详情页
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#2f54eb',
      navigationBarTitleText: '魔都公交',
      navigationBarTextStyle: '#fff'
    }
  }
}
