<template>
    <v-dialog v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                depressed
                rounded
                color="primary"
                small
                v-bind="attrs"
                v-on="on"
                v-on:click="obtenerDetalle"
            >
                Detalle
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-card-title>
                <span class="text-h5">Detalle de la oferta laboral</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row v-show="estaCargando">
                        <v-progress-linear
                            indeterminate
                            color="primary"
                        ></v-progress-linear
                    ></v-row>
                    <v-row v-show="!estaCargando"> <p>Contenido</p> </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                    Cerrar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { ControladorDetalleOfertaLaboral } from "../../../../ofertaLaboral/infraestructura/controlador/ControladorDetalleOfertaLaboral";
//Importamos la interface del DTO para que el objeto a mostrar en la tabla
//sea del mismo tipo que el que se trae en la respuesta del CU
import { OfertaLaboralEmpresaDTO } from "../../../../ofertaLaboral/aplicacion/dto/OfertaLaboralEmpresaDTO";

export default Vue.extend({
    props: ["idOferta"],
    data() {
        return {
            estaCargando: true,
            ofertaLaboral: {} as OfertaLaboralEmpresaDTO,
            dialog: false,
        };
    },

    methods: {
        obtenerDetalle() {
            //Inicializamos el controlador
            const cuAEjecutar = ControladorDetalleOfertaLaboral.inicializar();

            //Ejecutamos el caso de uso

            /**
             * FALTA COLOCAR AQUÍ EL ID DE LA OFERTA LABORAL QUE RECIBIMOS
             * DEL COMPONENTE PADRE
             */

            const respuestaCU = cuAEjecutar.ejecutarCU({
                idOfertaLaboral: "1",
            });
            respuestaCU
                .then((data) => {
                    if (data.esExitoso) {
                        //Cambiamos el estado

                        this.estaCargando = false;

                        //this.estaCargando = false;
                        //console.log("[DETALLE] ", data.getValue());
                        //Actualizamos
                        this.ofertaLaboral = data.getValue();
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

    mounted() {
        //console.log("MONTANDO", this.idOferta);
    },
});
</script>

<style></style>
