<template>
  <div id="RoomComponent" @click="onclick">
    <div id="data">
      <h2>{{ roomData?.roomName }}</h2>
      <h3>{{ roomData?.adminUsername }}</h3>
    </div>

    <div id="players">
      <img src="http://s3.amazonaws.com/catacombs-game-bucket/assets/icons/cat-icon.svg" alt="" />
      <h3>{{ playersNumber }}/4</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    roomData: { type: Object, default: () => {} },
  },
  computed: {
    playersNumber() {
      return this.roomData?.players?.length ?? 0;
    },
  },
  methods: {
    onclick() {
      this.$emit("onclick", this.roomData);
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
