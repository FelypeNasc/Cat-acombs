<template>
  <div class="main noselect flex flex-col">
    <header class="header flex justify-center mt-4 mb-10 noselect">
      <div class="w-1/3 flex justify-start items-center">
        <img class="w-44" src="src/assets/images/logo.svg" />
      </div>
      <div class="w-1/3 flex justify-center items-center">
        <h2 class="font-squirk text-6xl stroke-black lobby-text">GAME LOBBY</h2>
      </div>
      <div class="w-1/3 flex justify-end items-center">
        <MiniButtonComponent @onclick="toogleMenu">
          <img src="../assets/icons/settings-icon.svg" alt="settings icon" />
        </MiniButtonComponent>
      </div>
    </header>
    <div class="flex flex-col justify-center items-center w-full">
      <div class="w-max">
        <div class="inline-flex w-full justify-end">
          <MiniButtonComponent @onclick="getRoomList()">
            <img src="../assets/icons/refresh-icon.svg" alt="refresh icon" />
          </MiniButtonComponent>
          <ButtonComponent
            text="Criar Sala"
            class="mx-5"
            @onclick="toogleCreateRoom"
          />
        </div>
        <div
          class="table-container my-6 grid grid-cols-2 items-center justify-items-center"
        >
          <RoomComponent
            v-for="(room, index) in currentPageRooms"
            v-bind:key="index"
            :roomName="room.roomName"
            :numberOfPlayers="room.players.length"
            :roomCreatorName="room.creatorName"
          />
        </div>
        <div class="inline-flex w-full justify-end">
          <MiniButtonComponent
            shape="circle"
            @onclick="changePageNumber('minus')"
          >
            <img src="../assets/icons/arrow-left.svg" alt="left arrow" />
          </MiniButtonComponent>
          <div
            class="bg-white rounded-md mx-4 page-display font-squirk flex justify-center items-center text-2xl"
          >
            <p>{{ pageNumber }}</p>
          </div>
          <MiniButtonComponent
            shape="circle"
            class="mr-4"
            @onclick="changePageNumber('plus')"
          >
            <img src="../assets/icons/right-arrow.svg" alt="right arrow" />
          </MiniButtonComponent>
        </div>
      </div>
    </div>
    <CardCreateRoom
      v-if="showCreateRoom"
      @close="toogleCreateRoom"
      @confirm="createRoom()"
    />
    <CardMenu v-if="showMenu" @close="toogleMenu" @confirm="logout" />
  </div>
</template>
<script>
import RoomComponent from "../components/RoomComponent.vue";
import MiniButtonComponent from "../components/MiniButtonComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import CardMenu from "../components/CardMenu.vue";
import CardCreateRoom from "../components/CardCreateRoom.vue";
import {
  wsConnection,
  getRoomList,
  createRoom,
} from "../connection/connections";

export default {
  components: {
    RoomComponent,
    MiniButtonComponent,
    ButtonComponent,
    CardMenu,
    CardCreateRoom,
  },
  data() {
    return {
      createRoom,
      getRoomList,
      rooms: [],
      pageNumber: 1,
      pageSize: 10,
      showMenu: false,
      showCreateRoom: false,
    };
  },
  created() {
    this.getRoomList();

    // ws listeners
    wsConnection.addEventListener("message", (msg) => {
      console.log("GET ROOMS", msg);
      msg = JSON.parse(msg.data);
      console.log(msg);

      switch (msg.type) {
        case "getRooms":
          this.rooms = msg.data;
          break;
        case "roomCreated":
          this.$router.push({ path: `/characters/${msg.data.id}` });
      }
    });
  },
  computed: {
    pageTotal() {
      return Math.ceil(this.rooms.length / this.pageSize);
    },
    currentPageRooms() {
      const pageMax = this.pageNumber * this.pageSize;
      const pageMin = pageMax - this.pageSize;
      return this.rooms.slice(pageMin, pageMax);
    },
  },
  methods: {
    changePageNumber(operation) {
      const increasePageNumber = () => {
        if (this.pageNumber !== this.pageTotal) {
          this.pageNumber++;
        }
      };
      const decreasePageNumber = () => {
        if (this.pageNumber !== 1) {
          this.pageNumber--;
        }
      };
      operation === "plus" ? increasePageNumber() : decreasePageNumber();
    },
    createNewRoom(roomData) {
      console.log(roomData);
      this.toogleCreateRoom();
    },
    redirectToCharacters() {
      console.log("aqui");
      this.$router.push("/characters");
    },
    logout() {
      this.$router.push("/");
    },
    toogleMenu() {
      this.showMenu = !this.showMenu;
    },
    refreshRooms() {
      console.log("refreshRooms");
    },
    toogleCreateRoom() {
      this.showCreateRoom = !this.showCreateRoom;
    },
  },
};
</script>
<style scoped>
.page-display {
  color: var(--blue);
  width: 5%;
  box-shadow: 0 4px var(--blue);
}
.lobby-text {
  color: white;
}
.table-container {
  min-width: 1070px;
  min-height: 540px;
  background-color: var(--blue);
  border-radius: 6px;
}
td {
  border: 20px solid rgba(221, 221, 221, 0);
}
</style>
