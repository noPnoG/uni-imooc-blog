import Vue from 'vue'
import App from './App'
import './style/global.scss'
import * as filters from './filters'


Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
})


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()