<template>
  <div class="gap-5 flex justify-center items-center content-center">
    <div
      class="relative flex flex-col justify-center items-center content-center"
    >
      <p class="text-xl break-normal h-[50px]">
        {{ socketPlayers?.player1?.username }}
      </p>
      <img
        v-if="!socketPlayers?.player1?.class"
        id="player1"
        src="../assets/images/undefined-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player1?.class === 'warrior'"
        id="player1"
        src="../assets/images/warrior-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player1?.class === 'mage'"
        id="player1"
        src="../assets/images/mage-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player1?.class === 'bard'"
        id="player1"
        src="../assets/images/bard-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player1?.class === 'ranger'"
        id="player1"
        src="../assets/images/ranger-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player1?.checked"
        id="player1"
        src="../assets/icons/check-icon.svg"
        class="absolute right-0 bottom-0 w-2/4 z-10"
      />
    </div>
    <div class="flex flex-col justify-center items-center content-center">
      <p class="text-xl break-normal h-[50px]">
        {{ socketPlayers?.player2?.username }}
      </p>
      <img
        v-if="!socketPlayers?.player2?.class"
        id="player2"
        src="../assets/images/undefined-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player2?.class === 'warrior'"
        id="player2"
        src="../assets/images/warrior-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player2?.class === 'mage'"
        id="player2"
        src="../assets/images/mage-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player2?.class === 'bard'"
        id="player2"
        src="../assets/images/bard-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player2?.class === 'ranger'"
        id="player1"
        src="../assets/images/ranger-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player2?.checked"
        id="player2"
        src="../assets/icons/check-icon.svg"
        class="absolute right-0 bottom-0 w-2/4 z-10"
      />
    </div>
    <div class="flex flex-col justify-center items-center content-center">
      <p class="text-xl break-normal h-[50px]">
        {{ socketPlayers?.player3?.username }}
      </p>
      <img
        v-if="!socketPlayers?.player3?.class"
        id="player3"
        src="../assets/images/undefined-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player3?.class === 'warrior'"
        id="player3"
        src="../assets/images/warrior-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player3?.class === 'mage'"
        id="player3"
        src="../assets/images/mage-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player3?.class === 'bard'"
        id="player3"
        src="../assets/images/bard-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player3?.class === 'ranger'"
        id="player3"
        src="../assets/images/ranger-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player3?.checked"
        id="player3"
        src="../assets/icons/check-icon.svg"
        class="absolute right-0 bottom-0 w-2/4 z-10"
      />
    </div>
    <div class="flex flex-col justify-center items-center content-center">
      <p class="text-xl break-normal h-[50px]">
        {{ socketPlayers?.player4?.username }}
      </p>
      <img
        v-if="!socketPlayers?.player4?.class"
        id="player4"
        src="../assets/images/undefined-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player4?.class === 'warrior'"
        id="player4"
        src="../assets/images/warrior-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player4?.class === 'mage'"
        id="player4"
        src="../assets/images/mage-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player4?.class === 'bard'"
        id="player4"
        src="../assets/images/bard-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player4?.class === 'ranger'"
        id="player4"
        src="../assets/images/ranger-class-selected.svg"
        class="w-2/4 min-w-[80px]"
      />
      <img
        v-if="socketPlayers?.player4?.checked"
        id="player1"
        src="../assets/icons/check-icon.svg"
        class="absolute right-0 bottom-0 w-2/4 z-10"
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
          player1: { username: null, class: null },
          player2: { username: null, class: null },
          player3: { username: null, class: null },
          player4: { username: null, class: null },
        };
      },
    },
  },
  data() {
    return {
      route: "../assets/images/undefined-class-selected.svg",
    };
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
