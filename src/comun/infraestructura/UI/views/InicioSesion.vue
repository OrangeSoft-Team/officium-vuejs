<template>
    <v-container fill-height>
        <v-row no-gutters justify="center">
            <v-col align-self="center">
                <v-card>
                    <v-card-actions>
                        <v-btn
                            depressed
                            outlined
                            block
                            color="primary"
                            :to="{ name: 'Inicio' }"
                        >
                            Iniciar sesión
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style></style>
