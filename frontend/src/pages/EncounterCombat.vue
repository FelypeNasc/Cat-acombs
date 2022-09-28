<template>
  <div class="dense noselect">
    <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 items-center">
      <div class="11">
        <HPComponent
          class="w-[60%] big-screen"
          :playerStatus="battleData.players[0]"
        ></HPComponent>
      </div>
      <div class="12">
        <HPComponent
          class="w-[60%] big-screen"
          :playerStatus="battleData.players[1]"
        ></HPComponent>
      </div>
      <div class="13 row-span-2 w-32">
        <BossHPComponent :bossStatus="battleData.enemy"></BossHPComponent>
      </div>
      <div class="21">
        <HPComponent
          class="w-[60%] big-screen"
          :playerStatus="battleData.players[2]"
        ></HPComponent>
      </div>
      <div class="22">
        <HPComponent
          class="w-[60%] big-screen"
          :playerStatus="battleData.players[3]"
        ></HPComponent>
      </div>
      <div class="31 col-span-2 ml-10">
        <joystick-component
          :playerStatus="battleData.players[`${userIndex()}`]"
          @emitAction="playerAction"
        ></joystick-component>
      </div>
      <div class="33">
        <div class="showTurn mt-10 bg-blend-darken font-squirk text-xl">
          <h1 v-for="n in 5" :key="n">
            <div v-if="battleData.turnIndex === n - 1">
              <h1 class="opacity-100">
                {{ `>  ${battleData.turnList[n - 1].name}` }}
              </h1>
            </div>
            <div v-else>
              <h1 class="opacity-30">
                {{ battleData.turnList[n - 1].name }}
              </h1>
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
import { wsConnection } from "../connection/connections";
import { attack, skill } from "../connection/battle.methods";

export default {
  components: {
    HPComponent,
    BossHPComponent,
    JoystickComponent,
  },
  props: {
    battleData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return { attack, skill };
  },
  created() {
    this.setBackground();
    wsConnection.addEventListener("message", (msg) => {
      msg = JSON.parse(msg.data);

      switch (msg.type) {
        case "startBattle":
          break;
        case "battleUpdated":
          break;
      }
    });
  },
  methods: {
    playerAction(action) {
      if (action.actionType === "attack")
        this.attack(this.$route.params.id, action);
      if (action.actionType === "skill")
        this.skill(this.$route.params.id, action);
    },
    setBackground() {
      if (
        this.battleData.enemy.id === 1 ||
        this.battleData.enemy.id === 2 ||
        this.battleData.enemy.id === 3
      ) {
        document.querySelector("body").style.backgroundImage =
          "url(../src/assets/images/1-floor-background.svg)";
      } else if (
        this.battleData.enemy.id === 4 ||
        this.battleData.enemy.id === 5 ||
        this.battleData.enemy.id === 6
      ) {
        document.querySelector("body").style.backgroundImage =
          "url(../src/assets/images/2-floor-background.svg)";
      } else if (
        this.battleData.enemy.id === 7 ||
        this.battleData.enemy.id === 8 ||
        this.battleData.enemy.id === 9
      ) {
        document.querySelector("body").style.backgroundImage =
          "url(../src/assets/images/3-floor-background.svg)";
      }
    },
    userIndex() {
      const sessionId = sessionStorage.getItem("userId");
      const userIndex = this.battleData.players
        .map((e) => {
          return e.playerId;
        })
        .indexOf(sessionId);
      return userIndex;
    },
  },
};
</script>
<style scoped>
@media only screen and (min-height: 853px) {
  .big-screen {
    margin-top: 15%;
  }
}
</style>
