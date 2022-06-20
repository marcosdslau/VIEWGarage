import Vue from 'vue'
import Vuex from 'vuex'

import alerts from './modules/alerts'
import user from './modules/user'
import dashboard from './modules/dashboard'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    alerts,
    user,
    dashboard
  }
})
