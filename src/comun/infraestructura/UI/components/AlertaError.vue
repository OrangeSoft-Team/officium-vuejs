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
            @click="snackbar = false"
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
    },
    watch: {
        snackbar(newVal) {
            if (newVal) {
                this.$props.snackbar = !this.$props.snackbar;
                this.$emit("alertfin");
            }
        }
    }
});
</script>

<style></style>
