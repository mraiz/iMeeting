<template>
  <div>
    <navbar></navbar>

    <div class="sidenav">
      <div
        class="side-menu"
        :class="{ active: route.name.includes(menu.id) }"
        v-for="(menu, idx) in sidemenus"
        :key="idx"
        @click="router.push(menu.id == 'index' ? '/' : `/${menu.id}`)"
      >
        <i :class="`${menu.classIcon} fs-22`"></i>
      </div>
    </div>

    <div class="main-content">
      <div class="container-fluid py-3">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

interface MenuItem {
  id: string;
  name: string;
  classIcon: string;
}

const sidemenus = ref<MenuItem[]>([
  {
    id: "index",
    name: "Home",
    classIcon: "bi bi-house-door",
  },
  {
    id: "meeting-room",
    name: "Meeting Room",
    classIcon: "bi bi-file-earmark",
  },
]);
</script>

<style scoped lang="scss">
.sidenav {
  box-shadow: 4px 0px 20px 0px #6a6a6a1a;
  padding: 20px 15px;
  position: fixed;
  left: 0;
  top: 70px;
  bottom: 0;
  background-color: #fff;
  z-index: 99;

  .side-menu {
    padding: 5px 10px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: 0.3s all;
    &.active {
      background-color: #4a8394;
      color: #fff;
      border-radius: 8px;
    }
  }
}

.main-content {
  margin-top: 70px;
  margin-left: 70px;
}
</style>
