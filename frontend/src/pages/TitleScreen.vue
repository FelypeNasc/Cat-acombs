<template>
  <div @click="openCard" class="noselect">
    <img src="src/assets/images/logo.svg" />
    <h1>EM BUSCA DOS SACHES</h1>
    <h2 class="pointer">CLIQUE PARA CONTINUAR</h2>
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
