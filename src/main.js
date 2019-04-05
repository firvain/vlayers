import "babel-polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/vuelayers";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
// load vuex i18n module
import vuexI18n from "vuex-i18n";
Vue.use(vuexI18n.plugin, store, {
  moduleName: "i18n",
  onTranslationNotFound(locale, key) {
    console.warn(`i18n :: Key '${key}' not found for locale '${locale}'`);
  }
});
import translationsEn from "./i18n/en.js";
import translationsGr from "./i18n/gr.js";
import translationsMk from "./i18n/mk.js";
// add translations
Vue.i18n.add("en", translationsEn);
Vue.i18n.add("gr", translationsGr);
Vue.i18n.add("mk", translationsMk);

// default locale is english
Vue.i18n.set("mk");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
