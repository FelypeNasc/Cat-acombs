<template>
  <div id="RoomComponent" @click="onclick">
    <div id="data">
      <h2>{{ roomName }}</h2>
      <h3>{{ roomCreatorName }}</h3>
    </div>

    <div id="players">
      <img src="../assets/icons/cat-icon.svg" alt="" />
      <h3>{{ numberOfPlayers }}/4</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    roomName: String,
    roomCreatorName: String,
    numberOfPlayers: Number,
  },
  methods: {
    onclick() {
      this.$emit("onclick", {
        roomName: this.roomCreatorName,
        roomCreatorName: this.roomCreatorName,
      });
    },
  },
};
</script>

<style>
#RoomComponent {
  font-family: "Squirk";
  width: 500px;
  height: 80px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px;
  border-radius: 10px;
  color: var(--blue);
  transition: 0.2s;
  cursor: pointer;
}

#players {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#players img {
  width: 30px;
  height: 30px;
}

#RoomComponent:hover {
  background-color: var(--light-blue);
}
</style>
