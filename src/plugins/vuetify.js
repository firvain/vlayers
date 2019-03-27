import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  theme: {
    primary: "#ff5722",
    secondary: "#795548",
    accent: "#607d8b",
    error: "#f44336",
    warning: "#673ab7",
    info: "#3f51b5",
    success: "#4caf50"
  },
  iconfont: "mdi"
});
