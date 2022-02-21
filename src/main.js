import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js';
import store from './store/store.js';
import "@/assets/commonCss/reset.less";
import './plugins/element.js';
import "./assets/font/iconfont.css"
//设置echarts全局
Vue.prototype.$Url="http://127.0.0.1:3000";
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
