<template>
  <nav class="navbar text-white">
    <div class="d-flex w-100 flex-nowrap align-items-center">
      <div class="logo">
        <img src="@/assets/images/logo.png" width="40" alt="logo" />
        <span class="item-nav fw-700">iMeeting</span>
      </div>

      <div class="ms-auto pointer" v-if="route.name == 'meeting-room-new-room'">
        <div class="btn-contact d-flex flex-nowrap">
          <img
            src="@/assets/images/toak.svg"
            alt="icon toak"
            width="18"
            class="me-2"
          />
          <div class="d-flex align-items-center">
            <span class="fs-14"> Kontak Aduan </span>
          </div>
        </div>
      </div>

      <div
        class="pointer item-nav"
        :class="{ 'ms-auto': route.name !== 'meeting-room-new-room' }"
      >
        <i class="bi bi-bell fs-20"></i>
      </div>

      <div class="wrapper-user-profile item-nav">
        <img :src="user.photo" alt="user profile" />
      </div>

      <div class="username item-nav fw-600 fs-14 pointer">
        {{ user.name ?? "User" }}
        <i class="bi bi-chevron-down ms-2"></i>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import userImage from "@/assets/images/default-user.png";

const user = {
  photo: userImage,
  name: "John Doe",
};

const route = useRoute();
</script>

<style scoped lang="scss">
.navbar {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(89.98deg, #18a2ba 14.11%, #296377 86.26%);
  padding: 8px 24px;

  .item-nav {
    margin-left: 20px;
  }

  .wrapper-user-profile {
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
}

.btn-contact {
  background-color: #3d7d8f;
  padding: 8px 12px;
  border-radius: 8px;
}
</style>
