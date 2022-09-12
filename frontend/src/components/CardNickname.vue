<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 pin z-50 overflow-auto bg-smoke-black flex w-full m-auto"
  >
    <div
      class="bg-white p-2 lg:w-3/12 xl:w-3/12 2xl:w-2/12 h-48 rounded-lg card-shadow"
    >
      <h2 class="text-2xl">Nickname</h2>
      <input
        v-model="nickname"
        type="text"
        class="card-input-background rounded-md w-11/12"
      />
      <button
        class="btn-confirm-color w-6/12 rounded-md m-5 p-0.5 text-2xl"
        @click="confirm"
      >
        OK!
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nickname: "",
    };
  },
  methods: {
    confirm() {
      const nickname = this.nickname;
      this.$emit("confirm", nickname);
    },
  },
};
</script>
<style scoped>
input:focus {
  color: red;
}

.card-input-background {
  background: #c7cde2;
  max-width: 100%;
}
.card-shadow {
  font-family: "Squirk";
  font-size: 1.7rem;
  box-shadow: 0 5px #2c3c8c;
  color: #2c3c8c;
}
.btn-confirm-color {
  background-color: #2c3c8c;
  color: white;
  box-shadow: 0 5px #1a2661;
}
.btn-confirm-color:active {
  box-shadow: 0 2px #1a2661;
}
</style>
