import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const vuetifyOpts = {
    rtl: false,
    theme: {
        dark: false,
        themes: {
            light: {
                primary: "#5D60F5",
                accent: "#2E2F37",
                secondary: "#00B592",
                success: "#4CAF50",
                info: "#2196F3",
                warning: "#FFC857",
                error: "#E65F5C",
            },
        },
    },
};

export default new Vuetify(vuetifyOpts);
