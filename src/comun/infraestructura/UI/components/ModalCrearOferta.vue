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
                            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                                <v-text-field
                                    v-model="
                                        ofertaLaboralCrear.requisitosEspeciales
                                    "
                                    :counter="100"
                                    type="text"
                                    label="Ingrese los requisitos especiales (opcional)"
                                    id="inpt-req-esp"
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
                        <v-row class="justify-center">
                            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                                <v-card>
                                    <v-row class="justify-center">
                                        <v-col
                                            cols="12"
                                            sm="4"
                                            md="4"
                                            lg="4"
                                            xl="4"
                                        >
                                            <v-row class="justify-center">
                                                <v-select
                                                    v-model="uuidHabilidad"
                                                    :items="listaHabilidades"
                                                    item-text="nombre"
                                                    item-value="uuid"
                                                    label="Lista de habilidades"
                                                    required
                                                    id="inpt-habilidad"
                                                ></v-select>
                                            </v-row>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="2"
                                            md="2"
                                            lg="2"
                                            xl="2"
                                        >
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="4"
                                            md="4"
                                            lg="4"
                                            xl="4"
                                        >
                                            <v-row class="justify-center">
                                                <v-btn
                                                    class="ma-5"
                                                    color="primary"
                                                    id="btn-add-habilidad"
                                                    outlined
                                                    v-on:click="
                                                        agregarHabilidad
                                                    "
                                                    block
                                                >
                                                    <v-icon dark>
                                                        mdi-checkbox-marked-circle
                                                    </v-icon>
                                                    Agregar habilidad a la tabla
                                                </v-btn>
                                            </v-row>
                                        </v-col>
                                    </v-row>

                                    <v-card-title>
                                        <v-row
                                            justify="space-between"
                                            class="pa-2"
                                        >
                                            Habilidades requeridas en la oferta
                                            laboral
                                        </v-row>
                                    </v-card-title>
                                    <v-data-table
                                        :headers="headersTableHabilidades"
                                        :items="habilidadesEmpresa"
                                        :items-per-page="3"
                                        class="elevation-1"
                                        locale="es"
                                    >
                                        <template v-slot:item="row">
                                            <tr>
                                                <td>{{ row.item.nombre }}</td>
                                                <td>
                                                    {{ row.item.categoria }}
                                                </td>
                                                <td>
                                                    <v-btn
                                                        x-small
                                                        color="red"
                                                        v-on:click="
                                                            quitarHabilidad(
                                                                row.item.uuid
                                                            )
                                                        "
                                                        block
                                                    >
                                                        <v-icon dark small>
                                                            mdi-cancel
                                                        </v-icon>
                                                        eliminar
                                                    </v-btn>
                                                </td>
                                            </tr>
                                        </template>
                                    </v-data-table>
                                </v-card>
                            </v-col>
                        </v-row>
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
import { ControladorObtenerHabilidades } from "../../controlador/ControladorObtHabilidades";
//Importamos la interface del DTO para que el objeto a mostrar en la tabla
//sea del mismo tipo que el que se trae en la respuesta del CU

//import { CrearOfertaLaboralDTO } from "../../../../ofertaLaboral/aplicacion/dto/CrearOfertaLaboralDTO";
import { SolicitudCreacionOfertaLaboralDTO } from "../../../../ofertaLaboral/aplicacion/casoDeUso/CrearOfertaLaboral.cu";

//DTO para las habilidades
import { HabilidadDTO } from "../../../../comun/aplicacion/dtos/HabilidadDTO";

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
                habilidades: [],
            } as SolicitudCreacionOfertaLaboralDTO,
            formValido: true,
            opcionesEscalaDuracion: ["hora", "día", "semana", "mes"],
            opcionesTurnoTrabajo: ["diurno", "nocturno", "mixto"],
            dialog: false,
            headersTableHabilidades: [
                { text: "Nombre", value: "nombre" },
                { text: "Categoría", value: "categoria" },
                { text: "Acciones", value: "acciones" },
            ],
            habilidadesEmpresa: [] as HabilidadDTO[],
            listaHabilidades: [] as HabilidadDTO[],
            uuidHabilidad: "",

            //Para el manejo del mensaje
            mensajeError: "",
            snackbar: false,
        };
    },
    mounted() {
        this.ejecutarCUHabilidades();
    },
    methods: {
        ejecutarCUHabilidades() {
            //Inicializamos controlador
            const cuHab = ControladorObtenerHabilidades.inicializar();

            //Ejecutamos el caso de uso
            const respuestaCUHabilidades = cuHab.ejecutarCU();
            respuestaCUHabilidades
                .then((data) => {
                    if (data.esExitoso) {
                        //Cambiamos el estado
                        this.estaCargando = false;
                        //Actualizamos
                        this.listaHabilidades = data.getValue();
                    } else {
                        //TODO Manejo de caso con error al recuperar conjunto
                        console.warn("Algo pasó", data.error);
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
        },
        crear() {
            console.log("Objeto a enviar: ");
            console.log(this.ofertaLaboralCrear);
            if (this.ofertaLaboralCrear.requisitosEspeciales == "")
                this.ofertaLaboralCrear.requisitosEspeciales = undefined;

            /*
            let objEnviar:SolicitudCreacionOfertaLaboralDTO = {
                titulo: this.ofertaLaboralCrear.titulo,
                cargo: this.ofertaLaboralCrear.cargo,
                sueldo: this.ofertaLaboralCrear.sueldo,
                duracionEstimadaValor: this.ofertaLaboralCrear.duracionEstimadaValor,
                duracionEstimadaEscala: this.ofertaLaboralCrear.duracionEstimadaEscala,
                turnoTrabajo: this.ofertaLaboralCrear.turnoTrabajo,
                numeroVacantes: this.ofertaLaboralCrear.numeroVacantes,
                descripcion: this.ofertaLaboralCrear.descripcion,
                uuidHabilidades: this.ofertaLaboralCrear.uuidHabilidades
            }
            */

            //Inicializamos el controlador
            const cuAEjecutar = ControladorCrearOfertaLaboral.inicializar();

            //const respuestaCU = cuAEjecutar.ejecutarCU(this.ofertaLaboralCrear);
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
                        this.ofertaLaboralCrear = {
                            titulo: "",
                            cargo: "",
                            sueldo: 0,
                            duracionEstimadaValor: 0,
                            duracionEstimadaEscala: "",
                            turnoTrabajo: "",
                            numeroVacantes: 0,
                            descripcion: "",
                            requisitosEspeciales: "",
                            habilidades: []
                        }

                        //this.$props.alertaExito;
                        this.$emit(
                            "alertexito",
                            "¡La oferta laboral ha sido creada satisfactoriamente!"
                        );
                    } else {
                        console.warn("Algo pasó", data.error);
                        this.mensajeError = data.error;

                        this.snackbar = true;
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
            if (this.$refs.formulario != undefined) {
                const prueba = this.$refs.form as VForm;
                console.log(prueba);
                prueba.validate();
            }
        },
        agregarHabilidad() {
            //Validar que el elemento no esté dentro del array
            if (
                !this.ofertaLaboralCrear.habilidades.find(
                    (i) => i.uuid === this.uuidHabilidad
                )
            ) {
                for (let i = 0; i < this.listaHabilidades.length; i++) {
                    if (this.listaHabilidades[i].uuid == this.uuidHabilidad) {
                        this.habilidadesEmpresa.push(this.listaHabilidades[i]);
                        this.ofertaLaboralCrear.habilidades.push(
                            this.listaHabilidades[i]
                        );
                        break;
                    }
                }
            }
        },
        quitarHabilidad(uuidHab: string) {
            for (let i = 0; i < this.habilidadesEmpresa.length; i++) {
                if (this.habilidadesEmpresa[i].uuid == uuidHab) {
                    this.habilidadesEmpresa.splice(i, 1);
                    break;
                }
            }
            for (
                let i = 0;
                i < this.ofertaLaboralCrear.habilidades.length;
                i++
            ) {
                if (this.ofertaLaboralCrear.habilidades[i].uuid == uuidHab) {
                    this.ofertaLaboralCrear.habilidades.splice(i, 1);
                    break;
                }
            }
        },
        alertaFin() {
            this.snackbar = false;
        },
    },
});
</script>

<style></style>
