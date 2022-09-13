<template>
  <div @click="openCard" class="noselect flex flex-col justify-around h-full">
    <div class>
      <img src="src/assets/images/logo.svg" class="w-6/12" />
      <h2 class="text-3xl mt-2 tracking-wider font-chainwhacks">
        E O ATAQUE DOS DOGMANÍACOS
      </h2>
    </div>
    <h3 class="text-2xl font-squirk">CLIQUE PARA CONTINUAR</h3>
    <CardNickname
      v-if="showCard"
      @confirm="confirm"
      @close="close"
    ></CardNickname>
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
      showCard: null,
    };
  },
  methods: {
    openCard() {
      this.showCard = true;
    },
    confirm(nickname) {
      console.log(nickname);
      this.showCard = false;
    },
    close() {
      console.log(1);
      this.showCard = false;
    },
  },
};
</script>
<style>
body {
  background-image: url("src/assets/images/backgroundblue.png");
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
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
