<template>
  <div
    class="noselect flex flex-col justify-around items-center h-full"
    @click.once="playSound"
  >
    <div class="flex flex-col justify-center items-center">
      <img src="src/assets/images/logo.svg" class="w-6/12" />
      <h2 class="text-3xl mt-2 tracking-wider font-chainwhacks">
        E O ATAQUE DOS DOGMANÍACOS
      </h2>
    </div>
    <div id="continue">
      <h3 @click="openCard" class="text-2xl font-squirk cursor-pointer">
        CLIQUE PARA CONTINUAR
      </h3>
    </div>
    <CardNickname v-if="showCard" @confirm="confirm" @close="close" />
  </div>
</template>
<script>
import { createWS, wsConnection } from "../connection/connections";
import CardNickname from "../components/CardNickname.vue";
export default {
  components: {
    CardNickname,
  },
  data() {
    return {
      showCard: false,
    };
  },
  mounted() {
    // this.playSound();
  },
  methods: {
    openCard() {
      this.showCard = true;
    },
    confirm(nickname) {
      createWS(nickname).then(() => {
        this.setWsListener();
        this.showCard = false;
      });
    },
    close() {
      this.showCard = false;
    },
    setWsListener() {
      wsConnection.addEventListener("message", (msg) => {
        msg = JSON.parse(msg.data);

        if (msg.type === "connected") {
          console.log(msg);
          this.$router.push({ path: "/lobby" });
        }
        if (msg.type === "userConnected") {
          console.log(msg);
        }
      });
    },
    playSound() {
      const audio = new Audio("../src/assets/music/Medieval_music.mp3");
      audio.play();
      audio.loop = true;
      audio.volume = 0.15;
    },
  },
};
</script>
<style scoped>
#continue {
  color: white;
  animation: shine 1s infinite;
  animation-direction: alternate;
}
@keyframes shine {
  from {
    color: grey;
  }
  to {
    color: white;
  }
}
</style>
