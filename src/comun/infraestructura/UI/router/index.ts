import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import InicioSesion from "../views/InicioSesion.vue";
import { ControladorObtenerDatos } from "../../../../sesion/infraestructura/controlador/ControladorObtenerDatos";

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
            {
                path: "/perfil",
                name: "Perfil",
                component: () => import("../views/Perfil.vue"),
            },
        ],
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

//Validar autentificacion

router.beforeEach((to, from, next) => {
    const controladorOrError = ControladorObtenerDatos.inicialiar();
    const usuarioOrError = controladorOrError.ejecutarServicio();

    if (to.path != "/") {
        //Cualquier direccion diferente a login

        if (usuarioOrError.esExitoso) next();

        if (usuarioOrError.esFallido) next("/");
    } else {
        //Si tiene usuario y va login >> Inicio
        if (usuarioOrError.esExitoso) next({ name: "Inicio" });
    }
    next();
});

export default router;
