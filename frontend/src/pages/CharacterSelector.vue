<template>
  <div class="main">
    <div class="header flex justify-between items-stretch">
      <div class="w-3/12 min-w-min">
        <h3
          class="font-squirk lg:text-4xl md:text-2xl sm:text-xl stroke-black lobby-text"
        >
          Os brabos apenas
        </h3>
      </div>
      <div class="flex justify-center w-7/12">
        <SelectedCharacters></SelectedCharacters>
      </div>
      <div class="flex justify-end items-start w-2/12">
        <MiniButtonComponent @onclick="toogleMenu">
          <img src="../assets/icons/settings-icon.svg" alt="settings icon" />
        </MiniButtonComponent>
      </div>
    </div>

    <div class="main bg-cover">
      <div class="main flex flex-row">
        <div
          class="selected m-3 w-4/12 lg:min-w-[200px] md:min-w-[150px] sm:min-w-[100px]"
        >
          <img src="src/assets/images/CardWarriorPrint.svg" />
        </div>
        <SelectClassComponent
          :character-list="characterList"
          class="m-5 lg:min-w-[400px] md:min-w-[350px] sm:min-w-[300px]"
        ></SelectClassComponent>
        <div class="chat m-3">
          <img src="src/assets/images/ChatPrint.svg" />
        </div>
      </div>
      <div class="footer flex justify-center m-4">
        <button
          class="font-squirk bg-white text-3xl rounded-lg flat text-blue-600 h-20 w-40"
        >
          READY !
        </button>
      </div>
    </div>
    <CardMenu v-if="showMenu" @close="toogleMenu" @confirm="logout" />
  </div>
</template>
<script>
import SelectClassComponent from "../components/SelectClassComponent.vue";
import SelectedCharacters from "../components/SelectedCharacters.vue";
import MiniButtonComponent from "../components/MiniButtonComponent.vue";
import CardMenu from "../components/CardMenu.vue";

export default {
  components: {
    SelectClassComponent,
    SelectedCharacters,
    MiniButtonComponent,
    CardMenu,
  },
  data() {
    return {
      characterList: [
        [
          { class: "warrior" },
          { class: "bard" },
          { class: "mage" },
          { class: "ranger" },
        ],
        [
          { class: "warrior" },
          { class: "bard" },
          { class: "mage" },
          { class: "ranger" },
        ],
        [
          { class: "warrior" },
          { class: "bard" },
          { class: "mage" },
          { class: "ranger" },
        ],
      ],
      showMenu: false,
    };
  },
  methods: {
    toogleMenu() {
      this.showMenu === true ? (this.showMenu = false) : (this.showMenu = true);
    },
    logout() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.main {
  height: 100vh;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px;
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
