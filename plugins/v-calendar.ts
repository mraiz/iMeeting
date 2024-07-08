import { Calendar, DatePicker } from "v-calendar";
import "v-calendar/style.css";

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.component("VCalendar", Calendar);
  vueApp.component("v-date-picker", DatePicker);
});
