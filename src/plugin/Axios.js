import Vue from 'vue'
import axios from 'axios'
//
Vue.prototype.$axios = axios

Vue.prototype.$axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/"


let token = localStorage.getItem('csrf-token')

if (token) {
    Vue.prototype.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}