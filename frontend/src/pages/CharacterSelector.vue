<template>
  <div class="main bg-cover">
    <div class="header flex flex-row justify-between align-center m-14">
      <h1 class="brabos font-chainwhacks text-white text-3xl">
        OS BRABOS APENAS
      </h1>

      <img class="h-36" src="src/assets/images/PlayerClassSelectedPrint.svg" />

      <img class="config w-10" src="src/assets/icons/settings-icon.svg" />
    </div>
    <div class="main flex flex-row justify-between">
      <div class="selected m-3">
        <img src="src/assets/images/CardWarriorPrint.svg" />
      </div>
      <select-class-component class="m-5"></select-class-component>
      <div class="chat m-3">
        <img src="src/assets/images/ChatPrint.svg" />
      </div>
    </div>
    <div class="footer flex justify-center m-14">
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

export default {
  components: { SelectClassComponent },
};
</script>
<style scoped>
.main {
  background-image: url("src/assets/images/backgroundblue.png");
}
</style>
