<template>
  <div class="flex flex-row items-center">
    <div class="joystick mr-10 flex">
      <img
        class="h-14 ml-14 rounded-full hover:bg-[#1a2661] cursor-pointer"
        @click="action = 'attack'"
        src="/src/assets/images/attack-btn.svg"
      />
      <img
        class="h-14 ml-14 rounded-full hover:bg-[#1a2661] cursor-pointer"
        @click="action = 'magic'"
        src="/src/assets/images/magic-btn.svg"
      />
    </div>
    <div class="showAction bg-blend-darken font-squirk text-xl cursor-pointer">
      <div class="flex flex-col justify-center" v-if="action === 'attack'">
        <p
          class="opacity-30 hover:opacity-100"
          v-for="(item, index) in attackItems"
          :key="index"
          @click="emitAction(item)"
        >
          {{ item.name }}
        </p>
      </div>
      <div class="flex flex-col justify-center" v-if="action === 'magic'">
        <p
          class="opacity-30 hover:opacity-100"
          v-for="(item, index) in magicItems"
          :key="index"
          @click="emitAction(item)"
        >
          {{ item.name }}
        </p>
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
      inventoryItems: [
        { name: "Biscoito de gato", type: "item" },
        { name: "Sachê", type: "item" },
      ],
      defenseItems: [{ name: "escudo", type: "defense" }],
      magicItems: [
        { name: this.playerStatus.actions.skills[0].name, type: "skill" },
      ],
      attackItems: [
        { name: "Normal", type: "normalAttack" },
        { name: "Forte", type: "strongAttack" },
      ],
    };
  },
  methods: {
    emitAction(item) {
      this.$emit("emitAction", item);
    },
  },
};
</script>
