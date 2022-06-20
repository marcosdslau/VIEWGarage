import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './plugins'
import filter from './filters'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VMask from 'v-mask'

Vue.use(VMask)

Vue.config.productionTip = false
Vue.filter('cnpj', filter.cnpj);
Vue.filter('cpf', filter.cpf);
Vue.filter('board', filter.board);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
