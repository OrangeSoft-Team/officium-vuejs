<template>
   <v-card>
        <v-card-title>
            <span  class="text-h5">Detalle de la oferta laboral</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
            >
                Cerrar
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { ControladorDetalleOfertaLaboral } from "../../../../ofertaLaboral/infraestructura/controlador/ControladorDetalleOfertaLaboral";
//Importamos la interface del DTO para que el objeto a mostrar en la tabla
//sea del mismo tipo que el que se trae en la respuesta del CU
import { OfertaLaboralEmpresaDTO } from "../../../../ofertaLaboral/aplicacion/dto/OfertaLaboralEmpresaDTO";

export default Vue.extend({
    data() {
        return {
            estaCargando: true,
            ofertaLaboral: {} as OfertaLaboralEmpresaDTO,
            dialog: false,
        };
    },

    mounted() {
        //Inicializamos el controlador
        const cuAEjecutar =
            ControladorDetalleOfertaLaboral.inicializar();

        //Ejecutamos el caso de uso

        /**
         * FALTA COLOCAR AQUÍ EL ID DE LA OFERTA LABORAL QUE RECIBIMOS
         * DEL COMPONENTE PADRE
         */

        const respuestaCU = cuAEjecutar.ejecutarCU({ idOfertaLaboral: "1" });
        respuestaCU
            .then((data) => {
                if (data.esExitoso) {
                    //Cambiamos el estado
                    this.estaCargando = false;
                    //console.log("[RESPUESTA] ", data.getValue());
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

});
</script>

<style></style>
