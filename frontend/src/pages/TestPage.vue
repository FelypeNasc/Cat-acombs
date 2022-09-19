<template>
  <div>
    <HPComponent :playerStatus="playerStatus"></HPComponent>
  </div>
</template>
<script>
import HPComponent from "../components/PlayerHPComponent.vue";
export default {
  components: { HPComponent },
  data() {
    return {
      playerStatus: {
        playerName: "Eu",
        playerClass: "mage",
        hpMax: 80,
        hpCurrent: 20,
      },
    };
  },
};
</script>
