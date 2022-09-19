<template>
  <div>
    <HPComponent :playerStatus="playerStatus"></HPComponent>
    <BossHPComponent :bossStatus="bossStatus"></BossHPComponent>
  </div>
</template>
<script>
import HPComponent from "../components/PlayerHPComponent.vue";
import BossHPComponent from "../components/BossHPComponent.vue";
export default {
  components: { HPComponent, BossHPComponent },
  data() {
    return {
      playerStatus: {
        playerName: "Eu",
        playerClass: "mage",
        hpMax: 80,
        hpCurrent: 20,
      },
      bossStatus: {
        bossName: "Grande Chefão",
        hpCurrent: 80,
        numberFloor: 1,
        numberDoor: 3,
      },
    };
  },
};
</script>
