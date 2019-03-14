import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Import Muse-ui
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";

// Import Muse-ui theme
import theme from "muse-ui/lib/theme";

// Use default dark theme
theme.use("dark");

Vue.use(MuseUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
