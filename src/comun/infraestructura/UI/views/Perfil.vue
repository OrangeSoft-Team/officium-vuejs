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
                    <v-avatar
                    size="250">
                        <v-img
                            :src="require('../assets/LogoPerfil.jpg')"
                        ></v-img>
                    </v-avatar>
                </v-row>
                <v-row class="justify-center">
                    <v-text-field
                        v-model="datosEmpresa.nombreEmpresa"
                        :counter="128"
                        :rules="[
                            (v) =>
                                !!v || 'Este campo es obligatorio',
                        ]"
                        label="Ingrese el nombre de la empresa"
                        required
                        id="inpt-nombre"
                    ></v-text-field>
                </v-row>
                <v-row class="justify-center">
                    <v-text-field
                        v-model="datosEmpresa.correoElectronico"
                        :counter="320"
                        :rules="[
                            (v) =>
                                !!v || 'Este campo es obligatorio',
                        ]"
                        label="Ingrese el correo electrónico"
                        required
                        id="inpt-correo"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        v-model="datosEmpresa.codigoPostal"
                        :counter="10"
                        :rules="[
                            (v) =>
                                !!v || 'Este campo es obligatorio',
                        ]"
                        label="Ingrese el código postal"
                        required
                        id="inpt-codigoPostal"
                    ></v-text-field>
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
                        :rules="[
                            (v) =>
                                !!v || 'Este campo es obligatorio',
                        ]"
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
                        :rules="[
                            (v) =>
                                !!v || 'Este campo es obligatorio',
                        ]"
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
                        :rules="[
                            (v) =>
                                !!v || 'Este campo es obligatorio',
                        ]"
                        label="Ciudad"
                        required
                        id="inpt-ciudad"
                    ></v-select>
                </v-row>
                <v-row class="justify-center">
                    <v-textarea
                        v-model="datosEmpresa.direccionCalle"
                        label="Ingrese la dirección de la calle"
                        hint="La dirección no debería ser mayor a 256 caracteres"
                        :rules="[(v) => !!v || 'Este campo es obligatorio']"
                        id="inpt-direccion"
                    ></v-textarea>
                </v-row>
                <v-row class="justify-center">
                    <v-btn class="ma-2" color="#00B592" v-on:click="actualizarDatos">
                        <v-icon dark>
                            mdi-pencil
                        </v-icon>
                        Guardar cambios
                    </v-btn>
                </v-row>
                
            </v-col>
            <v-col cols="12" sm="1" md="1" lg="1" xl="1"> </v-col>
            
            <alerta-error
                :mensaje="mensajeError"
                :snackbar="snackbar"
                v-on:alertfin="alertaFin"
            ></alerta-error>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { ControladorObtDatosBasicos } from "../../../../empresa/infraestructura/controlador/ControladorObtDatosBasicos";
import { ControladorObtenerPaises } from "../../controlador/ControladorObtPaises";
import { ControladorObtenerEstados } from "../../controlador/ControladorObtEstados";
import { ControladorObtenerCiudades } from "../../controlador/ControladorObtCiudades";
import { ControladorActualizarDatosBasicos } from "../../../../empresa/infraestructura/controlador/ControladorActualizarDatos";
//Importamos la interface del DTO para que el objeto a mostrar en la tabla
//sea del mismo tipo que el que se trae en la respuesta del CU
import { DatosBasicosEmpresaDTO } from "../../../../empresa/aplicacion/dto/DatosBasicosEmpresaDTO";
import { PaisDTO } from "../../../aplicacion/dto.geografico/PaisDTO";
import { EstadoDTO } from "../../../aplicacion/dto.geografico/EstadoDTO";
import { CiudadDTO } from "../../../aplicacion/dto.geografico/CiudadDTO";

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
            datosEmpresa: {
                nombreEmpresa: '',
                correoElectronico: '',
                direccionCalle: '',
                codigoPostal: '',
                uuidPais: '',
                uuidEstado: '',
                uuidCiudad: '',
            } as DatosBasicosEmpresaDTO,
            paises: [] as PaisDTO[],
            estados: [] as EstadoDTO[],
            ciudades: [] as CiudadDTO[],

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
            const cuAEjecutar =
                ControladorObtDatosBasicos.inicializar();


            //Ejecutamos el caso de uso
            /**
             * Se deja temporalmente el id de la empresa como constante
             */
            const respuestaCU = cuAEjecutar.ejecutarCU({
                idEmpresa: "1",
            });
            respuestaCU
                .then((data) => {
                    if (data.esExitoso) {
                        //Cambiamos el estado
                        this.estaCargando = false;
                        //Actualizamos
                        this.datosEmpresa = data.getValue();

                        console.log(this.datosEmpresa)
                        //Una vez obtenidos los datos del perfil, llamamos a los CU de país, estado y ciudad
                        this.ejecutarCUPaises();
                        this.ejecutarCUPEstados(this.datosEmpresa.uuidPais);
                        this.ejecutarCUCiudades(this.datosEmpresa.uuidEstado);

                    } else {
                        //TODO Manejo de caso con error al recuperar conjunto
                        console.warn("Algo pasó", data.error);
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
        ejecutarCUPEstados(uuidPais:string) {
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
        ejecutarCUCiudades(uuidEstado:string) {
            //Inicializamos controlador
            const cuCiudad = ControladorObtenerCiudades.inicializar();

            //Ejecutamos el caso de uso
            const respuestaCUCiudad = cuCiudad.ejecutarCU({
                idEstado: uuidEstado
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
        
        recargarDatos() {
            this.estaCargando = false;
            this.ejecutarCU();
        },
        actualizarEstados(){
            console.log("País cambiado")
            this.datosEmpresa.uuidEstado = "";
            this.datosEmpresa.uuidCiudad = "";
            this.ejecutarCUPEstados(this.datosEmpresa.uuidPais);
        },
        actualizarCiudades(){
            console.log("Estado cambiado")
            this.datosEmpresa.uuidCiudad = "";
            this.ejecutarCUCiudades(this.datosEmpresa.uuidEstado)
        },
        actualizarDatos(){
            console.log("Objeto a enviar: ");
            console.log(this.datosEmpresa);
            //Inicializamos el controlador
            const cuAEjecutar = ControladorActualizarDatosBasicos.inicializar();

            const respuestaCU = cuAEjecutar.ejecutarCU(this.datosEmpresa);
            respuestaCU
                .then((data: any) => {
                    if (data.esExitoso) {
                        //Cambiamos el estado
                        this.estaCargando = false;

                        console.log("[Datos actualizados satisfactoriamente]");

                        //Si la oferta fue exitosamente creada, mostramos
                        //mensaje de éxito y cerramos el modal
                        this.dialog = false;

                        //Mensaje del mensaje de éxito y se activa alerta por 5 segundos
                        this.alertExito("¡Los datos básicos has sido actualizados satisfactoriamente!")

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
        alertaFin() {
            this.snackbar = false;
        },
    },
});
</script>

<style></style>
