<template>
    <v-container fluid class="grey lighten-5">
        <v-row align="center" no-gutters style="height: 50px"> </v-row>

        <v-row align="center" no-gutters style="height: 150px">
            <v-col cols="12" sm="1" md="1" lg="1" xl="1"> </v-col>
            <v-col cols="12" sm="10" md="10" lg="10" xl="10">
                <v-card>
                    <v-card-title>
                        <v-row justify="space-between" class="pa-2">
                            <h3 class="">Ofertas Activas</h3>
                            <v-btn depressed color="primary">
                                Agregar nueva oferta
                            </v-btn>
                        </v-row>
                    </v-card-title>
                    <v-data-table
                        :headers="headersTable"
                        :items="ofertasLaborales"
                        :items-per-page="10"
                        class="elevation-1"
                        :loading="estaCargando"
                        loading-text="Consultando datos..."
                        locale="es"
                    >
                        <template v-slot:item="row">
                            <tr>
                                <td>{{ row.item.titulo }}</td>
                                <td>{{ row.item.cargo }}</td>
                                <td>{{ row.item.fechaPublicacion }}</td>
                                <td>{{ row.item.numeroVacantes }}</td>
                                <td>{{ row.item.turnoTrabajo }}</td>
                                <td>
                                    <!--Llamamos al componente del detalle de
                                    oferta laboral-->
                                    <modal-oferta-detalle
                                        :id-oferta="row.item.idOfertaLaboral"
                                    ></modal-oferta-detalle>
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

import ModalOfertaDetalle from "../components/ModalOfertaDetalle.vue";

export default Vue.extend({
    components: {
        ModalOfertaDetalle,
    },
    data() {
        return {
            estaCargando: true,
            ofertasLaborales: [] as OfertaLaboralEmpresaDTO[],
            headersTable: [
                { text: "Titulo", value: "titulo" },
                { text: "Cargo", value: "cargo" },
                { text: "Fecha publicacion", value: "fechaPublicacion" },
                { text: "Número de vacantes", value: "numeroVacantes" },
                { text: "Turno de trabajo", value: "turnoTrabajo" },
                { text: "Acciones", value: "acciones" },
            ],
        };
    },

    mounted() {
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
