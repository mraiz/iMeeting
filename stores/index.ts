import { defineStore } from "pinia";

export const useMainStore = defineStore("setup-common", () => {
  const stateShowInfo = reactive({
    show: false,
    title: "",
    type: "",
    message: "",
  });

  const showInfo = computed(() => stateShowInfo);

  return {
    stateShowInfo,
    showInfo,
  };
});
