import Vue from "vue";
import { ethers } from "ethers";
import Vuelidate from "vuelidate";
import VTooltip from "v-tooltip";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import onlyNumber from './utils/onlyNumber'

Vue.use(onlyNumber)
Vue.use(Vuelidate);
Vue.use(VTooltip);

Vue.prototype.$ethers = ethers;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
