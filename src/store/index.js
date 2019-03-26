import Vue from "vue";
import Vuex from "vuex";
import OpenLMAP from "./modules/OpenLMAP";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    OpenLMAP
  },
  strict: debug
});
