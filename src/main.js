import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.config.productionTip = false;

var axios = require("axios");
Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8443/api";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
