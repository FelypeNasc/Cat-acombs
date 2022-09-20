<template>
  <div class="main bg-cover">
    <div
      class="header flex flex-row text-white text-xl justify-between font-chainwhacks"
    >
      <img class="logo w-48" src="src/assets/images/logo.svg" />
      <div
        class="level flex flex-row text-center align-middle text-7xl font-squirk"
      >
        <img
          class="pointer w-10 mr-6"
          src="src/assets/images/arrowLeft.svg"
          @click="changeLevel('-')"
        />
        <h3>Level {{ level }}</h3>
        <img
          class="pointer w-10 ml-6"
          src="src/assets/images/arrowRight.svg"
          @click="changeLevel('+')"
        />
      </div>
      <MiniButtonComponent @onclick="toogleMenu">
        <img src="../assets/icons/settings-icon.svg" alt="settings icon"
      /></MiniButtonComponent>
    </div>
    <div class="doors flex flex-row justify-end gap-5 my-20">
      <div class="flex flex-col">
        <img
          class="door1 pointer"
          :src="`src/assets/images/${level}-floor-door-${
            levels[`${level}`].door1
          }.svg`"
        />

        <label ref="door1" class="text-xl text-white text-center font-squirk"
          >Door 1</label
        >
      </div>
      <div class="flex flex-col">
        <img
          class="door2 pointer"
          :src="`src/assets/images/${level}-floor-door-${
            levels[`${level}`].door2
          }.svg`"
        />
        <label ref="door2" class="text-xl text-center font-squirk"
          >Door 2</label
        >
      </div>
      <div class="flex flex-col">
        <img
          class="door3 pointer"
          :src="`src/assets/images/${level}-floor-door-${
            levels[`${level}`].door3
          }.svg`"
        />
        <label ref="door3" class="text-xl text-center font-squirk"
          >Door 3</label
        >
      </div>
      <div class="flex flex-col">
        <img
          class="door4 pointer"
          :src="`src/assets/images/${level}-floor-door-${
            levels[`${level}`].door4
          }.svg`"
        />
        <label ref="door4" class="text-xl text-center font-squirk"
          >Door 4</label
        >
      </div>
      <div class="ml-6"></div>
    </div>
    <CardMenu v-if="showMenu" @close="toogleMenu" @confirm="logout"></CardMenu>
  </div>
</template>
<script>
import MiniButtonComponent from "../components/MiniButtonComponent.vue";
import CardMenu from "../components/CardMenu.vue";

export default {
  components: {
    CardMenu,
    MiniButtonComponent,
  },
  data() {
    return {
      levels: {
        1: {
          door1: "enabled",
          door2: "enabled",
          door3: "locked",
          door4: "locked",
        },
        2: {
          door1: "locked",
          door2: "locked",
          door3: "locked",
          door4: "locked",
        },
        3: {
          door1: "enabled",
          door2: "locked",
          door3: "locked",
          door4: "locked",
        },
      },
      level: 3,
      showMenu: false,
    };
  },
  created() {
    this.getLevels();
  },
  methods: {
    changeLevel(event) {
      if (event === "+") {
        if (this.level === 3) {
          this.level = 1;
        } else {
          this.level++;
        }
      }
      if (event === "-") {
        if (this.level === 1) {
          this.level = 3;
        } else {
          this.level--;
        }
      }
    },
    toogleMenu() {
      this.showMenu = !this.showMenu;
    },
    getLevels() {
      console.log("requisição dos levels disponíveis");
    },
  },
};
</script>
<style scoped>
.main {
  background-image: url("src/assets/images/backgroundblue.png");
}
.pointer {
  cursor: pointer;
}
</style>
