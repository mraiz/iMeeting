<template>
  <transition v-if="modalCtrl" name="modal">
    <div
      class="modal-mask"
      :style="{
        zIndex: styleProps.zIndex,
      }"
    >
      <div id="body-modal" class="modal-wrapper" @click="closeModal($event)">
        <div
          id="wrapper-modal"
          class="modal-container position-relative"
          :style="{
            ...styleProps,
            maxHeight: styleProps.maxHeight || '90vh',
            overflowY: styleProps.overflowY || 'auto',
          }"
        >
          <div :style="{ padding: styleProps.padding || '1.5rem' }">
            <div class="d-flex justify-content-between">
              <slot name="header">
                <p
                  slot="header"
                  class="fs-16 fw-bold capitalize"
                  :class="calculateTclass"
                >
                  {{ title }}
                </p>
              </slot>

              <i
                v-if="useClose"
                class="bi bi-x fs-20 pointer icon-close"
                @click="$emit('close')"
              ></i>
            </div>
            <slot name="body"></slot>
          </div>
          <div
            v-if="useFooter"
            class="py-3 px-3 bg-white"
            style="bottom: -16; z-index: 10"
            :class="{ 'position-sticky': isSticky }"
          >
            <slot name="footer">
              <div class="modal-footer-is mt-2">
                <button v-if="isLoading" class="btn is-btn b-grey-2 fs-14 me-3">
                  Ya
                </button>
                <button
                  v-else
                  class="btn is-btn b-green fs-14 me-3"
                  @click="$emit('submit')"
                >
                  Ya
                </button>
                <button
                  class="btn is-btn b-green fs-14"
                  @click="$emit('close')"
                >
                  Tidak
                </button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({
  modalCtrl: {
    type: Boolean,
  },
  styleProps: {
    type: Object,
    default: () => {
      return {};
    },
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: () => {
      return "";
    },
  },
  useClose: {
    type: Boolean,
    default: () => true,
  },
  isSticky: {
    type: Boolean,
    default: () => true,
  },
  useFooter: {
    type: Boolean,
    default: () => true,
  },
});

const emit = defineEmits(["doClose"]);

const calculateTclass = computed(() => {
  let lowerTitle = props.title.toLowerCase();
  if (lowerTitle == "error") {
    return "t-red";
  } else if (lowerTitle == "warning") {
    return "t-yellow";
  } else {
    return "t-green";
  }
});

const closeModal = (e: any) => {
  const target = e.target;
  let id = target.id;
  if (id === "body-modal") emit("doClose", false);
};
</script>
<style scoped>
.icon-close {
  position: absolute;
  top: 3px;
  right: 2px;
}
.modal-mask {
  position: fixed;
  z-index: 1039;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.modal-footer-is {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  position: relative !important;
}

@media only screen and (max-width: 768px) {
  #wrapper-modal {
    width: 95% !important;
  }
}
</style>
