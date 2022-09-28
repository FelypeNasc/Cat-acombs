<template>
  <div class="flex flex-row items-center font-squirk text-xl">
    <div class="joystick mr-10 flex">
      <img
        class="h-14 ml-14 rounded-full duration-200 hover:bg-[#1a2661] cursor-pointer"
        @click="action = 'attack'"
        src="/src/assets/images/attack-btn.svg"
      />
      <img
        class="h-14 ml-14 rounded-full duration-200 hover:bg-[#1a2661] cursor-pointer"
        @click="action = 'magic'"
        src="/src/assets/images/magic-btn.svg"
      />
    </div>
    <div class="showAction bg-blend-darken cursor-pointer">
      <div class="flex flex-col justify-center" v-if="action === 'attack'">
        <p
          class="opacity-70 duration-200 hover:opacity-100"
          v-for="(item, index) in attackItems"
          :key="index"
          @click="emitAction(item)"
        >
          {{ item.name }}
        </p>
      </div>
      <div class="flex" v-if="action === 'magic'">
        <div class="flex-col justify-center">
          <p
            class="opacity-70 duration-200 hover:opacity-100"
            v-for="(item, index) in magicItems"
            :key="index"
            @click="emitAction(item)"
          >
            {{ item.name }}
          </p>
        </div>

        <div
          v-if="playerStatus.actions.skills[0].onCooldown"
          class="flex flex-col items-center ml-4 text-red-700 text-border"
        >
          <p>
            Recarga: {{ playerStatus.actions.skills[0].cooldownCount }} turnos
          </p>
        </div>
      </div>
      <div class="inventoryItems" v-if="action === 'inventory'">
        <h1
          class="opacity-30 hover:opacity-100"
          v-for="(item, index) in inventoryItems"
          :key="index"
          @click="emitAction(item)"
        >
          {{ item.name }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JoystickComponent",
  props: {
    playerStatus: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      action: "",
      // inventoryItems: [
      //   { name: "Biscoito de gato", type: "item" },
      //   { name: "Sachê", type: "item" },
      // ],
      // defenseItems: [{ name: "escudo", type: "defense" }],
      magicItems: Object.keys(this.playerStatus.actions.skills).map((k) => {
        return { ...this.playerStatus.actions.skills[k], actionType: "skill" };
      }),
      attackItems: Object.keys(this.playerStatus.actions.attacks).map((k) => {
        return {
          ...this.playerStatus.actions.attacks[k],
          keyName: k,
          actionType: "attack",
        };
      }),
    };
  },
  mounted() {
    this.showPlayer();
  },
  methods: {
    emitAction(item) {
      this.$emit("emitAction", item);
    },
    showPlayer() {
    },
  },
};
</script>
<style>
.text-border p {
  text-shadow: 2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff,
    -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;
}
</style>
