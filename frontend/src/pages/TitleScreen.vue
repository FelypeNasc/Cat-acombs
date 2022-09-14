<template>
  <div class="noselect flex flex-col justify-around h-full">
    <div class>
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
  created() {},
  methods: {
    openCard() {
      this.showCard = true;
    },
    confirm(nickname) {
      console.log(nickname);
      this.showCard = false;
      this.$router.push({ path: "/lobby" });
    },
    close() {
      console.log(1);
      this.showCard = false;
      console.log(this.showCard);
    },
  },
};
</script>
<style scoped>
body {
  background-image: url("src/assets/images/backgroundblue.png");
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
#continue {
  color: white;
  animation: shine 2s infinite;
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
img {
  width: 624px;
}
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
