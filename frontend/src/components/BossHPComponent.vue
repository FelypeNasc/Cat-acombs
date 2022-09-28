<template>
  <div class="w-72 flex-col p-1">
    <div class="bg-white rounded-md p-2">
      <h2 class="font-squirk text-blue-900 text-center">
        {{ bossStatus.name }}
      </h2>
      <div class="flex items-center">
        <div class="heart">
          <img src="../assets/icons/heart-icon.svg" />
        </div>
        <div class="windowsSlider flex justify-center items-center">
          <input
            v-model="percent"
            type="range"
            class="windowsSliderInput"
            min="0"
            :max="100"
          />
          <div
            class="windowsSliderProgress"
            :style="{
              width:
                (bossStatus.stats.currentHp / bossStatus.stats.maxHp) * 100 +
                '%',
            }"
          ></div>
        </div>
      </div>
    </div>
    <div class="h-60 w-60 flex justify-center m-6">
      <div>
        <img
          class="w-full"
          :src="`../src/assets/images/boss-${bossStatus.id}.png`"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BossHPComponent",
  props: {
    bossStatus: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      percent: 100,
    };
  },
  watch: {
    windowsSliderProgress() {
      return (this.percent = this.bossStatus.hpCurrent);
    },
  },
};
</script>

<style scoped>
.windowsSlider {
  height: 15px;
  width: 100%;
  border-radius: 10px;
  background: red;

  display: flex;
  align-items: center;
  justify-content: center;
}
.windowsSliderInput {
  -webkit-appearance: none;
  background: transparent;
  outline: none;
  border: none;
  height: 100%;
  width: 100%;
  border-radius: 5px;
  z-index: 2;
}
.windowsSliderInput::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 0px;
  height: 0px;
  cursor: none;
  transition: box-shadow 0s;
}
.windowsSliderProgress {
  position: absolute;
  left: 0;
  width: 50%;
  height: 100%;
  border-radius: 5px;
  background: green;
  z-index: 1;
  transition: 0.5s;
}
</style>
