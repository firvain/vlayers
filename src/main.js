import "babel-polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/vuelayers";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
