import VueTimepicker from 'vue3-timepicker'
import 'vue3-timepicker/dist/VueTimepicker.css'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.component('vue-timepicker', VueTimepicker)
})
