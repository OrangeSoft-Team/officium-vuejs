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
                <v-row justify="space-between" class="pa-1">
                    <span class="text-h5">Detalle del trabajo</span>
                    <v-btn icon @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn></v-row
                >
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container>
                    <v-row v-show="estaCargando">
                        <v-progress-linear
                            indeterminate
                            color="primary"
                        ></v-progress-linear
                    ></v-row>
                    <v-list three-line subheader>
                        <v-row>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            ><strong
                                                >Título</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title>{{
                                            trabajo.titulo
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            ><strong
                                                >Fecha de inicio</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title>{{
                                            trabajo.fechaInicioTrabajo
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            ><strong
                                                >Cargo</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title>{{
                                            trabajo.cargo
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            ><strong
                                                >Estatus</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title>{{
                                            trabajo.estatus
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            ><strong
                                                >Nombres del empleado</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title>{{
                                            trabajo.nombreCompletoEmpleado
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            ><strong
                                                >Dirección</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title
                                            >{{
                                            trabajo.direccionEmpleado
                                        }}</v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            ><strong
                                                >Duración</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title
                                            >{{
                                                trabajo.valorDuracion
                                            }}
                                            {{
                                                trabajo.escalaDuracion
                                            }}</v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            ><strong
                                                >Zona geográfica</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title>{{
                                            trabajo.nombreCiudad
                                        }}, {{
                                            trabajo.nombreEstado
                                        }}, {{
                                            trabajo.nombrePais
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            ><strong
                                                >Correo del empleado</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title
                                            >{{
                                                trabajo.correoElectronicoEmpleado
                                            }}</v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            ><strong
                                                >Número telefónico</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title>{{
                                            trabajo.numeroTelefonicoEmpleadoEmpleado
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            ><strong
                                                >Turno de trabajo</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title
                                            >{{
                                                trabajo.turnoTrabajo
                                            }}</v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            ><strong
                                                >Fecha de culminación</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title>{{
                                            trabajo.fechaCulminacionTrabajo
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                        </v-row>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title
                                    ><strong
                                        >Descripción</strong
                                    ></v-list-item-title
                                >
                                <v-list-item-title>{{
                                    trabajo.descripcion
                                }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary darken-1" text @click="dialog = false">
                    Cerrar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { ControladorDetalleTrabajo } from "../../../../trabajo/infraestructura/controlador/ControladorDetalleTrabajo";
//Importamos la interface del DTO para que el objeto a mostrar en la tabla
//sea del mismo tipo que el que se trae en la respuesta del CU
import { TrabajoEmpresaResumidoDTO } from "../../../../trabajo/aplicacion/dto/TrabajoEmpresaDTO";

export default Vue.extend({
    props: ["idTrabajo"],
    data() {
        return {
            estaCargando: true,
            trabajo: {} as TrabajoEmpresaResumidoDTO,
            dialog: false,
        };
    },

    methods: {
        obtenerDetalle() {
            console.log("[ID  detalle] ", this.$props.idTrabajo);
            //Inicializamos el controlador
            const cuAEjecutar = ControladorDetalleTrabajo.inicializar();

            const respuestaCU = cuAEjecutar.ejecutarCU({
                uuid_trabajo: this.$props.idTrabajo,
            });
            respuestaCU
                .then((data) => {
                    if (data.esExitoso) {
                        //Cambiamos el estado

                        this.estaCargando = false;

                        //Actualizamos
                        this.trabajo = data.getValue();

                        console.log("[DETALLE] ", this.trabajo);
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
