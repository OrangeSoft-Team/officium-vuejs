<template>
    <v-container fill-height fill-width class="fondo-primary" fluid>
        <v-row no-gutters justify="center">
            <v-col align-self="center" cols="6">
                <v-form
                    ref="formRestablecer"
                    v-model="formValido"
                    lazy-validation
                >
                    <v-card>
                        <v-card-title class="d-flex justify-center mb-6">
                            <v-img
                                :src="require('../assets/LogoNormal.png')"
                                max-height="200"
                                max-width="240"
                            ></v-img>
                        </v-card-title>
                        <v-card-text>
                            <v-alert
                                dense
                                :type="error.tipo"
                                v-model="error.estado"
                            >
                                {{ error.mensaje }}
                            </v-alert>

                            <v-text-field
                                v-model="datosRestablecer.correoElectronico"
                                :rules="[
                                    (v) => !!v || 'Este campo es obligatorio',
                                ]"
                                id="text-correo"
                                label="Correo electrónico"
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
                                outlined
                                color="primary"
                                @click="restablecerContrasena"
                            >
                                Restablecer contraseña
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { ControladorRestablecerContrasena } from "@/sesion/infraestructura/controlador/ControladorRestablecerContrasena";
import Vue from "vue";

/*
   correoElectronico: "test@test.com",
                contraseña: "123456QAZwsx",
*/
export default Vue.extend({
    data() {
        return {
            formValido: true,
            estaCargando: false,
            datosRestablecer: {
                correoElectronico: "",
            },
            error: {
                estado: false,
                mensaje: "",
                tipo: "error",
            },
        };
    },
    methods: {
        restablecerContrasena() {
            if (this.validar()) {
                const controlador =
                    ControladorRestablecerContrasena.inicialiar();

                const respuestaCU = controlador.ejecutarServicio({
                    email: this.datosRestablecer.correoElectronico,
                });

                this.error.estado = false;
                this.estaCargando = true;

                respuestaCU
                    .then((respuesta) => {
                        if (respuesta.esExitoso) {
                            this.error.estado = true;
                            this.error.tipo = "success";
                            this.error.mensaje =
                                "¡Revisar tu correo electrónico!";

                            //Redirige a inicio
                            setTimeout(() => {
                                this.$router.replace({ name: "InicioSesion" });
                            }, 3000);
                        } else {
                            this.error.estado = true;
                            this.error.tipo = "error";
                            this.error.mensaje = <string>respuesta.error;
                        }
                    })
                    .catch((e) => {
                        //Error faltal
                        console.error("Erro faltal, no debió pasar", e);

                        this.error.estado = true;
                        this.error.tipo = "error";
                        this.error.mensaje = "¡Ha ocurrido un error!";
                    })
                    .finally(() => {
                        this.estaCargando = false;
                    });
            }
        },
        validar(): boolean {
            interface VForm extends HTMLFormElement {
                validate(): boolean;
            }

            if (this.$refs.formRestablecer != undefined) {
                const formRestablecer = this.$refs.formRestablecer as VForm;
                return formRestablecer.validate();
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
