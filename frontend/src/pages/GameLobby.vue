<template>
  <div>
    <h1>Hello World</h1>
    <button @click="openCard">Criar Sala</button>

    <CardCreateRoom></CardCreateRoom>
  </div>
</template>

<script>
import CardCreateRoom from "../components/CardCreateRoom.vue";
export default {
  components: {
    CardCreateRoom,
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
  },
};
</script>
<style></style>
