<template>
    <v-container fluid class="grey lighten-5">
        <v-alert
            id="alerta-exito"
            v-model="alertaExito"
            border="left"
            close-text="Cerrar"
            type="success"
            dismissible
        >
            {{ mensajeExito }}
        </v-alert>

        <v-row align="center" no-gutters style="height: 50px"> </v-row>

        <v-row align="center" no-gutters style="height: 150px">
            <v-col cols="12" sm="1" md="1" lg="1" xl="1"> </v-col>
            <v-col cols="12" sm="10" md="10" lg="10" xl="10">
                <v-card>
                    <v-card-title>
                        <v-row justify="space-between" class="pa-2">
                            <h3 class="">Trabajos</h3>
                        </v-row>
                    </v-card-title>
                    <v-data-table
                        :headers="headersTable"
                        :items="trabajos"
                        :items-per-page="10"
                        class="elevation-1"
                        :loading="estaCargando"
                        loading-text="Consultando datos..."
                        locale="es"
                    >
                        <template v-slot:item="row">
                            <tr>
                                <td>{{ row.item.titulo }}</td>
                                <td>{{ row.item.fechaInicioTrabajo }}</td>
                                <td>
                                    {{ row.item.primerNombreEmpleado }}
                                    {{ row.item.segundoNombreEmpleado }}
                                </td>
                                <td>
                                    {{ row.item.primerApellidoEmpleado }}
                                    {{ row.item.segundoApellidoEmpleado }}
                                </td>
                                <td>{{ row.item.cargo }}</td>
                                <td>{{ row.item.estatus }}</td>
                                <td>
                                    <!--Llamamos al componente del detalle del trabajo-->
                                    <modal-trabajo-detalle
                                        :id-trabajo="row.item.uuid"
                                    ></modal-trabajo-detalle>
                                    <v-btn
                                        depressed
                                        rounded
                                        color="primary"
                                        small
                                        outlined
                                        class="ml-1"
                                        @click="
                                            ejecutarCUCulminar(row.item.uuid)
                                        "
                                        >Culminar
                                        <v-icon>mdi-check-all</v-icon></v-btn
                                    >
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
            <v-col cols="12" sm="1" md="1" lg="1" xl="1"> </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { ControladorObtenerTrabajos } from "../../../../trabajo/infraestructura/controlador/ControladorObtTrabajos";
//Importamos la interface del DTO para que el objeto a mostrar en la tabla
//sea del mismo tipo que el que se trae en la respuesta del CU
import { TrabajoEmpresaDTO } from "../../../../trabajo/aplicacion/dto/TrabajoEmpresaDTO";

import ModalTrabajoDetalle from "../components/ModalTrabajoDetalle.vue";
import { ControladorCulminarTrabajo } from "@/trabajo/infraestructura/controlador/ControladorCulminarTrabajo";

export default Vue.extend({
    components: {
        ModalTrabajoDetalle,
    },
    data() {
        return {
            estaCargando: true,
            trabajos: [] as TrabajoEmpresaDTO[],
            headersTable: [
                { text: "Titulo", value: "titulo" },
                { text: "Fecha de inicio", value: "fechaInicioTrabajo" },
                { text: "Nombres", value: "primerNombreEmpleado" },
                { text: "Apellidos", value: "primerApellidoEmpleado" },
                { text: "Cargo", value: "cargo" },
                { text: "Estatus", value: "estatus" },
                { text: "Acciones", value: "acciones" },
            ],

            //Para el manejo del mensaje de éxito
            mensajeExito: "",
            alertaExito: false,
        };
    },

    mounted() {
        this.ejecutarCU();
    },
    methods: {
        alertExito(mensaje: string) {
            this.alertaExito = true;
            this.mensajeExito = mensaje;

            this.recargarTabla();
        },
        ejecutarCU() {
            //Inicializamos el controlador
            const cuAEjecutar = ControladorObtenerTrabajos.inicializar();

            //Ejecutamos el caso de uso
            const respuestaCU = cuAEjecutar.ejecutarCU();
            respuestaCU
                .then((data) => {
                    if (data.esExitoso) {
                        //Cambiamos el estado
                        this.estaCargando = false;
                        //Actualizamos
                        this.trabajos = data.getValue();
                        console.log("Recibimos", data.getValue());
                    } else {
                        //TODO Manejo de caso con error al recuperar conjunto
                        console.warn("Algo pasó", data.error);
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
        },
        recargarTabla() {
            this.trabajos = [];
            this.estaCargando = true;
            this.ejecutarCU();
        },
        ejecutarCUCulminar(id: string) {
            //Inicializamos el controlador
            const cuAEjecutar = ControladorCulminarTrabajo.inicializar();

            //Ejecutamos el caso de uso
            const respuestaCU = cuAEjecutar.ejecutarCU({ uuid_trabajo: id });
            respuestaCU
                .then((data) => {
                    console.log("[CULMINADO] Trabajo: ", id);
                    if (data.esExitoso) {
                        this.alertExito("¡Trabajo culminado exitosamente!");

                        this.recargarTabla();
                    } else {
                        //TODO Manejo de caso con error al recuperar conjunto
                        console.warn("Algo pasó", data.error);
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
        },
    },
});
</script>

<style></style>
