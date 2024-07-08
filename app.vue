<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>

    <!-- Popup Info -->
    <partials-popup-info></partials-popup-info>
    <!-- End -->
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

useHead(() => ({
  title: `${route.meta.title ? route.meta.title : "iMeeting"}`,
}));
</script>

<style lang="scss"></style>
