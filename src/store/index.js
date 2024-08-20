import Vue from "vue";
import Vuex from "vuex";
import popups from "@/store/modules/popups";
import metamaskProvider from "@/store/modules/metamaskProvider";
import networks from "@/store/modules/networks";
import home from "@/store/modules/home";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {

  },
  actions: {},
  getters: {
  },
  modules: {
    popups,
    metamaskProvider,
    networks,
    home,

  },
});
