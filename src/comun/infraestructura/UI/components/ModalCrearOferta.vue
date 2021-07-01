<template>
    <v-dialog v-model="dialog" id="modal-crear">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                depressed
                color="primary"
                v-bind="attrs"
                v-on="on"
                id="btn-crear"
            >
                Crear
            </v-btn>
        </template>

        <v-card>
            <v-form ref="formulario" v-model="formValido" lazy-validation>
                <v-card-title>
                    <v-row justify="space-between" class="pa-1">
                        <span class="text-h5">Crear nueva oferta laboral</span>
                        <v-btn icon @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn></v-row
                    >
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container>
                        <v-text-field
                            v-model="ofertaLaboralCrear.titulo"
                            :counter="100"
                            :rules="[(v) => !!v || 'Este campo es obligatorio']"
                            label="Ingrese el título de la oferta laboral"
                            id="inpt-titulo"
                        ></v-text-field>

                        <v-row>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-text-field
                                    v-model="ofertaLaboralCrear.cargo"
                                    :counter="50"
                                    :rules="[
                                        (v) =>
                                            !!v || 'Este campo es obligatorio',
                                    ]"
                                    label="Ingrese el cargo de la oferta laboral"
                                    required
                                    id="inpt-cargo"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-select
                                    v-model="ofertaLaboralCrear.turnoTrabajo"
                                    :items="opcionesTurnoTrabajo"
                                    :rules="[
                                        (v) =>
                                            !!v || 'Este campo es obligatorio',
                                    ]"
                                    label="Turno de trabajo"
                                    required
                                    id="inpt-turno"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-text-field
                                    v-model.number="
                                        ofertaLaboralCrear.numeroVacantes
                                    "
                                    :counter="3"
                                    type="number"
                                    :rules="[
                                        (v) =>
                                            !!v || 'Este campo es obligatorio',
                                    ]"
                                    label="Ingrese el número de vacantes"
                                    required
                                    id="inpt-vacantes"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-text-field
                                    v-model.number="ofertaLaboralCrear.sueldo"
                                    :counter="10"
                                    type="number"
                                    :rules="[
                                        (v) =>
                                            !!v || 'Este campo es obligatorio',
                                    ]"
                                    label="Ingrese el sueldo de la oferta laboral"
                                    required
                                    id="inpt-sueldo"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <strong>Duración</strong>
                        </v-row>
                        <v-row>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-text-field
                                    v-model.number="
                                        ofertaLaboralCrear.duracionEstimadaValor
                                    "
                                    :counter="10"
                                    type="number"
                                    :rules="[
                                        (v) =>
                                            !!v || 'Este campo es obligatorio',
                                    ]"
                                    label="Duración"
                                    required
                                    id="inpt-duracion"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-select
                                    v-model="
                                        ofertaLaboralCrear.duracionEstimadaEscala
                                    "
                                    :items="opcionesEscalaDuracion"
                                    :rules="[
                                        (v) =>
                                            !!v || 'Este campo es obligatorio',
                                    ]"
                                    label="Escala"
                                    required
                                    id="inpt-escala"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-textarea
                            v-model="ofertaLaboralCrear.descripcion"
                            label="Ingrese la descripción de la oferta laboral"
                            hint="La descripción debería tener entre 32 y 512 caracteres"
                            :rules="[(v) => !!v || 'Este campo es obligatorio']"
                            id="inpt-descripcion"
                        ></v-textarea>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary darken-1"
                        @click="dialog = false"
                        text
                    >
                        Cerrar
                    </v-btn>
                    <v-btn
                        color="primary"
                        v-on:click="crear"
                        id="btn-submit-crear"
                    >
                        Crear oferta laboral
                    </v-btn>
                </v-card-actions>

                <alerta-error
                    :mensaje="mensajeError"
                    :snackbar="snackbar"
                    v-on:alertfin="alertaFin"
                ></alerta-error>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { ControladorCrearOfertaLaboral } from "../../../../ofertaLaboral/infraestructura/controlador/ControladorCrearOfertaLaboral";
//Importamos la interface del DTO para que el objeto a mostrar en la tabla
//sea del mismo tipo que el que se trae en la respuesta del CU

//import { CrearOfertaLaboralDTO } from "../../../../ofertaLaboral/aplicacion/dto/CrearOfertaLaboralDTO";
import { SolicitudCreacionOfertaLaboralDTO } from "../../../../ofertaLaboral/aplicacion/casoDeUso/CrearOfertaLaboral.cu";

import AlertaError from "../components/AlertaError.vue";
import AlertaExito from "../components/AlertaExito.vue";

export default Vue.extend({
    components: {
        AlertaError,
        AlertaExito,
    },
    data() {
        return {
            estaCargando: true,
            ofertaLaboralCrear: {
                titulo: "",
                cargo: "",
                sueldo: 0,
                duracionEstimadaValor: 0,
                duracionEstimadaEscala: "",
                turnoTrabajo: "",
                numeroVacantes: 0,
                descripcion: "",
            } as SolicitudCreacionOfertaLaboralDTO,
            formValido: true,
            opcionesEscalaDuracion: ["hora", "día", "semana", "mes"],
            opcionesTurnoTrabajo: ["diurno", "nocturno", "mixto"],
            dialog: false,

            //Para el manejo del mensaje
            mensajeError: "",
            snackbar: false,
        };
    },

    methods: {
        crear() {
            console.log("Objeto a enviar: ");
            console.log(this.ofertaLaboralCrear);
            //Inicializamos el controlador
            const cuAEjecutar = ControladorCrearOfertaLaboral.inicializar();

            //¿Por qué colocar en respuesta la oferta laboral?
            const respuestaCU = cuAEjecutar.ejecutarCU(this.ofertaLaboralCrear);
            respuestaCU
                .then((data: any) => {
                    if (data.esExitoso) {
                        //Cambiamos el estado
                        this.estaCargando = false;

                        console.log("[Oferta creada satisfactoriamente]");

                        //Si la oferta fue exitosamente creada, mostramos
                        //mensaje de éxito y cerramos el modal
                        this.dialog = false;

                        //Reinicializamos variable del crear
                        /*
                        this.ofertaLaboralCrear = {
                            titulo: "",
                            cargo: "",
                            sueldo: 0,
                            duracionEstimadaValor: 0,
                            duracionEstimadaEscala: "",
                            turnoTrabajo: "",
                            numeroVacantes: 0,
                            descripcion: "",
                        }
                        */

                        //Mensaje del mensaje de éxito y se activa alerta por 5 segundos
                        //this.$props.mensajeExito =

                        //this.$props.alertaExito;
                        this.$emit(
                            "alertexito",
                            "¡La oferta laboral ha sido creada satisfactoriamente!"
                        );
                    } else {
                        //TODO Manejo de caso con error al recuperar conjunto
                        console.warn("Algo pasó", data.error);
                        this.mensajeError = data.error;

                        this.snackbar = true;
                        //¿Cómo le cambiaría el estado al componente hijo?
                        //this.$refs.AlertaError.snackbar = true;
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
        },
        validar() {
            interface VForm extends HTMLFormElement {
                validate(): boolean;
            }
            //this.$refs[`form`][0].validate();
            if (this.$refs.formulario != undefined) {
                //console.log(this.$refs.formulario);
                const prueba = this.$refs.form as VForm;
                console.log(prueba);
                prueba.validate();
            }
        },
        alertaFin() {
            this.snackbar = false;
        },
    },
});
</script>

<style></style>
