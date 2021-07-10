import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import VueResource from 'vue-resource'; 
import axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueResource)
Vue.prototype.$axios= axios

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
