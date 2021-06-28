import Vue from "vue";
import App from "./comun/infraestructura/UI/App.vue";
import router from "./comun/infraestructura/UI/router/index";
import vuetify from "./comun/infraestructura/UI/plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
