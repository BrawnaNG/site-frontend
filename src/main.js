import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugin/Axios'
import './plugin/Bootsrtap'
import VueMoment from "vue-moment";
import VueTreeNavigation from 'vue-tree-navigation';
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
  theme: "toasted-primary",
  position: "bottom-right",
  iconPack: 'fontawesome'
});
Vue.use(VueTreeNavigation);
Vue.use(VueMoment);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
