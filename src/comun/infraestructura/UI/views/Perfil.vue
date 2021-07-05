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
                        :rules="[
                            (v) =>
                                !!v || 'Este campo es obligatorio',
                        ]"
                        label="País"
                        required
                        id="inpt-pais"
                        @change="actualizarEstadosCiudad()"
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
            </v-col>
            
            <v-col cols="12" sm="1" md="1" lg="1" xl="1"> </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { ControladorObtDatosBasicos } from "../../../../empresa/infraestructura/controlador/ControladorObtDatosBasicos";
import { ControladorObtenerPaises } from "../../controlador/ControladorObtPaises";
import { ControladorObtenerEstados } from "../../controlador/ControladorObtEstados";
import { ControladorObtenerCiudades } from "../../controlador/ControladorObtCiudades";
//Importamos la interface del DTO para que el objeto a mostrar en la tabla
//sea del mismo tipo que el que se trae en la respuesta del CU
import { DatosBasicosEmpresaDTO } from "../../../../empresa/aplicacion/dto/DatosBasicosEmpresaDTO";
import { PaisDTO } from "../../../aplicacion/dto.geografico/PaisDTO";
import { EstadoDTO } from "../../../aplicacion/dto.geografico/EstadoDTO";
import { CiudadDTO } from "../../../aplicacion/dto.geografico/CiudadDTO";


export default Vue.extend({
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

                        //Una vez obtenidos los datos del perfil, llamamos a los CU de país, estado y ciudad
                        this.ejecutarCUPaisesEstadosCiudades();

                    } else {
                        //TODO Manejo de caso con error al recuperar conjunto
                        console.warn("Algo pasó", data.error);
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
            
        },
        ejecutarCUPaisesEstadosCiudades() {
            //Inicializamos los controladores
            const cuPais = ControladorObtenerPaises.inicializar();
            const cuEstado = ControladorObtenerEstados.inicializar();
            const cuCiudad = ControladorObtenerCiudades.inicializar();

            //Ejecutamos los casos de uso
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

            const respuestaCUEstado = cuEstado.ejecutarCU({
                idPais: this.datosEmpresa.uuidPais,
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

            const respuestaCUCiudad = cuCiudad.ejecutarCU({
                idEstado: this.datosEmpresa.uuidEstado,
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
            this.datosEmpresa = {
                nombreEmpresa: '',
                correoElectronico: '',
                direccionCalle: '',
                codigoPostal: '',
                uuidPais: '',
                uuidEstado: '',
                uuidCiudad: '',
            };
            this.estaCargando = false;
            this.ejecutarCU();
        },
        actualizarEstadosCiudad(){
            /**
             * Función que llamará a los CU de ciudad y estado para actualizarlos de acuerdo al nuevo país escogido 
             */
            console.log("País cambiado")
        }
    },
});
</script>

<style></style>
