<template>
  <div
    :style="`width: ${props.width}${usePercent ? '%' : 'px'} !important; height: ${
      props.height
    }px !important`"
  >
    <div
      class="skeleton"
      :class="`skeleton-${props.type}`"
      :style="`height: ${props.height}px !important`"
    ></div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  width: {
    type: [Number, String],
    default: 100
  },
  height: {
    type: String,
    default: '0.9 rem !important'
  },
  usePercent: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="scss">
.skeleton {
  animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}

.skeleton-text {
  width: 100%;
  height: 0.9rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
}

.skeleton-input {
  width: 100%;
  height: 2rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
}

.skeleton-card {
  width: 100%;
  height: 200px;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
}

.skeleton-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50% !important;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
}

.skeleton-mini-box {
  width: 80px;
  height: 80px;
}

.skeleton-avatar-big {
  width: 60px;
  height: 60px;
  border-radius: 50% !important;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
}
</style>
