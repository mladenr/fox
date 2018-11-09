import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

Vue.config.productionTip = false

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "vuetify/dist/vuetify.min.css";

import store from "./store";
import router from "./router";
import Vuetify from 'vuetify'
import Vuelidate from "vuelidate";

Vue.filter("currency", (value) =>  new Intl.NumberFormat("en-US",
      { style: "currency", currency: "USD" }).format(value));

Vue.use(Vuetify);
Vue.use(Vuelidate);

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
