<template>
  <div @click="openCard" class="noselect flex flex-col justify-around h-full">
    <div class>
      <img src="src/assets/images/logo.svg" class="w-6/12" />
      <h2 class="text-3xl mt-2 tracking-wider font-chainwhacks">
        E O ATAQUE DOS DOGMANÍACOS
      </h2>
    </div>
    <h3 class="text-2xl font-squirk">CLIQUE PARA CONTINUAR</h3>
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
  methods: {
    openCard() {
      this.showCard = true;
    },
    confirm(nickname) {
      console.log(nickname);
      this.showCard = false;
      console.log(this.showCard);
    },
    close() {
      console.log(1);
      this.showCard = false;
      console.log(this.showCard);
    },
  },
};
</script>
<style>
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
