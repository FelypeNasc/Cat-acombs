<template>
  <div class="main noselect">
    <div class="header flex justify-between items-stretch">
      <div class="w-3/12 min-w-min">
        <h3
          class="font-squirk lg:text-4xl md:text-2xl sm:text-xl stroke-black lobby-text"
        >
          Os brabos apenas
        </h3>
      </div>
      <div class="flex justify-center w-7/12 mb-5">
        <SelectedClassComponent
          :socket-players="selectedClassList"
        ></SelectedClassComponent>
      </div>
      <div class="flex justify-end items-start w-2/12">
        <MiniButtonComponent @onclick="toogleMenu">
          <img src="../assets/icons/settings-icon.svg" alt="settings icon" />
        </MiniButtonComponent>
      </div>
    </div>

    <div class="main bg-cover">
      <div class="main flex flex-row justify-around">
        <div
          class="selected flex flex-col pr-3 items-center w-2/12 lg:min-w-[250px] md:min-w-[150px] sm:min-w-[100px]"
        >
          <img
            v-if="selectedClass"
            class=""
            :src="`src/assets/images/${selectedClass}-card.png`"
          />
        </div>
        <div class="flex flex-col items-center">
          <ClassListComponent
            :class-list="classList"
            class="lg:min-w-[400px] md:min-w-[350px] sm:min-w-[300px]"
            @selectClass="selectClass"
          ></ClassListComponent>
          <button
            class="font-squirk mt-8 bg-white text-3xl rounded-lg flat text-blue-600 h-20 w-40"
          >
            READY !
          </button>
        </div>
        <div class="ml-3"></div>
      </div>
      <div class="footer flex justify-center m-4">
        <button
          class="font-squirk bg-white text-3xl rounded-lg flat text-blue-600 h-20 w-40"
        >
          READY!
        </button>
      </div>
    </div>
    <CardMenu v-if="showMenu" @close="toogleMenu" @confirm="logout" />
  </div>
</template>
<script>
import SelectedClassComponent from "../components/SelectedClassComponent.vue";
import ClassListComponent from "../components/ClassListComponent.vue";
import MiniButtonComponent from "../components/MiniButtonComponent.vue";
import CardMenu from "../components/CardMenu.vue";

export default {
  components: {
    ClassListComponent,
    SelectedClassComponent,
    MiniButtonComponent,
    CardMenu,
  },
  data() {
    return {
      classList: [
        [
          { class: "warrior", route: "../assets/images/warrior-class.svg" },
          { class: "bard", route: "../assets/images/bard-class.svg" },
          { class: "mage", route: "../assets/images/mage-class.svg" },
          { class: "ranger", route: "../assets/images/ranger-class.svg" },
        ],
      ],
      selectedClassList: {
        player1: { name: "joao", class: null },
        player2: { name: "felype", class: null },
        player3: { name: "gislene", class: null },
        player4: { name: "augusto", class: null },
      },
      selectedClass: null,
      showMenu: false,
    };
  },
  methods: {
    toogleMenu() {
      this.showMenu === !this.showMenu;
    },
    logout() {
      this.$router.push("/");
    },
    selectClass(item) {
      this.selectedClass = item.class;
      this.selectedClassList["player2"].class = item.class;
      console.log(item);
    },
    getUsersSocket() {},
    socketClassChange() {},
  },
};
</script>
<style scoped>
.main {
  height: 100vh;
  overflow-y: hidden;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20;
  font-family: "Chainwhacks";
  font-size: 30px;
  color: white;
}
.logo {
  width: 18%;
}
.config {
  width: 5%;
}

.tableRoom {
  display: flex;
  justify-content: center;
}

td {
  border: 20px solid rgba(221, 221, 221, 0);
}
</style>
