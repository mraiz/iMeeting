<template>
  <div class="wrapper-dashboard container-fluid py-4">
    <div class="d-flex flex-nowrap">
      <img src="@/assets/images/gear.svg" width="32" alt="icon gear" />
      <span
        class="fw-700 fs-18 font-roboto ms-2 text-uppercase d-flex align-items-center"
        >Dashboard</span
      >
    </div>
    <hr />

    <!-- Filter -->
    <div class="mt-4">
      <div class="mb-1">Periode</div>
      <partials-skeleton-loading
        type="input"
        v-if="pending"
        width="250"
        :usePercent="false"
      ></partials-skeleton-loading>
      <v-select
        v-else
        id="period"
        v-model="selectedPeriod"
        :clearable="false"
        class="select d-inline-block input-field"
        label="name"
        :options="optionsPeriod"
        :value="optionsPeriod.id"
        :reduce="(e) => e.id"
        placeholder="Pilih pediode"
      ></v-select>
    </div>

    <!-- List Data -->
    <div class="wrapper-grid mt-4">
      <template v-if="pending">
        <div class="grid-item mb-3" v-for="box in 12" :key="box">
          <partials-skeleton-loading type="card"></partials-skeleton-loading>
        </div>
      </template>

      <template v-else>
        <partials-error-message
          v-if="error?.message"
          :error-data="{ code: error?.statusCode, message: error?.message }"
          @getData="refresh()"
        ></partials-error-message>

        <template v-else>
          <div class="grid-item mb-3" v-for="(data, idx) in summary" :key="idx">
            <div class="d-flex flex-nowrap mb-2">
              <img
                src="@/assets/images/icon-lightning.svg"
                alt="icon lightning"
              />
              <span class="d-flex align-items-center ms-2 main-grey">
                {{ data.officeName }}
              </span>
            </div>
            <div
              class="card-data mb-3 p-3 br-8"
              v-for="(detail, idx_dtl) in data.detailSummary"
              :key="idx_dtl"
            >
              <div class="name font-roboto fs-14 grey-2">
                {{ detail.roomName }}
              </div>
              <div class="wrapper-percentage mt-2">
                <div class="d-flex flex-nowrap font-inter">
                  <div class="w-70">
                    <div class="title fs-12 grey-secondary">
                      Persentase Pemakaian
                    </div>
                    <div class="value fw-700 fs-20">
                      {{ detail.averageOccupancyPerMonth }}%
                    </div>
                  </div>

                  <div class="w-30 d-flex justify-content-end">
                    <div class="position-relative">
                      <div
                        class="used-chart animate"
                        :style="
                          produceChart(
                            detail.averageOccupancyPerMonth,
                            '#00A3E9'
                          )
                        "
                      ></div>

                      <div
                        class="used-chart used-chart-shadow animate"
                        :style="produceChart(100, '#D9D9D9')"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="fs-12 grey-secondary">Nominal Konsumsi</div>
              <div class="fw-700 fs-20">
                Rp. {{ getConsumtionTotal(detail.totalConsumption) }}
              </div>

              <div class="wrapper-detail-consumtion mt-2">
                <div
                  class="mb-2"
                  v-for="(consum, id_cons) in detail.totalConsumption"
                  :key="id_cons"
                >
                  <div class="d-flex flex-nowrap">
                    <div class="d-flex align-items-center w-50 pe-1 fs-12">
                      {{ consum.name }}
                    </div>

                    <div class="w-50 ps-1 fs-12">
                      <div>{{ consum.totalPackage }}</div>
                      <div
                        class="line-package"
                        :style="produceStyle(consum.totalPackage)"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Dashboard | iMeeting",
});

const selectedPeriod = ref<string>("");
const optionsPeriod = ref<string[]>([]);
const endpoint = ref<string>(
  "https://6686cb5583c983911b03a7f3.mockapi.io/api/dummy-data/summaryBookings"
);
const summary = ref<string[]>([]);

watch(selectedPeriod, (val: string) => {
  if (!pending.value) {
    const result = list_summary.value.find(
      (item: { id: string }) => item.id == selectedPeriod.value
    );
    if (result.data) {
      summary.value = result.data;
    }
  }
});

const {
  data: list_summary,
  error,
  pending,
  refresh,
} = useAsyncData(
  "list_summary",
  async () => {
    const res = await $fetch(endpoint.value);
    optionsPeriod.value = res.map((item: { period: string; id: string }) => {
      return {
        id: item.id,
        name: item.period.replaceAll("-", " "),
      };
    });

    selectedPeriod.value = optionsPeriod.value[0].id;
    summary.value =
      res.find((item: { id: string }) => item.id == selectedPeriod.value)
        ?.data ?? [];
    return res;
  },
  {
    getCachedData(key) {
      return null;
    },
  }
);

const getConsumtionTotal = (data: any[]) => {
  const prices = data.map((item: { totalPrice: string }) =>
    parseInt(item.totalPrice, 10)
  );
  const result = prices.reduce((count, price) => count + price, 0);
  return result.toLocaleString("id-ID");
};

const produceStyle = (data: number) => {
  let percentage = (data / 1000) * 100;
  let roundedPercentage = Math.round(percentage);
  return `width: ${percentage}%`;
};

const produceChart = (data: number, color: string) => {
  return `--p: ${data}; --b: 8px; --c:${color}`;
};
</script>

<style lang="scss">
#period {
  .vs__dropdown-menu {
    width: 100% !important;
    background: #ecf9ff;
  }

  .vs__dropdown-toggle {
    min-width: 250px !important;
    border: 1px solid #00a3e9;
    border-radius: 8px;
    background: #ecf9ff;
  }
}
</style>

<style scoped lang="scss">
.wrapper-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 12em), 1fr));
  gap: 20px;
}

.card-data {
  background-color: #f2f2f2;

  .line-package {
    background-color: #00a3e9;
    border-radius: 2px;
    height: 8px;
  }
}

@property --p {
  syntax: "<number>";
  inherits: true;
  initial-value: 1;
}

.used-chart-shadow {
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1 !important;
}

.used-chart {
  --p: 20;
  --b: 22px;
  --c: darkred;
  --w: 40px;
  position: relative;
  z-index: 2;
  width: var(--w);
  aspect-ratio: 1;
  position: relative;
  display: inline-grid;
  margin: 5px;
  place-content: center;
  font-size: 25px;
  font-weight: bold;
  font-family: sans-serif;

  &:before,
  &:after {
    content: "";
    position: absolute;
    border-radius: 50%;
  }

  &:before {
    inset: 0;
    background: radial-gradient(farthest-side, var(--c) 98%, #0000) top/var(--b)
        var(--b) no-repeat,
      conic-gradient(var(--c) calc(var(--p) * 1%), #0000 0);
    -webkit-mask: radial-gradient(
      farthest-side,
      #0000 calc(99% - var(--b)),
      #000 calc(100% - var(--b))
    );
    mask: radial-gradient(
      farthest-side,
      #0000 calc(99% - var(--b)),
      #000 calc(100% - var(--b))
    );
  }

  &:after {
    inset: calc(50% - var(--b) / 2);
    background: var(--c);
    transform: rotate(calc(var(--p) * 3.6deg))
      translateY(calc(50% - var(--w) / 2));
  }
}

.animate {
  animation: p 1s 0.5s both;
}

@keyframes p {
  from {
    --p: 0;
  }
}
</style>
