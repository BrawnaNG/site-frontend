import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import axios from 'axios';
import VueAxios from 'vue-axios';
import VueTreeNavigation from 'vue-tree-navigation';
import Vue3Toastify from 'vue3-toastify';
import moment from "moment";

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

var app = createApp(App)
  .use(Vue3Toastify, {
    autoClose: 3000,
    position: "bottom-right"
  })
  .use(VueTreeNavigation)
  .use(router)
  .use(store)
  .use(VueAxios, axios)
  .use(BootstrapVue)
  .provide("moment", moment);

app.axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";
let token = localStorage.getItem('csrf-token')
if (token) {
  app.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

app.config.productionTip = false;
app.mount('#app');