<template>
  <div class="volume flex-col">
    <div>
      <h2 class="text-center">Volume: {{ percent }}</h2>
    </div>
    <div class="windowsSlider mt-5 flex-col justify-center content-center">
      <input
        v-model="percent"
        type="range"
        class="windowsSliderInput"
        min="0"
        max="100"
      />
      <div
        class="windowsSliderProgress"
        :style="{ width: percent + '%' }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VolumeComponent",
  data() {
    return {
      percent: 25,
    };
  },
};
</script>

<style scoped>
h1 {
  font-family: cursive;
  color: white;
  margin-top: 20px;
}
.windowsSlider {
  height: 5px;
  width: 100%;
  border-radius: 5px;
  /*   transform: scale(2); */
  background: #00000060;

  position: relative;
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
  width: 10px;
  height: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: box-shadow 0.5s;
  background: #198f85;
  box-shadow: 0 0 0 6px #1a1a1a;
}
.windowsSliderInput:active::-webkit-slider-thumb {
  box-shadow: 0 0 0 6px #1a1a1a, 0 0 0 15px #198f8570;
}
.windowsSliderInput::-moz-range-thumb {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: box-shadow 0.5s;
  background: #198f85;
  box-shadow: 0 0 0 6px #1a1a1a;
}
.windowsSliderInput:active::-moz-range-thumb {
  box-shadow: 0 0 0 6px #1a1a1a, 0 0 0 15px #198f8570;
}
.windowsSliderProgress {
  position: absolute;
  left: 0;
  width: 50%;
  height: 100%;
  border-radius: 5px;
  background: #198f85;
  z-index: 1;
}
</style>
