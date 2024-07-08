<template>
  <div class="w-100">
    <div
      class="d-flex justify-content-center"
      :style="usePadding ? 'margin: 80px 0px' : ''"
    >
      <div class="text-center">
        <i class="bi bi-exclamation-triangle-fill fs-32"></i>

        <div class="fs-16 mt-1">
          <div
            v-if="
              props.errorData &&
              props.errorData.message !== '' &&
              props.errorData.code >= 500
            "
          >
            Mohon maaf atas ketidaknyamanan ini!
            <br />
            Silakan coba lagi sebentar lagi
          </div>

          <span
            v-else-if="
              props.errorData &&
              props.errorData.message !== '' &&
              props.errorData.code == 404
            "
          >
            Permintaan Anda tidak ditemukan!
          </span>

          <span
            v-else-if="
              props.errorData &&
              props.errorData.message !== '' &&
              props.errorData.code == 403
            "
          >
            <template v-if="props.messageOnly">
              {{ props.errorData.message }}
            </template>
            <template v-else>
              Anda tidak memiliki akses untuk melihat ini
            </template>
          </span>

          <span v-else>
            {{ props.errorData.message ?? "Tidak ada data untuk ditampilkan" }}
          </span>
        </div>

        <div
          v-if="
            props.errorData &&
            props.errorData.message !== '' &&
            props.errorData.code !== 403 &&
            props.errorData.code !== 400
          "
          class="btn btn-sm btn-action-back t-primary fw-500 mt-3 fs-14"
          @click="reloadData"
        >
          Muat Ulang
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  errorData: {
    type: Object,
    default: () => {},
  },
  messageOnly: {
    type: Boolean,
    default: true,
  },
  usePadding: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["getData"]);

const reloadData = () => {
  emit("getData");
};
</script>
