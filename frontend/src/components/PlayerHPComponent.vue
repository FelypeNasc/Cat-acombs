<template>
  <div class="w-52 flex-col bg-white p-1">
    <h2 class="font-squirk text-blue-900 text-center">{{ playerName }}</h2>
    <div class="flex items-center">
      <div class="heart">
        <img src="src/assets/icons/heart-icon.svg" />
      </div>
      <div class="windowsSlider flex justify-center items-center">
        <input
          v-model="percent"
          type="range"
          class="windowsSliderInput"
          min="0"
          :max="hpMax"
        />
        <div
          class="windowsSliderProgress"
          :style="{ width: percent + '%' }"
        ></div>
      </div>
    </div>
    <div class="flex justify-center m-6">
      <div v-if="playerClass == 'warrior'">
        <img src="src/assets/images/warrior-full.svg" class="warrior" />
      </div>
      <div v-else-if="playerClass == 'mage'">
        <img src="src/assets/images/mage-full.svg" class="mage" />
      </div>
      <div v-else-if="playerClass == 'ranger'">
        <img src="src/assets/images/ranger-full.svg" class="ranger" />
      </div>
      <div v-else>
        <img src="src/assets/images/bard-full.svg" class="bard" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HPComponent",
  data() {
    return {
      props: {
        playerName: {
          type: String,
          default: "Player",
        },
        playerClass: {
          type: String,
          default: "bard",
        },
        hpMax: {
          type: Number,
          default: 100,
        },
        hpCurrent: {
          type: Number,
          default: 100,
        },
      },
      percent: 100,
    };
  },
  watch: {
    windowsSliderProgress() {
      return (this.percent = this.hpCurrent);
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
}
</style>
