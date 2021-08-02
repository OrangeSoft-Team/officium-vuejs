<template>
    <v-dialog v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                depressed
                rounded
                color="primary"
                title="Detalle de la oferta laboral"
                small
                v-bind="attrs"
                v-on="on"
                v-on:click="obtenerDetalle"
            >
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-card-title>
                <v-row justify="space-between" class="pa-1">
                    <span class="text-h5">Detalle de la oferta laboral</span>
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
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title
                                    ><h2>
                                        {{ ofertaLaboral.titulo }}
                                    </h2></v-list-item-title
                                >
                            </v-list-item-content>
                        </v-list-item>
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
                                            ofertaLaboral.cargo
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            ><strong
                                                >Número de vacantes</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title>{{
                                            ofertaLaboral.numeroVacantes
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
                                                >Fecha de publicación</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title>{{
                                            ofertaLaboral.fechaPublicacion
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            ><strong
                                                >Fecha de modificación</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title
                                            >{{
                                                ofertaLaboral.fechaModificacion
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
                                                >Sueldo</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title
                                            >{{
                                                ofertaLaboral.sueldo
                                            }}$</v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            ><strong
                                                >Requisitos especiales</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title>{{
                                            ofertaLaboral.requisitosEspeciales
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
                                                >Duración estimada</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title
                                            >{{
                                                ofertaLaboral.duracionEstimadaValor
                                            }}
                                            {{
                                                ofertaLaboral.duracionEstimadaEscala
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
                                                >Turno de trabajo</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title>{{
                                            ofertaLaboral.turnoTrabajo
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
                                                >Estatus</strong
                                            ></v-list-item-title
                                        >
                                        <v-list-item-title
                                            >{{
                                                ofertaLaboral.estado
                                            }}</v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col cols="6" sm="6" md="6" lg="6" xl="6">

                            </v-col>
                        </v-row>
                        <v-row>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title
                                        ><strong
                                            >Descripción</strong
                                        ></v-list-item-title
                                    >
                                    <v-list-item-title>{{
                                        ofertaLaboral.descripcion
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-row>
                        <v-row>
                            <strong></strong>
                        </v-row>
                        <v-row>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title
                                        ><strong
                                            >Habilidades</strong
                                        ></v-list-item-title
                                    >
                                    <v-list-item-title>
                                        <v-simple-table>
                                <template v-slot:default>
                                <thead>
                                    <tr>
                                    <th class="text-left"><strong>
                                        Nombre
                                    </strong></th>
                                    <th class="text-left"><strong>
                                        Categoría
                                    </strong></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                    v-for="item in ofertaLaboral.habilidades"
                                    :key="item.uuid"
                                    >
                                    <td>{{ item.nombre }}</td>
                                    <td>{{ item.categoria }}</td>
                                    </tr>
                                </tbody>
                                </template>
                            </v-simple-table>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-row>
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
import { ControladorDetalleOfertaLaboral } from "../../../../ofertaLaboral/infraestructura/controlador/ControladorDetalleOfertaLaboral";
//Importamos la interface del DTO para que el objeto a mostrar en la tabla
//sea del mismo tipo que el que se trae en la respuesta del CU
import { OfertaLaboralEmpresaDTO } from "../../../../ofertaLaboral/aplicacion/dto/OfertaLaboralEmpresaDTO";

export default Vue.extend({
    props: ["uuid"],
    data() {
        return {
            estaCargando: true,
            ofertaLaboral: {} as OfertaLaboralEmpresaDTO,
            dialog: false,
        };
    },

    methods: {
        obtenerDetalle() {
            console.log("[ID  detalle] ", this.$props.uuid);
            //Inicializamos el controlador
            const cuAEjecutar = ControladorDetalleOfertaLaboral.inicializar();

            const respuestaCU = cuAEjecutar.ejecutarCU({
                idOfertaLaboral: this.$props.uuid,
            });
            respuestaCU
                .then((data) => {
                    if (data.esExitoso) {
                        //Cambiamos el estado

                        this.estaCargando = false;

                        //Actualizamos
                        this.ofertaLaboral = data.getValue();

                        console.log("[DETALLE] ", this.ofertaLaboral);
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
