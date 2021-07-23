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
            <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                <v-row class="justify-center">
                    <v-avatar size="250">
                        <v-img
                            :src="require('../assets/LogoPerfil.jpg')"
                        ></v-img>
                    </v-avatar>
                </v-row>
                <v-row class="justify-center">
                    <v-text-field
                        v-model="datosEmpresa.nombreEmpresa"
                        :counter="128"
                        :rules="[(v) => !!v || 'Este campo es obligatorio']"
                        label="Ingrese el nombre de la empresa"
                        required
                        id="inpt-nombre"
                    ></v-text-field>
                </v-row>
                <v-row class="justify-center">
                    <v-text-field
                        v-model="datosEmpresa.correoElectronico"
                        :counter="320"
                        :rules="[(v) => !!v || 'Este campo es obligatorio']"
                        label="Ingrese el correo electrónico"
                        required
                        id="inpt-correo"
                    ></v-text-field>
                </v-row>
                <v-row class="justify-center">
                    <v-textarea
                        v-model="datosEmpresa.requisitosEspeciales"
                        label="Ingrese los requisitos especiales que requiere de los empleados (campo opcional)"
                        hint="Los requisitos especiales no deberían ser mayores a 256 caracteres"
                        id="inpt-req-especiales"
                    ></v-textarea>
                </v-row>
            </v-col>
            <v-col cols="12" sm="2" md="2" lg="2" xl="2"> </v-col>
            <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                <v-row class="justify-center">
                    <v-select
                        v-model="datosEmpresa.uuidPais"
                        :items="paises"
                        item-text="nombrePais"
                        item-value="uuidPais"
                        :rules="[(v) => !!v || 'Este campo es obligatorio']"
                        label="País"
                        required
                        id="inpt-pais"
                        @change="actualizarEstados()"
                    ></v-select>
                </v-row>
                <v-row class="justify-center">
                    <v-select
                        v-model="datosEmpresa.uuidEstado"
                        :items="estados"
                        item-text="nombreEstado"
                        item-value="uuidEstado"
                        :rules="[(v) => !!v || 'Este campo es obligatorio']"
                        label="Estado"
                        required
                        id="inpt-estado"
                        @change="actualizarCiudades()"
                    ></v-select>
                </v-row>
                <v-row class="justify-center">
                    <v-select
                        v-model="datosEmpresa.uuidCiudad"
                        :items="ciudades"
                        item-text="nombreCiudad"
                        item-value="uuidCiudad"
                        :rules="[(v) => !!v || 'Este campo es obligatorio']"
                        label="Ciudad"
                        required
                        id="inpt-ciudad"
                    ></v-select>
                </v-row>
                <v-row>
                    <v-text-field
                        v-model="datosEmpresa.codigoPostal"
                        :counter="10"
                        :rules="[(v) => !!v || 'Este campo es obligatorio']"
                        label="Ingrese el código postal"
                        required
                        id="inpt-codigoPostal"
                    ></v-text-field>
                </v-row>
                <v-row class="justify-center">
                    <v-textarea
                        v-model="datosEmpresa.calleUno"
                        label="Ingrese la dirección de la calle 1"
                        hint="La dirección no debería ser mayor a 256 caracteres"
                        :rules="[(v) => !!v || 'Este campo es obligatorio']"
                        id="inpt-direccion"
                    ></v-textarea>
                </v-row>
                <v-row class="justify-center">
                    <v-textarea
                        v-model="datosEmpresa.calleDos"
                        label="Ingrese la dirección de la calle 2 (opcional)"
                        hint="La dirección no debería ser mayor a 256 caracteres"
                        id="inpt-direccion"
                    ></v-textarea>
                </v-row>
            </v-col>
            <v-col cols="12" sm="1" md="1" lg="1" xl="1"> </v-col>

            <v-row align="center" no-gutters style="height: 50px"> </v-row>

            <v-row class="justify-center">
                <v-col cols="12" sm="10" md="10" lg="10" xl="10">
                    <v-card>
                        <v-row class="justify-center">
                            <v-col cols="12" sm="1" md="1" lg="1" xl="1">
                            </v-col>
                            <v-col cols="12" sm="4" md="4" lg="4" xl="4">
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
                            <v-col cols="12" sm="2" md="2" lg="2" xl="2">
                            </v-col>
                            <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                                <v-row class="justify-center">
                                    <v-btn
                                        class="ma-5"
                                        color="primary"
                                        outlined
                                        v-on:click="agregarHabilidad"
                                        block
                                    >
                                        <v-icon dark>
                                            mdi-checkbox-marked-circle
                                        </v-icon>
                                        Agregar habilidad a la tabla
                                    </v-btn>
                                </v-row>
                            </v-col>
                            <v-col cols="12" sm="1" md="1" lg="1" xl="1">
                            </v-col>
                        </v-row>

                        <v-card-title>
                            <v-row justify="space-between" class="pa-2">
                                Habilidades que solicita la empresa
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
                                    <td>{{ row.item.categoria }}</td>
                                    <td>
                                        <v-btn
                                            x-small
                                            color="red"
                                            v-on:click="
                                                quitarHabilidad(row.item.uuid)
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

                <alerta-error
                    :mensaje="mensajeError"
                    :snackbar="snackbar"
                    v-on:alertfin="alertaFin"
                ></alerta-error>
            </v-row>

            <v-btn
                class="mt-4 mb-4"
                color="primary"
                v-on:click="actualizarDatos"
                block
            >
                <v-icon dark> mdi-pencil </v-icon>
                Guardar cambios
            </v-btn>

            <hr />
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { ControladorObtDatosBasicos } from "../../../../empresa/infraestructura/controlador/ControladorObtDatosBasicos";
import { ControladorObtenerPaises } from "../../controlador/ControladorObtPaises";
import { ControladorObtenerEstados } from "../../controlador/ControladorObtEstados";
import { ControladorObtenerCiudades } from "../../controlador/ControladorObtCiudades";
import { ControladorObtenerHabilidades } from "../../controlador/ControladorObtHabilidades";
import { ControladorActualizarDatosBasicos } from "../../../../empresa/infraestructura/controlador/ControladorActualizarDatos";
//Importamos la interface del DTO para que el objeto a mostrar en la tabla
//sea del mismo tipo que el que se trae en la respuesta del CU
import { DatosBasicosEmpresaDTO } from "../../../../empresa/aplicacion/dto/DatosBasicosEmpresaDTO";
import { PaisDTO } from "../../../aplicacion/dto.geografico/PaisDTO";
import { EstadoDTO } from "../../../aplicacion/dto.geografico/EstadoDTO";
import { CiudadDTO } from "../../../aplicacion/dto.geografico/CiudadDTO";

//DTO para las habilidades
import { HabilidadDTO } from "../../../../comun/aplicacion/dtos/HabilidadDTO";

import AlertaError from "../components/AlertaError.vue";
import AlertaExito from "../components/AlertaExito.vue";
import { Console } from "console";

export default Vue.extend({
    components: {
        AlertaError,
        AlertaExito,
    },
    data() {
        return {
            estaCargando: true,
            datosEmpresa: {
                nombreEmpresa: "",
                correoElectronico: "",
                requisitosEspeciales: "",
                calleUno: "",
                calleDos: "",
                codigoPostal: "",
                uuidPais: "",
                uuidEstado: "",
                uuidCiudad: "",
                habilidad: [],
            } as DatosBasicosEmpresaDTO,
            paises: [] as PaisDTO[],
            estados: [] as EstadoDTO[],
            ciudades: [] as CiudadDTO[],

            headersTableHabilidades: [
                { text: "Nombre", value: "nombre" },
                { text: "Categoría", value: "categoria" },
                { text: "Acciones", value: "acciones" },
            ],
            habilidadesEmpresa: [] as HabilidadDTO[],
            listaHabilidades: [] as HabilidadDTO[],
            uuidHabilidad: "",

            //Para el manejo del mensaje de éxito
            mensajeExito: "",
            alertaExito: false,
            dialog: false,

            //Para el manejo del mensaje
            mensajeError: "",
            snackbar: false,
        };
    },

    mounted() {
        this.ejecutarCU();
    },
    methods: {
        alertExito(mensaje: string) {
            this.alertaExito = true;
            this.mensajeExito = mensaje;

            this.recargarDatos();
        },
        ejecutarCU() {
            //Inicializamos el controlador
            const cuAEjecutar = ControladorObtDatosBasicos.inicializar();

            //Ejecutamos el caso de uso
            /**
             * Se deja temporalmente el id de la empresa como constante
             */
            const respuestaCU = cuAEjecutar.ejecutarCU();
            respuestaCU
                .then((data) => {
                    if (data.esExitoso) {
                        //Cambiamos el estado
                        this.estaCargando = false;
                        //Actualizamos
                        this.datosEmpresa = data.getValue();

                        //Una vez obtenidos los datos del perfil, llamamos a los CU de país, estado, ciudad y habilidades
                        this.ejecutarCUPaises();
                        this.ejecutarCUEstados(this.datosEmpresa.uuidPais);
                        this.ejecutarCUCiudades(this.datosEmpresa.uuidEstado);
                        this.ejecutarCUHabilidades();
                        this.habilidadesEmpresa = this.datosEmpresa.habilidad;
                    } else {
                        //TODO Manejo de caso con error al recuperar conjunto
                        console.warn("Algo pasó", data.error);
                        this.mensajeError = <string>data.error;
                        this.snackbar = true;
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
        },
        ejecutarCUPaises() {
            //Inicializamos controlador
            const cuPais = ControladorObtenerPaises.inicializar();

            //Ejecutamos el caso de uso
            const respuestaCUPais = cuPais.ejecutarCU();
            respuestaCUPais
                .then((data) => {
                    if (data.esExitoso) {
                        //Cambiamos el estado
                        this.estaCargando = false;
                        //Actualizamos
                        this.paises = data.getValue();
                    } else {
                        //TODO Manejo de caso con error al recuperar conjunto
                        console.warn("Algo pasó", data.error);
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
        },
        ejecutarCUEstados(uuidPais: string) {
            //Inicializamos controlador
            const cuEstado = ControladorObtenerEstados.inicializar();

            //Ejecutamos el caso de uso
            const respuestaCUEstado = cuEstado.ejecutarCU({
                idPais: uuidPais,
            });
            respuestaCUEstado
                .then((data) => {
                    if (data.esExitoso) {
                        //Cambiamos el estado
                        this.estaCargando = false;
                        //Actualizamos
                        this.estados = data.getValue();
                    } else {
                        //TODO Manejo de caso con error al recuperar conjunto
                        console.warn("Algo pasó", data.error);
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
        },
        ejecutarCUCiudades(uuidEstado: string) {
            //Inicializamos controlador
            const cuCiudad = ControladorObtenerCiudades.inicializar();

            //Ejecutamos el caso de uso
            const respuestaCUCiudad = cuCiudad.ejecutarCU({
                idEstado: uuidEstado,
            });
            respuestaCUCiudad
                .then((data) => {
                    if (data.esExitoso) {
                        //Cambiamos el estado
                        this.estaCargando = false;
                        //Actualizamos
                        this.ciudades = data.getValue();
                    } else {
                        //TODO Manejo de caso con error al recuperar conjunto
                        console.warn("Algo pasó", data.error);
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
        },
        ejecutarCUHabilidades() {
            //Inicializamos controlador
            const cuHab = ControladorObtenerHabilidades.inicializar();

            //Ejecutamos el caso de uso
            const respuestaCUPais = cuHab.ejecutarCU();
            respuestaCUPais
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

        recargarDatos() {
            this.estaCargando = false;
            this.ejecutarCU();
        },
        actualizarEstados() {
            //console.log("País cambiado");
            this.datosEmpresa.uuidEstado = "";
            this.datosEmpresa.uuidCiudad = "";
            this.ejecutarCUEstados(this.datosEmpresa.uuidPais);
        },
        actualizarCiudades() {
            //console.log("Estado cambiado");
            this.datosEmpresa.uuidCiudad = "";
            this.ejecutarCUCiudades(this.datosEmpresa.uuidEstado);
        },
        actualizarDatos() {
            //console.log("Objeto a enviar: ", this.datosEmpresa);
            //Inicializamos el controlador
            const cuAEjecutar = ControladorActualizarDatosBasicos.inicializar();

            //Asociamos las habilidades de la tabla al array de habilidades de la empresa
            this.datosEmpresa.habilidad = this.habilidadesEmpresa;

            console.log("Datos a enviar de la empresa:");
            console.log(this.datosEmpresa);

            const respuestaCU = cuAEjecutar.ejecutarCU(this.datosEmpresa);
            respuestaCU
                .then((data: any) => {
                    if (data.esExitoso) {
                        //Cambiamos el estado
                        this.estaCargando = false;

                        console.log("[Datos actualizados satisfactoriamente]");
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });

                        //Si la oferta fue exitosamente creada, mostramos
                        //mensaje de éxito y cerramos el modal
                        this.dialog = false;

                        //Mensaje del mensaje de éxito y se activa alerta por 5 segundos
                        this.alertExito(
                            "¡Los datos básicos has sido actualizados satisfactoriamente!"
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
        agregarHabilidad() {
            //Validar que el elemento no esté dentro del array
            if (
                !this.habilidadesEmpresa.find(
                    (i) => i.uuid === this.uuidHabilidad
                )
            ) {
                for (let i = 0; i < this.listaHabilidades.length; i++) {
                    if (this.listaHabilidades[i].uuid == this.uuidHabilidad) {
                        this.habilidadesEmpresa.push(this.listaHabilidades[i]);
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
        },
        alertaFin() {
            this.snackbar = false;
        },
    },
});
</script>

<style></style>
