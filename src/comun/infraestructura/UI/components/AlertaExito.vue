<template>
    <v-alert
      v-model="alertaExito"
      border="left"
      close-text="Cerrar"
      type="success"
    >
      {{ mensaje }}
    </v-alert>
</template>

<script lang="ts">
import Vue from "vue";


export default Vue.extend({
    props: ["mensaje", "alertaExito"],
    data() {
        return {
        };
    },
    methods: {
        
    },
});
</script>

<style></style>
