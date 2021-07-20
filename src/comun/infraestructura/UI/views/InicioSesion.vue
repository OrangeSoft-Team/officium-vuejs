<template>
    <v-container fill-height fill-width class="fondo-primary" fluid>
        <v-row no-gutters justify="center">
            <v-col align-self="center" cols="6">
                <v-form ref="formSesion" v-model="formValido" lazy-validation>
                    <v-card>
                        <v-card-title class="d-flex justify-center mb-6">
                            <v-img
                                :src="require('../assets/LogoNormal.png')"
                                max-height="200"
                                max-width="240"
                            ></v-img>
                        </v-card-title>
                        <v-card-text>
                            <v-alert dense type="error" v-model="error.estado">
                                {{ error.mensaje }}
                            </v-alert>

                            <v-text-field
                                v-model="datosInicioSesion.correoElectronico"
                                :rules="[
                                    (v) => !!v || 'Este campo es obligatorio',
                                ]"
                                id="text-correo"
                                label="Correo electrónico"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="datosInicioSesion.contraseña"
                                :rules="[
                                    (v) => !!v || 'Este campo es obligatorio',
                                ]"
                                id="text-contrasena"
                                label="Contraseña"
                                type="password"
                                required
                            ></v-text-field>
                            <v-progress-linear
                                indeterminate
                                v-show="estaCargando"
                            ></v-progress-linear>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                id="btn-login"
                                block
                                depressed
                                color="primary"
                                @click="iniciarSesion"
                            >
                                Iniciar sesión
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { ControladorIniciarSesion } from "../../../../sesion/infraestructura/controlador/ControladorIniciarSesion";
import Vue from "vue";
import { DatosInicioSesionDTO } from "@/sesion/aplicacion/casoDeUso/IniciarSesionCorreoClave.cu";
/*
   correoElectronico: "test@test.com",
                contraseña: "123456QAZwsx",
*/
export default Vue.extend({
    data() {
        return {
            formValido: true,
            estaCargando: false,
            datosInicioSesion: {
                correoElectronico: "",
                contraseña: "",
            } as DatosInicioSesionDTO,
            error: {
                estado: false,
                mensaje: "",
            },
        };
    },
    methods: {
        iniciarSesion() {
            if (this.validar()) {
                const controlador = ControladorIniciarSesion.inicialiar();

                const respuestaCU = controlador.ejecutarCU(
                    this.datosInicioSesion
                );

                this.error.estado = false;
                this.estaCargando = true;

                respuestaCU
                    .then((respuesta) => {
                        if (respuesta.esExitoso) {
                            //console.log("Llega a exito");
                            this.estaCargando = false;
                            this.$router.replace({ name: "Inicio" });
                        } else {
                            //console.log("Llega a fallo");
                            this.estaCargando = false;
                            this.error.mensaje = <string>respuesta.error;
                            this.error.estado = true;
                        }
                    })
                    .catch((e) => {
                        console.error("Error fatal");

                        this.error.mensaje = "Ha ocurrido un error";
                        this.error.estado = true;
                        this.estaCargando = false;
                    });
            }
        },
        validar(): boolean {
            interface VForm extends HTMLFormElement {
                validate(): boolean;
            }

            if (this.$refs.formSesion != undefined) {
                const formSesion = this.$refs.formSesion as VForm;
                return formSesion.validate();
            }

            return false;
        },
    },
});
</script>

<style>
.fondo-primary {
    background-color: #5d60f5;
}
</style>
