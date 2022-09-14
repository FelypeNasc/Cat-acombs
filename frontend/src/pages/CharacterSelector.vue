<template>
  <div class="main bg-cover">
    <div class="header flex flex-row m-2 justify-between">
      <h1 class="brabos font-chainwhacks text-white text-3xl">
        OS BRABOS APENAS
      </h1>
      <MiniButtonComponent>
        <img src="../assets/icons/settings-icon.svg" alt="settings icon" />
      </MiniButtonComponent>
    </div>
    <div class="flex justify-center">
      <img class="h-36" src="src/assets/images/PlayerClassSelectedPrint.svg" />
    </div>
    <div class="main flex flex-row">
      <div class="selected m-3">
        <img src="src/assets/images/CardWarriorPrint.svg" />
      </div>
      <select-class-component class="m-5"></select-class-component>
      <div class="chat m-3">
        <img src="src/assets/images/ChatPrint.svg" />
      </div>
    </div>
    <div class="footer flex justify-center m-4">
      <button
        class="font-squirk bg-white text-3xl rounded-lg flat text-blue-600 h-20 w-40"
      >
        READY !
      </button>
    </div>
  </div>
</template>
<script>
import SelectClassComponent from "../components/SelectClassComponent.vue";
import MiniButtonComponent from "../components/MiniButtonComponent.vue";

export default {
  components: { SelectClassComponent, MiniButtonComponent },
};
</script>
<style scoped>
.main {
  background-image: url("src/assets/images/backgroundblue.png");
}
</style>
