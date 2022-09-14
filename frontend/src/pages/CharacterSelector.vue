<template>
  <div class="main">
    <div class="header">
      <h1 class="font-squirk text-6xl stroke-black lobby-text">
        Os brabos apenas
      </h1>
      <div class="w-1/3 flex justify-end items-center">
        <MiniButtonComponent>
          <img src="../assets/icons/settings-icon.svg" alt="settings icon" />
        </MiniButtonComponent>
      </div>
    </div>
    <div class="flex justify-center">
      <SelectedCharacters></SelectedCharacters>
    </div>
  </div>
</template>
<script>
import SelectedCharacters from "../components/SelectedCharacters.vue";
import MiniButtonComponent from "../components/MiniButtonComponent.vue";
export default {
  components: { SelectedCharacters, MiniButtonComponent },
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
