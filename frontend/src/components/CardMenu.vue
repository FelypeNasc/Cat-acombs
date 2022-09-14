<template>
  <div
    class="fixed inset-0 justify-center contet-center items-center bg-black bg-opacity-50 pin z-50 overflow-auto bg-smoke-black flex h-full w-full m-auto"
    @click.self="close"
  >
    <div
      class="bg-white flex flex-col justify-center content-center p-8 sm:w-5/12 md:w-4/12 lg:w-3/12 h-48 rounded-lg card-shadow"
    >
      <VolumeComponent></VolumeComponent>
      <div class="flex justify-center content-center mt-10">
        <ButtonComponent
          text="Sair"
          mode="red"
          @onclick="confirm"
        ></ButtonComponent>
      </div>
    </div>
  </div>
</template>
<script>
import VolumeComponent from "../components/VolumeComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
export default {
  components: {
    VolumeComponent,
    ButtonComponent,
  },
  data() {
    return {};
  },

  methods: {
    confirm() {
      this.$emit("confirm");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style scoped>
.card-input-brackground {
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
