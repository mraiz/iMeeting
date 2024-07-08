<template>
  <div id="popup">
    <modal
      :modal-ctrl="optionInfo.status"
      :style-props="{
        width: '360px',
        height: 'auto',
        zIndex: '9999999',
      }"
      :use-close="false"
      @close="closeInfo"
      @doClose="closeInfo"
    >
      <template #header>
        <div></div>
      </template>
      <template #body>
        <div class="mt-3">
          <div class="d-flex justify-content-center">
            <i :class="icon" class="fs-36"></i>
          </div>
          <div class="mt-3 fs-20 fw-700 text-center">
            {{ optionInfo.title ?? defaultTitle }}!
          </div>
          <div
            class="fs-14 text-center"
            v-if="typeof optionInfo.message === 'string'"
          >
            {{ optionInfo.message }}
          </div>
          <div
            class="fs-14 text-center"
            v-if="typeof optionInfo.message === 'object'"
          >
            <template v-if="optionInfo?.message?.reason">
              <div class="fw-bold t-red mt-2">{{ t("Reason") }}:</div>
              <div>
                {{ optionInfo?.message?.reason }}
              </div>
            </template>

            <div
              class="fs-14 text-center mt-3"
              v-if="optionInfo.message?.description"
            >
              {{ optionInfo.message?.description }}
            </div>

            <div v-else class="text-start mt-3">
              <div>Mohon perbaiki inputan berikut:</div>
              <ul>
                <li
                  class="mt-1"
                  v-for="(err, key) in optionInfo.message"
                  :key="key"
                >
                  {{ typeof err === "string" ? err : err[0] }}
                </li>
              </ul>
            </div>
          </div>
          <div
            v-if="
              (Array.isArray(optionInfo.message) ||
                typeof optionInfo.message !== 'string') &&
              optionInfo.message.length > 0
            "
            class="mt-4"
          >
            <div>Mohon perbaiki inputan berikut:</div>
            <ul>
              <li
                class="mt-1"
                v-for="(err, key) in optionInfo.message"
                :key="key"
              >
                {{ typeof err === "string" ? err : err[0] }}
              </li>
            </ul>
          </div>
        </div>
      </template>

      <template #footer>
        <div>
          <div class="d-flex flex-nowrap justify-content-center">
            <button
              class="btn btn-block fs-14 btn-secondary"
              @click="closeInfo"
            >
              Ok
            </button>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "../../stores";

const props = defineProps({
  option: {
    type: Object,
    default: {
      status: false,
      title: "",
      type: "",
      message: "",
    },
  },
});

const emit = defineEmits(["close"]);
const mainStore = useMainStore();
const router = useRouter();

interface Info {
  status: boolean;
  title: string;
  type: string;
  message: string | object;
}

const optionInfo = computed(() => mainStore.stateShowInfo as Info);

const defaultTitle = computed(() => {
  if (optionInfo.value.type === "success") return "Sukses";
  else if (optionInfo.value.type === "error") return "Gagal";
  else if (optionInfo.value.type === "warning") return "Warning";
});
// methods

const closeInfo = () => {
  let state = {
    status: false,
    title: "",
    type: "",
    message: "",
  };

  mainStore.stateShowInfo = state;
};

const icon = computed(() => {
  if (optionInfo.value.type === "success")
    return "bi bi-check-circle-fill t-green";
  else if (optionInfo.value.type === "error")
    return "bi bi-x-circle-fill t-red";
  else if (optionInfo.value.type === "warning")
    return "bi bi-exclamation-circle-fill t-yellow";
  else return iconInfo;
});
</script>

<style scoped>
#popup .modal-mask {
  z-index: 2000 !important;
}
</style>
