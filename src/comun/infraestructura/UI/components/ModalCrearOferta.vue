<template>
    <v-dialog v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
            <v-btn depressed color="primary" v-bind="attrs" v-on="on">
                Crear
            </v-btn>
        </template>

        <v-card>
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
                        label="Ingrese el título de la oferta laboral"
                        required
                    ></v-text-field>

                    <v-row>
                        <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                            <v-text-field
                                v-model="ofertaLaboralCrear.cargo"
                                :counter="50"
                                label="Ingrese el cargo de la oferta laboral"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                            <v-select
                                v-model="ofertaLaboralCrear.turnoTrabajo"
                                :items="opcionesTurnoTrabajo"
                                :rules="[
                                    (v) => !!v || 'Este campo es obligatorio',
                                ]"
                                label="Turno de trabajo"
                                required
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
                                label="Ingrese el número de vacantes"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                            <v-text-field
                                v-model.number="ofertaLaboralCrear.sueldo"
                                :counter="10"
                                type="number"
                                label="Ingrese el sueldo de la oferta laboral"
                                required
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
                                label="Duración"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                            <v-select
                                v-model="
                                    ofertaLaboralCrear.duracionEstimadaEscala
                                "
                                :items="opcionesEscalaDuracion"
                                :rules="[
                                    (v) => !!v || 'Este campo es obligatorio',
                                ]"
                                label="Escala"
                                required
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-textarea
                        v-model="ofertaLaboralCrear.descripcion"
                        label="Ingrese la descripción de la oferta laboral"
                        hint="La descripción no debería ser mayor a 512 caracteres"
                    ></v-textarea>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary darken-1" text @click="dialog = false">
                    Cerrar
                </v-btn>
                <v-btn color="primary" v-on:click="crear">
                    Crear oferta laboral
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { ControladorCrearOfertaLaboral } from "../../../../ofertaLaboral/infraestructura/controlador/ControladorCrearOfertaLaboral";
//Importamos la interface del DTO para que el objeto a mostrar en la tabla
//sea del mismo tipo que el que se trae en la respuesta del CU
import { CrearOfertaLaboralDTO } from "../../../../ofertaLaboral/aplicacion/dto/CrearOfertaLaboralDTO";
import { SolicitudCreacionOfertaLaboralDTO } from "../../../../ofertaLaboral/aplicacion/casoDeUso/CrearOfertaLaboral.cu";

export default Vue.extend({
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
            /*
            normaTitulo: [
                v => !!v || 'El título es requerido'
            ],
            */
            opcionesEscalaDuracion: ["hora", "día", "semana", "mes"],
            opcionesTurnoTrabajo: ["diurno", "nocturno", "mixto"],
            dialog: false,
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
                .then((data) => {
                    if (data.esExitoso) {
                        //Cambiamos el estado
                        this.estaCargando = false;

                        console.log("[Oferta creada satisfactoriamente]");
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
