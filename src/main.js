import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io'
import moment from 'moment';
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Axios from 'axios';

Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// export const SocketInstance = socketio('http://localhost:3002', { transports : ['websocket'] });
Vue.use(new VueSocketIO({
      debug: true,
      connection: socketio('http://localhost:3001', {}), //options object is Optional
      vuex: {
        store,
      }
    })
);
// Vue.use(VueSocketIO, SocketInstance)

Vue.prototype.$http = Axios;
Vue.prototype.$moment = moment;

const token = localStorage.getItem('tokenvouch');
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = 'Bearer ' + token;
  Vue.prototype.$http.defaults.headers.common["Content-Type"] = 'application/json'
  Vue.prototype.$http.defaults.timeout = 15000
  Vue.prototype.$http.defaults.headers.common["Accept"] = 'application/json'
}


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
