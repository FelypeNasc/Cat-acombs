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
        <MiniButtonComponent>
          <img src="../assets/icons/settings-icon.svg" alt="settings icon" />
        </MiniButtonComponent>
      </div>
    </header>
    <div class="flex flex-col justify-center items-center w-full">
      <div class="w-max">
        <div class="inline-flex w-full justify-end">
          <MiniButtonComponent>
            <img src="../assets/icons/refresh-icon.svg" alt="refresh icon" />
          </MiniButtonComponent>
          <ButtonComponent text="Criar Sala" class="mx-5" />
        </div>
        <table class="table-room">
          <tbody>
            <tr v-for="(room, index) in rooms" v-bind:key="index">
              <td v-if="index % 2 === 0">
                <RoomComponent
                  :roomName="room.roomName"
                  :numberOfPlayers="room.players.length"
                  :roomCreatorName="room.creatorName"
                />
              </td>
              <td v-if="index % 2 === 0">
                <RoomComponent
                  :roomName="rooms[index + 1].roomName"
                  :numberOfPlayers="rooms[index + 1].players.length"
                  :roomCreatorName="rooms[index + 1].creatorName"
                />
              </td>
            </tr>
          </tbody>
        </table>
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
  </div>
</template>
<script>
import RoomComponent from "../components/RoomComponent.vue";
import MiniButtonComponent from "../components/MiniButtonComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
export default {
  components: {
    RoomComponent,
    MiniButtonComponent,
    ButtonComponent,
  },
  data() {
    return {
      rooms: [
        {
          id: "1",
          roomName: "OS BRABOS",
          creatorName: "juao",
          players: [
            {
              id: "1",
              username: "juao",
              class: "warrior",
            },
            {
              id: "2",
              username: "maria",
              class: "warrior",
            },
          ],
        },
        {
          id: "2",
          roomName: "OS BRABOS 2",
          creatorName: "juao",
          players: [
            {
              id: "1",
              username: "juao",
              class: "warrior",
            },
            {
              id: "2",
              username: "maria",
              class: "warrior",
            },
          ],
        },
        {
          id: "3",
          roomName: "OS BRABOS 3",
          creatorName: "juao",
          players: [
            {
              id: "1",
              username: "juao",
              class: "warrior",
            },
            {
              id: "2",
              username: "maria",
              class: "warrior",
            },
          ],
        },
        {
          id: "4",
          roomName: "OS BRABOS 4",
          creatorName: "juao",
          players: [
            {
              id: "1",
              username: "juao",
              class: "warrior",
            },
            {
              id: "2",
              username: "maria",
              class: "warrior",
            },
          ],
        },
        {
          id: "5",
          roomName: "OS BRABOS 5",
          creatorName: "juao",
          players: [
            {
              id: "1",
              username: "juao",
              class: "warrior",
            },
            {
              id: "2",
              username: "maria",
              class: "warrior",
            },
          ],
        },
        {
          id: "6",
          roomName: "OS BRABOS 6",
          creatorName: "juao",
          players: [
            {
              id: "1",
              username: "juao",
              class: "warrior",
            },
            {
              id: "2",
              username: "maria",
              class: "warrior",
            },
          ],
        },
        {
          id: "7",
          roomName: "OS BRABOS 7",
          creatorName: "juao",
          players: [
            {
              id: "1",
              username: "juao",
              class: "warrior",
            },
            {
              id: "2",
              username: "maria",
              class: "warrior",
            },
          ],
        },
        {
          id: "8",
          roomName: "OS BRABOS 8",
          creatorName: "juao",
          players: [
            {
              id: "1",
              username: "juao",
              class: "warrior",
            },
            {
              id: "2",
              username: "maria",
              class: "warrior",
            },
          ],
        },
        {
          id: "9",
          roomName: "OS BRABOS 9",
          creatorName: "juao",
          players: [
            {
              id: "1",
              username: "juao",
              class: "warrior",
            },
            {
              id: "2",
              username: "maria",
              class: "warrior",
            },
          ],
        },
        {
          id: "10",
          roomName: "OS BRABOS 11",
          creatorName: "juao",
          players: [
            {
              id: "1",
              username: "juao",
              class: "warrior",
            },
            {
              id: "2",
              username: "maria",
              class: "warrior",
            },
          ],
        },
      ],
      pageNumber: 1,
    };
  },
  created() {
    return;
  },
  computed: {
    pageTotal() {
      return Math.ceil(this.rooms.length / 10);
    },
    currentPageRooms() {
      const pageMax = this.pageNumber * 10;
      const pageMin = pageMax - 9;
      const pageRooms = this.rooms.slice(pageMin, pageMax);
      return pageRooms;
    },
  },
  methods: {
    changePageNumber(operation) {
      operation === "plus" ? this.pageNumber++ : this.pageNumber--;
      console.log(this.pageNumber);
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
.table-room {
  display: flex;
  justify-content: center;
}
td {
  border: 20px solid rgba(221, 221, 221, 0);
}
</style>
