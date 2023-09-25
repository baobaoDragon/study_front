import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import uView from '@/uni_modules/uview-ui'
import uView1 from '@/node_modules/uview-ui'
Vue.use(uView)
Vue.use(uView1)
Vue.config.productionTip = false
// Vue.prototype.$beforeImgUrl = "http://192.168.31.44:8888"
// Vue.prototype.$beforeImgUrl = 'http://192.168.3.165:8888';
Vue.prototype.$beforeImgUrl = "http://49.234.47.245:8888"
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif