<template>
  <div class="main bg-cover h-screen flex flex-col justify-between">
    <div
      class="header flex flex-row text-white text-xl justify-between font-chainwhacks"
    >
      <img class="logo w-48" src="http://s3.amazonaws.com/catacombs-game-bucket/assets/images/logo.png" />
      <div
        class="floor flex flex-row text-center align-middle text-7xl font-squirk"
      >
        <img
          class="pointer w-10 mr-6 hover:drop-shadow-md duration-200"
          src="http://s3.amazonaws.com/catacombs-game-bucket/assets/images/arrowLeft.svg"
          @click="changeLevel('-')"
        />
        <h3>Level {{ floor }}</h3>
        <img
          class="pointer w-10 ml-6 hover:drop-shadow-md duration-200"
          src="http://s3.amazonaws.com/catacombs-game-bucket/assets/images/arrowRight.svg"
          @click="changeLevel('+')"
        />
      </div>
      <MiniButtonComponent @onclick="toogleMenu">
        <img src="http://s3.amazonaws.com/catacombs-game-bucket/assets/icons/settings-icon.svg" alt="settings icon"
      /></MiniButtonComponent>
    </div>
    <div
      class="doors h-full flex flex-row justify-center items-center gap-5 my-20"
    >
      <div
        v-for="(item, index) in levels[`${floor}`]"
        :key="index"
        class="flex flex-col"
      >
        <img
          :disabled="item.access === 'locked'"
          :class="`door1 ${
            item.access === 'enabled' ? 'pointer' : 'not-allowed'
          } hover:brightness-125 duration-200`"
          :src="`http://s3.amazonaws.com/catacombs-game-bucket/assets/images/${floor}-floor-door-${item.access}.png`"
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
import { wsConnection } from "../connection/connections";
import { getRoomUpdated } from "../connection/room.methods";
import { enterDoor } from "../connection/doors.methods";

export default {
  components: {
    CardMenu,
    MiniButtonComponent,
  },
  data() {
    return {
      levels: {},
      getRoomUpdated,
      enterDoor,
      floor: 1,
      showMenu: false,
      battleData: null,
    };
  },
  created() {
    wsConnection.addEventListener("message", (msg) => {
      msg = JSON.parse(msg.data);

      switch (msg.type) {
        case "restRoom":
          this.currentView = msg.data.currentView;
          break;
        case "startBattle":
          this.battleData = msg.data;
          break;
        case "roomUpdated":
          this.levels = msg.data.doors;
      }
    });
    this.getRoomUpdated(this.$route.params.id);
    document.querySelector("body").style.backgroundImage =
      "url(http://s3.amazonaws.com/catacombs-game-bucket/assets/images/backgroundblue.png)";
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
    startBattle(item) {
      /* const userId = sessionStorage.getItem("userId"); */
      item.access === "enabled"
        ? this.enterDoor({
            door: item.door,
            floor: item.floor,
            roomId: this.$route.params.id,
          })
        : console.log("sala bloqueada");
      /* enviar as informações para o back e retornar com o a mudança de tela */
    },
    logout() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
.not-allowed {
  cursor: not-allowed;
}
</style>
