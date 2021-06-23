import Vue from "vue";
import App from "./comun/infraestructura/App.vue";
import router from "@/comun/infraestructura/router/index";
import vuetify from "./comun/infraestructura/plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
