import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)

import ECharts from 'vue-echarts'
import "echarts";
Vue.component('v-chart', ECharts)
import 'echarts-gl';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
