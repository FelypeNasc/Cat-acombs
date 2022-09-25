<template>
  <div class="w-52 flex-col p-1">
    <div class="bg-white rounded-md p-2">
      <h2 class="font-squirk text-blue-900 text-center">
        {{ playerStatus?.playerName }}
      </h2>
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
            :max="playerStatus.hpMax"
          />
          <div
            class="windowsSliderProgress"
            :style="{ width: playerStatus.hpCurrent + '%' }"
          ></div>
        </div>
      </div>
    </div>
    <div class="flex justify-center m-6">
      <div v-if="playerStatus.playerClass == 'warrior'">
        <img
          src="src/assets/images/warrior-full.svg"
          class="warrior catImage"
        />
      </div>
      <div v-else-if="playerStatus.playerClass == 'mage'">
        <img src="src/assets/images/mage-full.svg" class="mage catImage" />
      </div>
      <div v-else-if="playerStatus.playerClass == 'ranger'">
        <img src="src/assets/images/ranger-full.svg" class="ranger catImage" />
      </div>
      <div v-else-if="playerStatus.playerClass == 'bard'">
        <img src="src/assets/images/bard-full.svg" class="bard catImage" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HPComponent",
  props: {
    playerStatus: {
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
.catImage {
  height: 100px;
  width: 100px;
}
</style>
