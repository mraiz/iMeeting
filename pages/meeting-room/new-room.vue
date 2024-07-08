<template>
  <div class="container-fluid py-4">
    <div class="d-flex flex-nowrap">
      <div
        class="me-3 d-flex align-items-center"
        @click="router.push('/meeting-room')"
      >
        <div class="button-back">
          <i class="bi bi-chevron-left"></i>
        </div>
      </div>
      <div>
        <div class="title-page grey-1 fs-28 fw-700">Ruang Meeting</div>
        <partials-breadcrumb :crumbs="route.meta.breadcrumb" />
      </div>
    </div>

    <div class="wrapper-form">
      <div class="meeting-room">
        <div class="grey-1 fw-500">Informasi Ruang Meeting</div>

        <div class="row mt-3">
          <div class="col-lg-4 fs-14">
            <div class="mb-1 grey-1">Unit</div>
            <partials-skeleton-loading
              type="input"
              v-if="pendingUnit"
              width="250"
              :usePercent="false"
            ></partials-skeleton-loading>
            <v-select
              v-else
              v-model="formRoom.unit"
              :clearable="true"
              class="select d-inline-block input-field"
              label="officeName"
              :options="optionsUnit"
              :value="optionsUnit.id"
              :reduce="(e) => e.id"
              placeholder="Pilih Unit"
            >
              <template #list-header>
                <div v-if="error_unit" class="t-red fs-12 mx-3">
                  Gagal memuat data,
                  <span class="fw-600 mt-2 pointer" @click="getUnit()"
                    >muat ulang?</span
                  >
                </div>

                <div
                  v-else
                  style="
                    text-align: end;
                    margin-top: 7px;
                    color: #12852d;
                    font-style: italic;
                  "
                >
                  <span class="pointer fw-600 pe-3 fs-14" @click="getUnit()">
                    <i class="bi bi-arrow-counterclockwise"></i>
                  </span>
                </div>
              </template>
            </v-select>
          </div>

          <div class="col-lg-4 fs-14">
            <div class="mb-1 grey-1">Ruang Meeting</div>
            <partials-skeleton-loading
              type="input"
              v-if="pendingRoom"
            ></partials-skeleton-loading>
            <v-select
              v-else
              v-model="formRoom.room"
              :clearable="true"
              :disabled="!formRoom.unit"
              class="select d-inline-block input-field"
              label="roomName"
              :options="optionsRoom.filter((data: {id: string}) => data.officeId == formRoom.unit)"
              :value="optionsRoom.id"
              :reduce="(e) => e.id"
              placeholder="Pilih Ruang Meeting"
            >
              <template #list-header>
                <div v-if="error_room" class="t-red fs-12 mx-3">
                  Gagal memuat data,
                  <span class="fw-600 mt-2 pointer" @click="getRoom()"
                    >muat ulang?</span
                  >
                </div>

                <div
                  v-else
                  style="
                    text-align: end;
                    margin-top: 7px;
                    color: #12852d;
                    font-style: italic;
                  "
                >
                  <span class="pointer fw-600 pe-3 fs-14" @click="getRoom()">
                    <i class="bi bi-arrow-counterclockwise"></i>
                  </span>
                </div>
              </template>
            </v-select>
          </div>
        </div>

        <div class="mt-3">
          <div class="mb-1 grey-1">Kapasitas</div>
          <input
            v-model="capacity"
            type="text"
            class="input"
            disabled
            readonly
          />
        </div>
      </div>

      <hr style="margin-top: 35px" />

      <div class="meeting-information">
        <div class="grey-1 fw-500">Informasi Rapat</div>

        <div class="row mt-3">
          <div class="col-lg-3 mb-3">
            <div class="mb-1 fs-14 grey-1">Tanggal Rapat*</div>

            <v-date-picker
              v-model="formMeeting.date"
              :mode="'single'"
              color="green"
              :masks="{ L: 'DD MMMM YYYY' }"
              :disabled-dates="disabledDates"
              :popover="{ placement: 'top', visibility: 'click' }"
            >
              <template #default="{ inputValue, inputEvents }">
                <div class="is-input-group position-relative">
                  <input
                    type="text"
                    :value="inputValue"
                    class="input pointer date-picker fs-14 w-100"
                    placeholder="Pilih Tanggal"
                    readonly
                    v-on="inputEvents"
                  />

                  <div class="position-absolute" style="left: 12px; top: 4px">
                    <span
                      ><img src="~/assets/images/calendar.svg" alt="icon"
                    /></span>
                  </div>
                </div>
              </template>
            </v-date-picker>
          </div>

          <div class="col-lg-3 mb-3">
            <div class="mb-1 fs-14 grey-1">Waktu Mulai</div>
            <vue-timepicker
              v-model="formMeeting.start_time"
              :minute-label="'Minute'"
              :hour-label="'Hour'"
              hide-clear-button
              auto-scroll
              :hour-range="setHourRange('start').hour"
              :minute-range="setHourRange('start').minute"
              placeholder="Pilih Waktu Mulai"
              class="select w-100"
              input-class="select form-control fs-14 w-100 px-3"
              @open="isOpenTime.start = true"
              @close="isOpenTime.start = false"
            >
            </vue-timepicker>
          </div>

          <div class="col-lg-3 mb-3">
            <div class="mb-1 fs-14 grey-1">Waktu Selesai</div>
            <vue-timepicker
              v-model="formMeeting.end_time"
              :minute-label="'Minute'"
              :hour-label="'Hour'"
              hide-clear-button
              auto-scroll
              :hour-range="setHourRange('end').hour"
              :minute-range="setHourRange('end').minute"
              placeholder="Pilih Waktu Selesai"
              class="select w-100"
              :disabled="!formMeeting.start_time.HH"
              input-class="select form-control fs-14 w-100 px-3"
              @open="isOpenTime.end = true"
              @close="isOpenTime.end = false"
            >
            </vue-timepicker>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-lg-3 mb-3">
            <div class="mb-1 fs-14 grey-1">Jumlah Peserta</div>
            <input
              v-model="formMeeting.participant"
              type="number"
              class="input fs-14 w-100"
              placeholder="Masukkan Jumlah Peserta"
            />
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-lg-3 mb-3">
            <div class="mb-1 fs-14 grey-1">Jenis Konsumsi</div>
            <template v-if="pendingKonsumsi">
              <partials-skeleton-loading
                v-for="i in 3"
                width="50"
                class="my-2"
              ></partials-skeleton-loading>
            </template>
            <template v-else>
              <partials-error-message
                v-if="error_konsumsi?.message"
                :error-data="{
                  code: error_konsumsi?.statusCode,
                  message: error_konsumsi?.message,
                }"
                @getData="getKonsumsi()"
              ></partials-error-message>

              <b-form-checkbox-group v-else v-model="selectedKonsumsi" stacked>
                <b-form-checkbox
                  v-for="(item, idx) in listKonsumsi"
                  :id="`checkbox-${item.id}`"
                  :key="idx"
                  :value="item.id"
                  class="fs-14 d-block"
                >
                  <span class="pointer">{{ item.name }}</span>
                </b-form-checkbox>
              </b-form-checkbox-group>
            </template>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-lg-3 mb-3">
            <div class="mb-1 fs-14 grey-1">Nominal Konsumsi</div>
            <div class="position-relative d-flex flex-nowrap">
              <div class="label-currency">Rp.</div>
              <input
                v-model="totalConsumption"
                type="number"
                class="input fs-14 w-100"
                placeholder="Masukkan Nominal Konsumsi"
                readonly
              />
            </div>
          </div>
        </div>

        <hr />

        <div class="d-flex flex-nowrap justify-content-end">
          <div
            class="d-flex align-items-center grey-1 me-3 fs-14 pointer"
            @click="router.push('/meeting-room')"
          >
            Batal
          </div>
          <button
            class="btn button-save fs-14"
            :disabled="disableSave"
            @click="doSave()"
          >
            Simpan
            <b-spinner v-if="loadingSave" label="Spinning" small></b-spinner>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "New Roow",
  breadcrumb: [
    { path: "/meeting-room", label: "Ruang Meeting" },
    { path: "", label: "Pesan Ruangan" },
  ],
});

const route = useRoute();
const router = useRouter();
const { $showPopup } = useNuxtApp();

// Info Ruang Meeting
interface roomInformation {
  unit: string;
  room: string;
}
const formRoom = reactive<roomInformation>({
  unit: "",
  room: "",
});
watch(
  formRoom,
  (val: { unit: string }) => {
    if (!formRoom.unit) formRoom.room = "";
  },
  { deep: true, immediate: true }
);

const optionsUnit = ref<any[]>([]);
const endpointUnit = ref<string>(
  "https://6666c7aea2f8516ff7a4e261.mockapi.io/api/dummy-data/masterOffice"
);
const {
  data: data_unit,
  error: error_unit,
  pending: pendingUnit,
  refresh: getUnit,
} = useAsyncData(
  "data_unit",
  async () => {
    const res = await $fetch(endpointUnit.value);
    optionsUnit.value = res;
    return res;
  },
  {
    getCachedData(key) {
      return null;
    },
  }
);

const optionsRoom = ref<any[]>([]);
const endpointRoom = ref<string>(
  "https://6666c7aea2f8516ff7a4e261.mockapi.io/api/dummy-data/masterMeetingRooms"
);
const capacity = computed(() => {
  let result: number = 0;
  if (formRoom.room)
    result = optionsRoom.value.find(
      (item: { id: string }) => item.id == formRoom.room
    )?.capacity;
  return result;
});
const {
  data: data_room,
  error: error_room,
  pending: pendingRoom,
  refresh: getRoom,
} = useAsyncData(
  "data_room",
  async () => {
    const res = await $fetch(endpointRoom.value);
    optionsRoom.value = res;
    return res;
  },
  {
    getCachedData(key) {
      return null;
    },
  }
);
// End

// Info Rapat
interface meetingInformation {
  date: string;
  start_time: { HH: string; mm: string };
  end_time: { HH: string; mm: string };
  participant: number;
}

const formMeeting = reactive<meetingInformation>({
  date: new Date(),
  start_time: { HH: "", mm: "" },
  end_time: { HH: "", mm: "" },
  participant: null,
});
const isOpenTime = reactive({
  start: false,
  end: false,
});

watch(
  formMeeting,
  (val: Record<string, any>) => {
    const { start_time, end_time, participant } = val;

    if (participant > capacity.value) {
      $showPopup({
        status: true,
        type: "warning",
        title: "Perhatian",
        message: "Jumlah peserta tidak boleh melebihi kapasitas ruangan",
      });
      formMeeting.participant = capacity.value;
    }

    if (start_time.HH && start_time.mm && end_time.HH && end_time.mm) {
      selectedKonsumsi.value = [];
      const startHour = parseInt(start_time.HH, 10);
      const startMinutes = parseInt(start_time.mm, 10);
      const endHour = parseInt(end_time.HH, 10);
      const endMinutes = parseInt(end_time.mm, 10);

      const startTime = startHour * 60 + startMinutes;
      const endTime = endHour * 60 + endMinutes;

      // batas waktu dalam menit
      const snackSiangThreshold = 11 * 60; // 660 menit (11:00)
      const makanSiangStartThreshold = 11 * 60; // 660 menit (11:00)
      const makanSiangEndThreshold = 14 * 60; // 840 menit (14:00)
      const snackSoreThreshold = 14 * 60; // 840 menit (14:00)

      const consumptions = [];
      // Handler Snack Siang
      if (startTime < snackSiangThreshold || endTime < snackSiangThreshold) {
        let result = listKonsumsi.value.find(
          (item: { name: string }) => item.name === "Snack Siang"
        );
        if (result && !selectedKonsumsi.value.includes(result.id)) {
          consumptions.push(result.id);
        }
      }

      // Handler Makan Siang
      if (
        (startTime < makanSiangEndThreshold &&
          endTime >= makanSiangStartThreshold) ||
        (endTime <= makanSiangEndThreshold &&
          startTime >= makanSiangStartThreshold)
      ) {
        let result = listKonsumsi.value.find(
          (item: { name: string }) => item.name === "Makan Siang"
        );
        if (result && !selectedKonsumsi.value.includes(result.id)) {
          consumptions.push(result.id);
        }
      }

      // Handler Snack Sore
      if (endTime > snackSoreThreshold || startTime > snackSoreThreshold) {
        let result = listKonsumsi.value.find(
          (item: { name: string }) => item.name === "Snack Sore"
        );
        if (result && !selectedKonsumsi.value.includes(result.id)) {
          consumptions.push(result.id);
        }
      }

      selectedKonsumsi.value = [
        ...new Set([...selectedKonsumsi.value, ...consumptions]),
      ];
    }
  },
  { deep: true, immediate: true }
);

const selectedKonsumsi = ref<string[]>([]);
const listKonsumsi = ref<any[]>([]);
const endpointKonsumsi = ref<string>(
  "https://6686cb5583c983911b03a7f3.mockapi.io/api/dummy-data/masterJenisKonsumsi"
);
const totalConsumption = computed(() => {
  if (!formMeeting.participant) {
    return 0;
  }
  const prices = selectedKonsumsi.value
    .map((id) => {
      const item = listKonsumsi.value.find((item) => item.id === id);
      return item ? item.maxPrice : 0;
    })
    .filter((price) => price !== null && price !== undefined);

  const totalCost = prices.reduce((sum, price) => sum + price, 0);
  return formMeeting.participant * totalCost;
});

const {
  data: data_konsumsi,
  error: error_konsumsi,
  pending: pendingKonsumsi,
  refresh: getKonsumsi,
} = useAsyncData(
  "data_konsumsi",
  async () => {
    const res = await $fetch(endpointKonsumsi.value);
    listKonsumsi.value = res;
    return res;
  },
  {
    getCachedData(key) {
      return null;
    },
  }
);

const disabledDates = computed(() => {
  const today: string = new Date();
  today.setHours(0, 0, 0, 0);
  const dates: string[] = [];
  for (let d = new Date(1970, 0, 1); d < today; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }
  return dates;
});

const setHourRange = (type: string) => {
  const result = { hour: [], minute: [] } as Record<string, any>;
  if (type == "start") {
    // generate jam
    let batasJam = !formMeeting.end_time.HH
      ? 24
      : parseInt(formMeeting.end_time.HH);

    for (let i = 0; i <= batasJam; i++) {
      result.hour.push(i);
    }

    // generate menit
    if (formMeeting.start_time.HH === formMeeting.end_time.HH) {
      let batasMenit = !formMeeting.end_time.mm
        ? 60
        : parseInt(formMeeting.end_time.mm);

      for (let i = 0; i < batasMenit; i++) {
        result.minute.push(i);
      }
    } else {
      result.minute.push([0, 59]);
    }
  } else {
    // generate jam
    let batasJam = !formMeeting.start_time.HH
      ? 24
      : parseInt(formMeeting.start_time.HH);
    for (let i = batasJam; i < 24; i++) {
      result.hour.push(i);
    }

    // generate menit
    if (formMeeting.start_time.HH === formMeeting.end_time.HH) {
      let batasMenit = !formMeeting.start_time.mm
        ? 60
        : parseInt(formMeeting.start_time.mm);

      for (let i = batasMenit + 1; i < 60; i++) {
        result.minute.push(i);
      }
    } else {
      result.minute.push([0, 59]);
    }
  }

  return result;
};

const disableSave: boolean = computed(() => {
  if (
    !formRoom.unit ||
    !formRoom.room ||
    !formMeeting.date ||
    !formMeeting.start_time.HH ||
    !formMeeting.start_time.mm ||
    !formMeeting.end_time.HH ||
    !formMeeting.end_time.mm ||
    !formMeeting.participant
  )
    return true;
  return false;
});

const loadingSave = ref<boolean>(false);
const doSave = () => {
  loadingSave.value = true;
  setTimeout(() => {
    $showPopup({
      status: true,
      type: "success",
      title: "Sukses",
      message: "Berhasil memesan ruangan meeting",
    });
    loadingSave.value = false;
    router.push("/meeting-room");
  }, 1000);
};
</script>

<style scoped lang="scss">
.button-back {
  background-color: #4a8394;
  padding: 8px 12px;
  border-radius: 8px;
  color: #fff;
}

.wrapper-form {
  box-shadow: 0px 4px 20px 0px #6a6a6a1a;
  padding: 20px 28px;
  margin-top: 30px;
}

.date-picker {
  padding-left: 35px;
}

.label-currency {
  position: relative;
  z-index: 2;
  background-color: #e5e7e9;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  width: 45px;
  padding: 8px;
  margin-right: -4px;
}

.button-save {
  background-color: #4a8394;
  padding: 8px 12px;
  border-radius: 8px;
  color: #fff;
}
</style>
