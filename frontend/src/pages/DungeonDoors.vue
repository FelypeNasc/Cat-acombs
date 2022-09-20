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
      <div
        v-for="(item, index) in levels[`${level}`]"
        :key="index"
        class="flex flex-col"
      >
        <img
          class="door1 pointer"
          :src="`src/assets/images/${level}-floor-door-${item.acess}.svg`"
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
          { name: "Door 1", level: 1, acess: "enabled" },
          { name: "Door 2", level: 1, acess: "enabled" },
          { name: "Door 3", level: 1, acess: "locked" },
          { name: "Door 4", level: 1, acess: "locked" },
        ],
        2: [
          { name: "Door 1", level: 2, acess: "enabled" },
          { name: "Door 2", level: 2, acess: "enabled" },
          { name: "Door 3", level: 2, acess: "locked" },
          { name: "Door 4", level: 2, acess: "locked" },
        ],
        3: [
          { name: "Door 1", level: 3, acess: "enabled" },
          { name: "Door 2", level: 3, acess: "enabled" },
          { name: "Door 3", level: 3, acess: "locked" },
          { name: "Door 4", level: 3, acess: "locked" },
        ],
      },
      level: 1,
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
.main {
  background-image: url("src/assets/images/backgroundblue.png");
}
.pointer {
  cursor: pointer;
}
</style>
