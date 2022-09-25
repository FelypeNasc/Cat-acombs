<template>
  <div class="noselect flex justify-between items-center overflow-hidden">
    <div class="h-full">
      <ClassSelection v-if="currentView === 'classSelection'" />
      <StoryScreen v-if="currentView === 'storyScreen'" />
      <DungeonDoors v-if="currentView === 'dungeonDoors'" />
      <EncounterCombat v-if="currentView === 'combat'" />
      <TestPage v-if="currentView === 'test'" />
    </div>
    <div class="chat-container w-max"><ChatComponent /></div>
  </div>
</template>
<script>
import ClassSelection from "./ClassSelection.vue";
import EncounterCombat from "./EncounterCombat.vue";
import DungeonDoors from "./DungeonDoors.vue";
import StoryScreen from "./StoryScreen.vue";
import TestPage from "./TestPage.vue";
import ChatComponent from "../components/ChatComponent.vue";
export default {
  components: {
    ClassSelection,
    EncounterCombat,
    DungeonDoors,
    StoryScreen,
    ChatComponent,
    TestPage,
  },
  data() {
    return {
      currentView: "classSelection",
    };
  },
  // mounted() {
  //   this.setBackground();
  // },
  // methods: {
  //   setBackground() {
  //     document.querySelector(
  //       "body"
  //     ).style.backgroundImage = `url(src/assets/images/backgroundblue.png)`;
  //   },
  // },
};
</script>
<style scoped></style>
