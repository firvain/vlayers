import "babel-polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/vuelayers";
import "./plugins/vuex-i18n";
import "./plugins/vue2-filters.js";
import AxiosPlugin from "./plugins/axios.js";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";

Vue.config.productionTip = false;
Vue.use(AxiosPlugin, "$axios");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
