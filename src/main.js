import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.use(require('vue-moment'));

Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://localhost:8080/ping-pong';
new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
