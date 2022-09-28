<template>
  <div
    class="fixed inset-0 justify-center contet-center items-center bg-black bg-opacity-50 pin z-50 overflow-auto bg-smoke-black flex h-full w-full m-auto"
    @click.self="close"
  >
    <div
      class="bg-white p-2 lg:w-3/12 xl:w-3/12 2xl:w-2/12 h-48 rounded-lg card-shadow flex flex-col justify-center items-center"
    >
      <h2 class="text-2xl">Nickname</h2>
      <input
        v-model="nickname"
        type="text"
        maxlength="10"
        class="card-input-background rounded-md mb-5 w-11/12 h-3/12 p-2 text-lg"
        v-on:keyup.enter="confirm"
      />
      <ButtonComponent text="Ok!" mode="dark" :buttonFunction="confirm" />
    </div>
  </div>
</template>
<script>
import ButtonComponent from "./ButtonComponent.vue";
export default {
  components: { ButtonComponent },
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
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style scoped>
input:focus {
  border-color: var(--blue);
}

.card-input-background {
  background: #c7cde2;
  max-width: 100%;
}
.card-shadow {
  font-family: "Squirk";
  font-size: 1.7rem;
  box-shadow: 0 5px var(--blue);
  color: var(--blue);
}
.btn-confirm-color {
  background-color: var(--blue);
  color: white;
  box-shadow: 0 5px var(--dark-blue);
  transition: 0.1s;
}

.btn-confirm-color:active {
  background-color: var(--light-blue);
  color: var(--blue);
  box-shadow: 0 2px var(--dark-blue);
}
</style>
