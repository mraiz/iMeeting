import { useMainStore } from "../stores";

export default defineNuxtPlugin(({ vueApp }) => {
  const mainStore = useMainStore();
  interface Info {
    status: boolean;
    title: string;
    type: string;
    message: string | object;
  }

  const showPopup = (state: Info) => {
    mainStore.stateShowInfo = state;
  };

  return {
    provide: {
      showPopup: showPopup,
    },
  };
});
