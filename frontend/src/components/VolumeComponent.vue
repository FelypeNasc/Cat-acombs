<template>
  <div class="volume flex-col">
    <div>
      <h2 class="text-center">Volume: {{ percent }}</h2>
    </div>
    <div class="flex justify-between items-center">
      <div class="sound mr-5">
        <img src="../assets/icons/sound-icon.svg" />
      </div>
      <div class="windowsSlider flex justify-center items-center">
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
  </div>
</template>

<script>
export default {
  name: "VolumeComponent",
  data() {
    return {
      percent: 25,
      audio: null,
    };
  },
  watch: {
    percent() {
      this.audio.volume = this.percent / 100;
    },
  },
  mounted() {
    this.audio = new Audio("../assets/music/Medieval_music.mp3");
    this.audio.volume = 0.25;
  },
  methods: {
    playSound() {
      const audio = new Audio("../assets/music/Medieval_music.mp3");
      audio.loop = true;
      audio.volume = 0.25;
    },
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

  display: flex;
  align-items: center;
  justify-content: center;
}
.sound {
  width: 30px;
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
  background: var(--blue);
  box-shadow: 0 0 0 4px #1a1a1a;
}
.windowsSliderInput:active::-webkit-slider-thumb {
  box-shadow: 0 0 0 6px #1a1a1a, 0 0 0 15px #c5d1ff70;
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
  background: var(--blue);
  z-index: 1;
}
</style>
