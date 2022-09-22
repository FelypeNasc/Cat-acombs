<template>
  <div class="flex flex-row">
    <div class="joystick mr-10">
      <img
        class="h-14 ml-14 rounded-full hover:bg-[#1a2661]"
        @click="action = 'attack'"
        src="/src/assets/images/attack-btn.svg"
      />
      <div class="flex flex-row">
        <img
          class="h-14 rounded-full hover:bg-[#1a2661]"
          @click="action = 'defense'"
          src="/src/assets/images/defense-btn.svg"
        />
        <img
          class="h-14 ml-14 rounded-full hover:bg-[#1a2661]"
          @click="action = 'inventory'"
          src="/src/assets/images/inventory-btn.svg"
        />
      </div>
      <img
        class="h-14 ml-14 rounded-full hover:bg-[#1a2661]"
        @click="action = 'magic'"
        src="/src/assets/images/magic-btn.svg"
      />
    </div>
    <div class="showAction mt-10 bg-blend-darken font-squirk text-xl">
      <div class="attackItems" v-if="action === 'attack'">
        <h1
          class="opacity-30 hover:opacity-100"
          v-for="item in attackItems"
          :key="item"
        >
          {{ item }}
        </h1>
      </div>
      <div class="defenseItems" v-if="action === 'defense'">
        <h1
          class="opacity-30 hover:opacity-100"
          v-for="item in defenseItems"
          :key="item"
        >
          {{ item }}
        </h1>
      </div>
      <div class="magicItems" v-if="action === 'magic'">
        <h1
          class="opacity-30 hover:opacity-100"
          v-for="item in magicItems"
          :key="item"
        >
          {{ item }}
        </h1>
      </div>
      <div class="inventoryItems" v-if="action === 'inventory'">
        <h1
          class="opacity-30 hover:opacity-100"
          v-for="item in inventoryItems"
          :key="item"
        >
          {{ item }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JoystickComponent",
  data() {
    return {
      action: "",
      inventoryItems: ["pedra", "comida", "vida"],
      defenseItems: ["escudo", "armadura", "colete"],
      magicItems: ["bola", "artefato", "pó"],
      attackItems: ["faca", "arma", "arco"],
    };
  },
};
</script>
