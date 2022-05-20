//echarts
import * as echarts from 'echarts'
import Vue from 'vue'
import api from './api/index'
import App from './App.vue'
import './assets/css/iconfont.css'
import './assets/css/reset.css'
import i18n from './lang/index'
import './plugins/element.js'
import router from './router'
import './router/permission'
import store from './store'
import './utils/echartsResize'
import './utils/localStorage'
Vue.prototype.$api = api
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

console.log('process.env.NODE_ENV ', process.env.NODE_ENV)

new Vue({
	router,
	store,
	i18n,
	render: h => h(App),
}).$mount('#app')
