<template>
    <v-container fluid>
        <v-progress-circular
            v-show="estaCargando"
            indeterminate
            color="primary"
        ></v-progress-circular>

        <div>
            <ul>
                <li v-for="(oferta, i) in ofertasLaborales" :key="i">
                    {{ oferta.titulo }}
                </li>
            </ul>
        </div>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { ControladorObtenerOfertasLaboralesActivas } from "../../../../ofertaLaboral/infraestructura/controlador/ControladorObtOfertasLaborales";

export default Vue.extend({
    data() {
        return {
            estaCargando: true,
            ofertasLaborales: {},
        };
    },

    mounted() {
        //Inicializamos el controlador
        const cuAEjecutar =
            ControladorObtenerOfertasLaboralesActivas.inicializar();

        //Ejecutamos el caso de uso
        const respuestaCU = cuAEjecutar.ejecutarCU({ idEmpresa: "" });
        respuestaCU
            .then((data) => {
                if (data.esExitoso) {
                    //Cambiamos el estado
                    this.estaCargando = false;
                    //console.log("[RESPUESTA] ", data.getValue());
                    //Actualizamos
                    this.ofertasLaborales = data.getValue();
                } else {
                    //TODO Manejo de caso con error al recuperar conjunto
                    console.warn("Algo pasó", data.error);
                }
            })
            .catch((e) => {
                console.error(e);
            });
    },
});
</script>

<style></style>
