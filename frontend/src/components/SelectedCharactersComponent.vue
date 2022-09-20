<template>
  <div class="gap-5 flex justify-center items-center content-center">
    <div class="flex flex-col justify-center items-center content-center">
      <p class="text-xl">{{ socketPlayers?.player1?.name }}</p>
      <img
        id="player1"
        :src="`src/assets/images/${
          socketPlayers?.player1?.class
            ? socketPlayers.player1.class
            : 'undefined'
        }-class-selected.svg`"
        class="w-2/4 min-w-[80px]"
      />
    </div>
    <div class="flex flex-col justify-center items-center content-center">
      <p class="text-xl">{{ socketPlayers?.player2?.name }}</p>
      <img
        id="player2"
        :src="`src/assets/images/${
          socketPlayers?.player2?.class
            ? socketPlayers.player2.class
            : 'undefined'
        }-class-selected.svg`"
        class="w-2/4 min-w-[80px]"
      />
    </div>
    <div class="flex flex-col justify-center items-center content-center">
      <p class="text-xl">{{ socketPlayers?.player3?.name }}</p>
      <img
        id="player3"
        :src="`src/assets/images/${
          socketPlayers?.player3?.class
            ? socketPlayers.player3.class
            : 'undefined'
        }-class-selected.svg`"
        class="w-2/4 min-w-[80px]"
      />
    </div>
    <div class="flex flex-col justify-center items-center content-center">
      <p class="text-xl">{{ socketPlayers?.player4?.name }}</p>
      <img
        id="player4"
        :src="`src/assets/images/${
          socketPlayers?.player4?.class
            ? socketPlayers.player4.class
            : 'undefined'
        }-class-selected.svg`"
        class="w-2/4 min-w-[80px]"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    socketPlayers: {
      type: Object,
      required: true,
      default: () => {
        return {
          player1: { name: null, class: null },
          player2: { name: null, class: null },
          player3: { name: null, class: null },
          player4: { name: null, class: null },
        };
      },
    },
  },
  computed: {
    buttonColor() {
      return this.mode;
    },
    buttonShape() {
      return this.shape;
    },
  },
  methods: {
    onclick() {
      this.$emit("onclick");
    },
  },
};
</script>
<style></style>
