<template>
  <div class="dense">
    <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 items-center">
      <div class="11">
        <HPComponent
          class="w-[60%] big-screen"
          :playerStatus="playerStatus[1]"
        ></HPComponent>
      </div>
      <div class="12">
        <HPComponent
          class="w-[60%] big-screen"
          :playerStatus="playerStatus[2]"
        ></HPComponent>
      </div>
      <div class="13 row-span-2 w-72">
        <BossHPComponent :bossStatus="bossStatus"></BossHPComponent>
      </div>
      <div class="21">
        <HPComponent
          class="w-[60%] big-screen"
          :playerStatus="playerStatus[3]"
        ></HPComponent>
      </div>
      <div class="22">
        <HPComponent
          class="w-[60%] big-screen"
          :playerStatus="playerStatus[4]"
        ></HPComponent>
      </div>
      <div class="31 col-span-2 ml-10">
        <joystick-component @emitAction="playerAction"></joystick-component>
      </div>
      <div class="33">
        <div class="showTurn mt-10 bg-blend-darken font-squirk text-xl">
          <h1 v-for="n in 4" :key="n">
            <div v-if="turn === n">
              <h1 class="opacity-100">{{ playerStatus[n].playerName }}</h1>
            </div>
            <div v-else>
              <h1 class="opacity-30">{{ playerStatus[n].playerName }}</h1>
            </div>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HPComponent from "../components/PlayerHPComponent.vue";
import BossHPComponent from "../components/BossHPComponent.vue";
import JoystickComponent from "../components/JoystickComponent.vue";

export default {
  components: {
    HPComponent,
    BossHPComponent,
    JoystickComponent,
  },
  data() {
    return {
      turn: 3,
      numberFloor: "1",
      playerStatus: {
        4: {
          playerName: "Eu",
          playerClass: "mage",
          hpMax: 100,
          hpCurrent: 20,
        },
        1: {
          playerName: "Tu",
          playerClass: "bard",
          hpMax: 80,
          hpCurrent: 39,
        },
        2: {
          playerName: "Eles",
          playerClass: "warrior",
          hpMax: 70,
          hpCurrent: 40,
        },
        3: {
          playerName: "Nós",
          playerClass: "ranger",
          hpMax: 50,
          hpCurrent: 10,
        },
      },
      bossStatus: {
        bossName: "Grande Chefão",
        hpCurrent: 50,
        numberFloor: 3,
        numberDoor: 4,
      },
    };
  },
  created() {
    this.setBackground();
  },
  methods: {
    playerAction(action) {
      console.log(action);
    },
    setBackground() {
      document.querySelector(
        "body"
      ).style.backgroundImage = `url(src/assets/images/${this.numberFloor}-floor-background.svg)`;
    },
  },
};
</script>
<style scoped>
@media only screen and (min-height: 853px) {
  .big-screen {
    margin-top: 20%;
  }
}
</style>
