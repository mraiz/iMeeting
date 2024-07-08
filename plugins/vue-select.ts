import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.component("v-select", vSelect);
});
