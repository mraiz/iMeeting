<template>
  <div>
    <b-breadcrumb class="bg-transparent p-0">
      <b-breadcrumb-item
        v-for="(item, id) in data"
        :key="id"
        class="capitalize fs-14 item-breadcrum main-grey"
        :to="item.path ?? '#'"
      >
        {{ item.label }}
      </b-breadcrumb-item>
    </b-breadcrumb>
  </div>
</template>
<script setup>
const props = defineProps({
  crumbs: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

const data = ref(props.crumbs);
</script>

<style>
.item-breadcrumb {
  color: #9e9e9e;
}

.breadcrumb {
  margin-bottom: 0px !important;
}

.opacity-05 {
  opacity: 0.5;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: ">";
}
</style>
