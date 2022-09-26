<template>
  <div class="main bg-cover">
    <div
      class="header flex flex-row text-white text-xl justify-between font-chainwhacks"
    >
      <img class="logo w-48" src="../assets/images/logo.svg" />
      <div
        class="floor flex flex-row text-center align-middle text-7xl font-squirk"
      >
        <img
          class="pointer w-10 mr-6"
          src="../assets/images/arrowLeft.svg"
          @click="changeLevel('-')"
        />
        <h3>Level {{ floor }}</h3>
        <img
          class="pointer w-10 ml-6"
          src="../assets/images/arrowRight.svg"
          @click="changeLevel('+')"
        />
      </div>
      <MiniButtonComponent @onclick="toogleMenu">
        <img src="../assets/icons/settings-icon.svg" alt="settings icon"
      /></MiniButtonComponent>
    </div>
    <div class="doors flex flex-row justify-end gap-5 my-20">
      <div
        v-for="(item, index) in levels[`${floor}`]"
        :key="index"
        class="flex flex-col"
      >
        <img
          class="door1 pointer"
          :src="`../src/assets/images/${level}-floor-door-${item.acess}.svg`"
          @click="startBattle(item)"
        />

        <label ref="door1" class="text-xl text-white text-center font-squirk">{{
          item.name
        }}</label>
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
        1: [
          { name: "Door 1", floor: 1, door: 1, access: "enabled" },
          { name: "Door 2", floor: 1, door: 2, access: "enabled" },
          { name: "Door 3", floor: 1, door: 3, access: "locked" },
          { name: "Door 4", floor: 1, door: 4, access: "locked" },
        ],
        2: [
          { name: "Door 1", floor: 2, door: 1, access: "enabled" },
          { name: "Door 2", floor: 2, door: 2, access: "enabled" },
          { name: "Door 3", floor: 2, door: 3, access: "locked" },
          { name: "Door 4", floor: 2, door: 4, access: "locked" },
        ],
        3: [
          { name: "Door 1", floor: 3, door: 1, access: "enabled" },
          { name: "Door 2", floor: 3, door: 2, access: "enabled" },
          { name: "Door 3", floor: 3, door: 3, access: "locked" },
          { name: "Door 4", floor: 3, door: 4, access: "locked" },
        ],
      },
      floor: 1,
      showMenu: false,
    };
  },
  created() {
    this.getLevels();
    this.getSession();
  },
  methods: {
    changeLevel(event) {
      if (event === "+") {
        if (this.floor === 3) {
          this.floor = 1;
        } else {
          this.floor++;
        }
      }
      if (event === "-") {
        if (this.floor === 1) {
          this.floor = 3;
        } else {
          this.floor--;
        }
      }
    },
    toogleMenu() {
      this.showMenu = !this.showMenu;
    },
    getLevels() {
      console.log("requisição dos levels disponíveis");
    },
    getSession() {
      console.log("requisição dos dados da sessão");
    },
    startBattle(item) {
      console.log(item);
      /* enviar as informações para o back e retornar com o a mudança de tela */
      this.$router.push("/combat");
    },
  },
};
</script>
<style scoped>
/* .main {
  background-image: url("src/assets/images/backgroundblue.png");
} */
.pointer {
  cursor: pointer;
}
</style>
