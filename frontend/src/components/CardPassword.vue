<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 pin z-50 overflow-auto bg-smoke-black flex w-full m-auto items-center justify-center"
    @click.self="close"
  >
    <div
      class="bg-white flex flex-col min-h-min content-between justify-between max-h-96 p-8 md:w-5/12 lg:w-4/12 xl:w-3/12 rounded-lg card-shadow"
    >
      <div class="flex flex-col justify-center items-center text-center mb-10">
        <h2>Senha</h2>
        <input
          v-model="password"
          type="password"
          class="card-input-background rounded-md mb-5 w-11/12 h-3/12 p-2 text-lg max-w-min"
          v-on:keyup.enter="confirm"
        />
      </div>
      <div class="flex justify-center content-center">
        <button class="btn-confirm-color w-6/12 rounded-md" @click="confirm">
          OK!
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    roomData: { type: Object, default: () => {} },
  },
  data() {
    return {
      password: "",
    };
  },
  methods: {
    confirm() {
      const password = this.password;
      this.$emit("confirm", { ...this.roomData, password });
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style scoped>
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
