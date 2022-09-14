<template>
  <div class="main">
    <div class="header">
      <img class="logo" src="src/assets/images/logo.svg" />
      <h1>GAME LOBBY</h1>
      <img class="config" src="src/assets/icons/config-icon.svg" />
    </div>
    <div>
      <table class="tableRoom">
        <tbody>
          <tr>
            <td class="roomd">
              <RoomComponent
                :roomName="'Sala 1'"
                :numberOfPlayers="3"
                :roomCreatorName="'Eu'"
              ></RoomComponent>
            </td>
            <td class="roome">
              <RoomComponent
                :roomName="'Sala 2'"
                :numberOfPlayers="1"
                :roomCreatorName="'Nos'"
              ></RoomComponent>
            </td>
          </tr>
          <tr>
            <td class="roomd">
              <RoomComponent
                :roomName="'Sala 3'"
                :numberOfPlayers="2"
                :roomCreatorName="'Tu'"
              ></RoomComponent>
            </td>
            <td class="roome">
              <RoomComponent
                :roomName="'Sala 4'"
                :numberOfPlayers="4"
                :roomCreatorName="'Eles'"
              ></RoomComponent>
            </td>
          </tr>
          <tr>
            <td class="roomd">
              <RoomComponent
                :roomName="'Sala 5'"
                :numberOfPlayers="2"
                :roomCreatorName="'Elas'"
              ></RoomComponent>
            </td>
            <td class="roome">
              <RoomComponent
                :roomName="'Sala 6'"
                :numberOfPlayers="1"
                :roomCreatorName="'Forever Alone'"
              ></RoomComponent>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import RoomComponent from "../components/RoomComponent.vue";
export default {
  components: { RoomComponent },
};
</script>
<style>
.main {
  background-image: url("src/assets/images/backgroundblue.png");
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
