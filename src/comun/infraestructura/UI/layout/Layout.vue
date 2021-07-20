<template>
    <div>
        <v-app-bar app clipped-left>
            <v-img
                :src="require('../assets/LogoNormal.png')"
                max-height="150"
                max-width="140"
            ></v-img>
            <v-divider vertical class="ml-2 mr-2"></v-divider>
            <v-toolbar-title
                class="primary--text font-weight-bold text-uppercase"
                >{{ this.$route.name }}</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="primary"
                        outlined
                        dark
                        v-bind="attrs"
                        v-on="on"
                    >
                        {{ nombreEmpresa }}
                        <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item :to="{ name: 'Perfil' }" link>
                        <v-list-item-icon>
                            <v-icon>mdi-account-box</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Editar perfil</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="cerrarSesion">
                        <v-list-item-icon>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Cerrar sesión</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <v-navigation-drawer
            app
            dark
            color="primary"
            clipped
            absolute
            permanent
            expand-on-hover
        >
            <v-list nav dense>
                <v-list-item-group>
                    <v-list-item
                        v-for="(opt, i) in opcionesMenu"
                        :key="i"
                        :to="{ name: opt.toDato }"
                        exact-path
                    >
                        <v-list-item-icon>
                            <v-icon>{{ opt.icono }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{ opt.opcion }}</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <router-view></router-view>
        </v-main>
    </div>
</template>

<script lang="ts">
import { ControladorObtenerDatos } from "@/sesion/infraestructura/controlador/ControladorObtenerDatos";
import { ControladorCerrarSesion } from "../../../../sesion/infraestructura/controlador/ControladorCerrarSesion";
import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            nombreEmpresa: "",
            opcionesMenu: [
                {
                    opcion: "Inicio",
                    icono: "mdi-view-dashboard",
                    toDato: "Inicio",
                },
                {
                    opcion: "Delegados",
                    icono: "mdi-account-multiple",
                    toDato: "InicioSesion",
                },
                {
                    opcion: "Ofertas laborales",
                    icono: "mdi-view-list",
                    toDato: "Ofertas laborales",
                },
                {
                    opcion: "Trabajos",
                    icono: "mdi-briefcase",
                    toDato: "InicioSesion",
                },
                {
                    opcion: "Pagos",
                    icono: "mdi-currency-usd",
                    toDato: "InicioSesion",
                },
            ],
        };
    },

    methods: {
        cargarDatos() {
            const controladorOrError = ControladorObtenerDatos.inicialiar();
            const usuarioOrError = controladorOrError.ejecutarServicio();

            if (usuarioOrError.esExitoso)
                this.nombreEmpresa = usuarioOrError.getValue().nombreEmpresa;
        },
        cerrarSesion() {
            const controladorOrError = ControladorCerrarSesion.inicialiar();
            const operacionOrError = controladorOrError.ejecutarServicio();
            operacionOrError
                .then((respuesta) => {
                    if (respuesta.esFallido) {
                        //TODO Manejar error
                        console.warn("Algo paso ", respuesta.error);
                    }

                    this.$router.replace({ name: "InicioSesion" });
                })
                .catch((e) => {
                    //TODO Manejar error
                    console.warn("Algo paso ", e);
                });
        },
    },

    mounted() {
        this.cargarDatos();
    },
});
</script>

<style></style>
