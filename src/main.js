import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import api from './services/api';
import VueAxios from 'vue-axios';
import VueTreeNavigation from 'vue-tree-navigation';
import Vue3Toastify from 'vue3-toastify';
import moment from "moment";
import setupInterceptors from './services/setupinterceptors';
import PrimeVue from 'primevue/config';
import { TreeTable, Column } from 'primevue';
import Aura from '@primevue/themes/aura';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

setupInterceptors(store);

var app = createApp(App)
  .use(Vue3Toastify, {
    autoClose: 3000,
    position: "bottom-right"
  })
  .use(VueTreeNavigation)
  .use(router)
  .use(store)
  .use(VueAxios, api)
  .use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })
  .component('TreeTable', TreeTable)
  .component('Column', Column)
  .provide("moment", moment);

app.config.productionTip = false;
app.mount('#app');