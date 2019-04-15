import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import map from "./modules/map";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    app,
    map
  },
  strict: debug
});
