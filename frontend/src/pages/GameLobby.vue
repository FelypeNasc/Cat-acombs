<template>
  <div class="flex flex-col justify-center content-center">
    <div>
      <img src="../assets/images/logo.svg" alt="Catacombs logo" />
      <h2>Game Lobby</h2>
    </div>
    <div>
      <div id="rooms-control"></div>
      <div id="rooms-container"></div>
      <div id="pages-control"></div>
    </div>
    <button @click="openCard">Criar Sala</button>
    <button @click="openConfig">Config</button>

    <CardCreateRoom
      v-if="showCard"
      @confirm="confirm"
      @close="close"
    ></CardCreateRoom>
    <CardVolume
      v-if="showConfig"
      @confirm="confirm"
      @close="close"
    ></CardVolume>
  </div>
</template>

<script>
import CardCreateRoom from "../components/CardCreateRoom.vue";
import CardVolume from "../components/CardVolume.vue";
/* import ButtonComponent from "../components/ButtonComponent.vue"; */
export default {
  components: {
    CardCreateRoom,
    CardVolume,
    /*  ButtonComponent, */
  },
  data() {
    return {
      showCard: null,
      showConfig: null,
    };
  },

  methods: {
    openCard() {
      this.showCard = true;
    },
    openConfig() {
      this.showConfig = true;
    },
    confirm(roomData) {
      console.log(roomData);
      this.showCard = false;
      console.log(this.showCard);
    },
    close() {
      this.showCard = false;
      this.showConfig = false;
      console.log(this.showCard);
    },
  },
};
</script>
<style scoped>
body {
  background-image: url("src/assets/images/backgroundblue.png");
}

h1 {
  font-family: "Chainwhacks";
}
h2 {
  margin-top: 20vw;
  font-family: "Squirk";
}
.pointer {
  cursor: pointer;
}
</style>
