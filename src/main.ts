import Vue from "vue";
import App from "./comun/infraestructura/UI/App.vue";
import router from "./comun/infraestructura/UI/router/index";
import vuetify from "./comun/infraestructura/UI/plugins/vuetify";
import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyAlpmRnWovaKQHDx57oW62H5veuv-xCbvk",
    authDomain: "autentificacion-officium.firebaseapp.com",
    projectId: "autentificacion-officium",
    appId: "1:636839173634:web:9cd204bab1fd95db65511b",
};
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
