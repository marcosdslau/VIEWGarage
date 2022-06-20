import Vue from 'vue'
import http from 'axios'

http.defaults.baseURL = 'http://localhost:8000/'
// http.defaults.baseURL = 'http://10.0.2.191:8000/'

Vue.prototype.$http = http

export default http
