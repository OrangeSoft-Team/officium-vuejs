import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { component } from "vue/types/umd";
import InicioSesion from "../views/InicioSesion.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "InicioSesion",
        component: InicioSesion,
    },
    {
        path: "/dashboard",
        name: "Dashboard",

        component: () => import("../layout/Layout.vue"),
        children: [
            //ESPECIFICAR VISTAS INTERNAS DE LA APP
            {
                path: "/inicio",
                name: "Inicio",
                component: () => import("../views/Inicio.vue"),
            },
            {
                path: "/ofertas-laborales",
                name: "Ofertas laborales",
                component: () => import("../views/OfertasLaborales.vue"),
            },
        ],
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
