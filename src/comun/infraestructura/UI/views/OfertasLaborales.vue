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
                            <h3 class="">Ofertas Activas</h3>
                            <!--Llamamos al componente de crear
                                oferta laboral-->
                            <modal-crear-oferta
                                :alertaExito="alertaExito"
                                v-on:alertexito="alertExito"
                            ></modal-crear-oferta>
                        </v-row>
                    </v-card-title>
                    <v-data-table
                        :headers="headersTable"
                        :items="ofertasLaborales"
                        :items-per-page="10"
                        :search="aBuscar"
                        class="elevation-1"
                        :loading="estaCargando"
                        loading-text="Consultando datos..."
                        locale="es"
                    >
                        <template v-slot:top>
                            <v-container>
                                <v-text-field
                                    v-model="aBuscar"
                                    append-icon="mdi-magnify"
                                    label="Buscar titulo o cargo"
                                    single-line
                                    hide-details
                                ></v-text-field>
                            </v-container>
                        </template>

                        <template v-slot:item="row">
                            <tr>
                                <td>{{ row.item.titulo }}</td>
                                <td>{{ row.item.cargo }}</td>
                                <td>{{ row.item.fechaPublicacion }}</td>
                                <td>{{ row.item.numeroVacantes }}</td>
                                <td>{{ row.item.estado }}</td>
                                <td >
                                    <!--Llamamos al componente del detalle de oferta laboral-->
                                    <modal-oferta-detalle
                                        :uuid="row.item.uuid"
                                    ></modal-oferta-detalle>
                                    <!--Llamamos al componente de modificar oferta laboral-->
                                    <modal-modificar-oferta
                                        :uuid="row.item.uuid"
                                        :alertaExito="alertaExito"
                                        v-on:alertexito="alertExito"
                                    ></modal-modificar-oferta>

                                    <!--Llamamos al componente de duplicar oferta laboral-->
                                    <modal-duplicar-oferta
                                        :uuid="row.item.uuid"
                                        :alertaExito="alertaExito"
                                        v-on:alertexito="alertExito"
                                    ></modal-duplicar-oferta>


                                    <!-- CANCELAR OFERTA -->
                                    <v-btn
                                        depressed
                                        rounded
                                        title="Cancelar oferta"
                                        color="red"
                                        small
                                        outlined
                                        icon
                                        class="ml-1"
                                        @click="
                                            ejecutarCUCancelar(row.item.uuid)
                                        "
                                    >
                                        <v-icon>mdi-close-circle</v-icon></v-btn
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
import { ControladorObtenerOfertasLaboralesActivas } from "../../../../ofertaLaboral/infraestructura/controlador/ControladorObtOfertasLaborales";
//Importamos la interface del DTO para que el objeto a mostrar en la tabla
//sea del mismo tipo que el que se trae en la respuesta del CU
import { OfertaLaboralEmpresaDTO } from "../../../../ofertaLaboral/aplicacion/dto/OfertaLaboralEmpresaDTO";
import { ControladorCancelarOfertaLaboral } from "../../../../ofertaLaboral/infraestructura/controlador/ControladorCancelarOfertaLaboral";
import ModalOfertaDetalle from "../components/ModalOfertaDetalle.vue";
import ModalCrearOferta from "../components/ModalCrearOferta.vue";
import ModalModificarOferta from "../components/ModalModificarOferta.vue";
import ModalDuplicarOferta from "../components/ModalDuplicarOferta.vue";

export default Vue.extend({
    components: {
        ModalOfertaDetalle,
        ModalCrearOferta,
        ModalModificarOferta,
        ModalDuplicarOferta

    },
    data() {
        return {
            estaCargando: true,
            ofertasLaborales: [] as OfertaLaboralEmpresaDTO[],
            aBuscar: "",
            headersTable: [
                { text: "Titulo", value: "titulo" },
                { text: "Cargo", value: "cargo" },
                {
                    text: "Fecha publicacion",
                    value: "fechaPublicacion",
                    filterable: false,
                },
                {
                    text: "Número de vacantes",
                    value: "numeroVacantes",
                    filterable: false,
                },
                { text: "Estatus", value: "estado", filterable: false },
                { text: "Acciones", value: "acciones", filterable: false },
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
            const cuAEjecutar =
                ControladorObtenerOfertasLaboralesActivas.inicializar();

            //Ejecutamos el caso de uso
            const respuestaCU = cuAEjecutar.ejecutarCU();
            respuestaCU
                .then((data) => {
                    if (data.esExitoso) {
                        //Cambiamos el estado
                        this.estaCargando = false;
                        //Actualizamos
                        this.ofertasLaborales = data.getValue();
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
            this.ofertasLaborales = [];
            this.estaCargando = false;
            this.ejecutarCU();
        },
        ejecutarCUCancelar(id: string) {
            //Inicializamos el controlador
            const cuAEjecutar = ControladorCancelarOfertaLaboral.inicializar();

            //Ejecutamos el caso de uso
            const respuestaCU = cuAEjecutar.ejecutarCU({ idOfertaLaboral: id });
            respuestaCU
                .then((data) => {
                    console.log("[CANCELADO] Oferta Laboral: ", id);
                    if (data.esExitoso) {
                        this.alertExito(
                            "Oferta laboral cancelado exitosamente!"
                        );

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
