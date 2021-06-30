<template>
    <v-snackbar
      v-model="snackbar"
    >
      {{ mensaje }}

      <template v-slot:action="{ attrs }">
            <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="cambiarEstadoSnackbar"
            >
            Close
            </v-btn>
      </template>
    </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";


export default Vue.extend({
    props: ["mensaje", "snackbar"],
    data() {
        return {
        };
    },
    methods: {
        cambiarEstadoSnackbar() {
            this.$props.snackbar = !this.$props.snackbar;
            this.$emit("alertfin");
        },
        cambiarEstadoDesdePadre() {
            this.$props.snackbar = !this.$props.snackbar;
        }
    },
});
</script>

<style></style>
