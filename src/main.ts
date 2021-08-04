import Vue from "vue";
import App from "./comun/infraestructura/UI/App.vue";
import router from "./comun/infraestructura/UI/router/index";
import vuetify from "./comun/infraestructura/UI/plugins/vuetify";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";
import { CLAVE_COOKIE } from "./comun/infraestructura/persistencia/ClavesLocalStorage";

var firebaseConfig = {
    apiKey: "AIzaSyAlpmRnWovaKQHDx57oW62H5veuv-xCbvk",
    authDomain: "autentificacion-officium.firebaseapp.com",
    projectId: "autentificacion-officium",
    appId: "1:636839173634:web:9cd204bab1fd95db65511b",
};
firebase.initializeApp(firebaseConfig);

export const NEST_URL_BASE = "https://officium-nest.herokuapp.com/api/";
//export const NEST_URL_BASE = "http://officium-nest.ddns.net:2000/api/";

Vue.config.productionTip = false;

axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        if (window.localStorage.getItem(CLAVE_COOKIE) != null) {
            /* console.warn(
                "COOKIE EN LOCAL ",
                window.localStorage.getItem(CLAVE_COOKIE)
            );*/
            config.headers.Authorization = window.localStorage
                .getItem(CLAVE_COOKIE)!
                .replaceAll('"', "");
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

new Vue({
    router,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
