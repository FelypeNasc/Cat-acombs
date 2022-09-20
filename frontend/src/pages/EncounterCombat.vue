<template>
  <div class="noselect flex flex-row justify-between">
    <div>
      <HPComponent
        class="max-w-[60%] max-h-[60%]"
        :playerStatus="playerStatus"
      ></HPComponent>
      <HPComponent
        class="max-w-[60%] max-h-[60%]"
        :playerStatus="playerStatus1"
      ></HPComponent>
      <joystick-component></joystick-component>
    </div>
    <div class="content-between">
      <HPComponent
        class="max-w-[60%] max-h-[60%]"
        :playerStatus="playerStatus2"
      ></HPComponent>
      <HPComponent
        class="max-w-[60%] max-h-[60%]"
        :playerStatus="playerStatus3"
      ></HPComponent>
      <div class="mt-10 bg-blend-darken text-xl">
        <h1 class="font-squirk opacity-30 hover:opacity-100">ATAQUE FORTE</h1>
        <h1 class="font-squirk opacity-30 hover:opacity-100">ATAQUE BASICO</h1>
        <h1 class="font-squirk opacity-30 hover:opacity-100">ATAQUE FRACO</h1>
      </div>
    </div>
    <div>
      <BossHPComponent class="mt-10" :bossStatus="bossStatus"></BossHPComponent>
      <div class="mt-10 text-xl">
        <h1 class="font-squirk opacity-30 hover:opacity-100">Turno Player 1</h1>
        <h1 class="font-squirk opacity-30 hover:opacity-100">Turno Player 2</h1>
        <h1 class="font-squirk opacity-30 hover:opacity-100">Turno Player 3</h1>
        <h1 class="font-squirk opacity-30 hover:opacity-100">Turno Player 4</h1>
      </div>
    </div>
    <div>
      <chat-component></chat-component>
    </div>
  </div>
</template>
<script>
import HPComponent from "../components/PlayerHPComponent.vue";
import BossHPComponent from "../components/BossHPComponent.vue";
import ChatComponent from "../components/ChatComponent.vue";
import JoystickComponent from "../components/JoystickComponent.vue";
export default {
  components: {
    HPComponent,
    BossHPComponent,
    ChatComponent,
    JoystickComponent,
  },
  data() {
    return {
      numberFloor: "1",
      playerStatus: {
        playerName: "Eu",
        playerClass: "mage",
        hpMax: 100,
        hpCurrent: 20,
      },
      playerStatus1: {
        playerName: "Tu",
        playerClass: "bard",
        hpMax: 80,
        hpCurrent: 50,
      },
      playerStatus2: {
        playerName: "Eles",
        playerClass: "warrior",
        hpMax: 70,
        hpCurrent: 40,
      },
      playerStatus3: {
        playerName: "Nós",
        playerClass: "ranger",
        hpMax: 100,
        hpCurrent: 10,
      },
      bossStatus: {
        bossName: "Grande Chefão",
        hpCurrent: 80,
        numberFloor: 1,
        numberDoor: 3,
      },
    };
  },
  created() {
    this.setBackground();
  },
  methods: {
    setBackground() {
      document.querySelector(
        "body"
      ).style.backgroundImage = `url(src/assets/images/${this.numberFloor}-floor-background.svg)`;
    },
  },
};
</script>
<style scoped></style>
