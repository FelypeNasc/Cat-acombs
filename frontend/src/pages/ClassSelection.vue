<template>
  <div class="main noselect">
    <div class="header flex justify-between items-stretch">
      <div class="w-3/12 min-w-min">
        <h3
          class="font-squirk lg:text-4xl md:text-2xl sm:text-xl stroke-black lobby-text"
        >
          {{ roomName }}
        </h3>
      </div>
      <div class="flex justify-center w-7/12 mb-5">
        <SelectedClassComponent
          :socket-players="selectedClassList"
        ></SelectedClassComponent>
      </div>
      <div class="flex justify-end items-start w-2/12">
        <MiniButtonComponent @onclick="toogleMenu">
          <img src="http://s3.amazonaws.com/catacombs-game-bucket/assets/icons/settings-icon.svg" alt="settings icon" />
        </MiniButtonComponent>
      </div>
    </div>

    <div class="main bg-cover">
      <div class="main flex flex-row justify-around">
        <div
          class="selected flex flex-col pr-3 items-center w-2/12 lg:min-w-[250px] md:min-w-[150px] sm:min-w-[100px]"
        >
          <img
            v-if="selectedClass === 'warrior'"
            class=""
            src="http://s3.amazonaws.com/catacombs-game-bucket/assets/images/warrior-card.png"
          />
          <img
            v-if="selectedClass === 'bard'"
            class=""
            src="http://s3.amazonaws.com/catacombs-game-bucket/assets/images/bard-card.png"
          />
          <img
            v-if="selectedClass === 'mage'"
            class=""
            src="http://s3.amazonaws.com/catacombs-game-bucket/assets/images/mage-card.png"
          />
          <img
            v-if="selectedClass === 'ranger'"
            class=""
            src="http://s3.amazonaws.com/catacombs-game-bucket/assets/images/ranger-card.png"
          />
        </div>
        <div class="flex flex-col items-center">
          <ClassListComponent
            :class-list="classList"
            class="lg:min-w-[400px] md:min-w-[350px] sm:min-w-[300px]"
            @selectClass="selectionClass"
          ></ClassListComponent>
          <ButtonComponent
            :text="'READY !'"
            class="font-squirk mt-8 text-3xl rounded-lg flat h-20 w-40"
            :disabled="!selectedClass"
            :buttonFunction="readySection"
          />
        </div>
        <div class="ml-3"></div>
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
import ButtonComponent from "../components/ButtonComponent.vue";
import { wsConnection } from "../connection/connections";
import { selectClass, ready } from "../connection/classSelection.methods";
import { getRoomUpdated } from "../connection/room.methods";

export default {
  components: {
    ButtonComponent,
    ClassListComponent,
    SelectedClassComponent,
    MiniButtonComponent,
    CardMenu,
  },
  data() {
    return {
      getRoomUpdated,
      roomName: "",
      classList: [
        [
          { class: "warrior", route: "http://s3.amazonaws.com/catacombs-game-bucket/assets/images/warrior-class.png" },
          { class: "bard", route: "http://s3.amazonaws.com/catacombs-game-bucket/assets/images/bard-class.png" },
          { class: "mage", route: "http://s3.amazonaws.com/catacombs-game-bucket/assets/images/mage-class.png" },
          { class: "ranger", route: "http://s3.amazonaws.com/catacombs-game-bucket/assets/images/ranger-class.png" },
        ],
      ],
      selectedClassList: {},
      selectedClass: null,
      showMenu: false,
      selectClass,
      ready,
    };
  },
  created() {
    wsConnection.addEventListener("message", (msg) => {
      msg = JSON.parse(msg.data);

      switch (msg.type) {
        case "getRooms":
          this.rooms = msg.data;
          break;
        case "roomCreated":
          this.$router.push({ path: `/play/${msg.data.id}` });
          break;
        case "roomUpdated":
          this.roomName = msg.data.roomName;
          break;
        case "classSelected":
          this.selectedClassList = msg.data;
          break;
        case "ready":
          this.selectedClassList = msg.data;
          break;
        case "allReady":
          this.$router.push({ path: `/play/encounter` });
          break;
      }
    });
    this.getRoomUpdated(this.$route.params.id);
    this.getCharactersSelected();
  },
  methods: {
    toogleMenu() {
      this.showMenu = !this.showMenu;
    },
    logout() {
      this.$router.push("/");
    },
    selectionClass(item) {
      this.selectedClass = item.class;
      const roomId = this.$route.params.id;
      const userId = sessionStorage.getItem("userId");
      const username = sessionStorage.getItem("username");
      const roomData = { roomId, userId, username, class: item.class };
      this.selectClass(roomData);
    },
    getCharactersSelected() {
      this.selectedClass = null;
      const roomId = this.$route.params.id;
      const userId = sessionStorage.getItem("userId");
      const username = sessionStorage.getItem("username");
      const roomData = { roomId, userId, username, class: this.selectedClass };
      this.selectClass(roomData);
    },
    readySection() {
      if (this.selectedClass) {
        const roomId = this.$route.params.id;
        const roomData = {
          roomId,
        };
        this.ready(roomData);
      }
    },
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
.ready-btn-color {
  color: var(--dark-blue);
}
.tableRoom {
  display: flex;
  justify-content: center;
}

td {
  border: 20px solid rgba(221, 221, 221, 0);
}
</style>
