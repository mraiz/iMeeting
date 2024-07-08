<template>
  <div class="container-fluid py-4">
    <div class="d-flex flex-nowrap">
      <div>
        <div class="title-page grey-1 fs-28 fw-700">Ruang Meeting</div>
        <partials-breadcrumb :crumbs="route.meta.breadcrumb" />
      </div>

      <div class="ms-auto d-flex align-items-center">
        <div
          class="button-add pointer"
          @click="router.push('meeting-room/new-room')"
        >
          <i class="bi bi-plus-lg"></i>
          <span class="ps-1 fs-14">Pesan Ruangan</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Ruang Meeting | iMeeting",
  breadcrumb: [{ path: "", label: "Ruang Meeting" }],
});

const router = useRouter();
const route = useRoute();
</script>

<style scoped>
.button-add {
  background-color: #4a8394;
  padding: 8px 12px;
  border-radius: 8px;
  color: #fff;
}
</style>
