<template>
  <div class="noselect flex justify-between items-center overflow-hidden">
    <div class="h-full w-full">
      <ClassSelection v-if="currentView === 'class'" />
      <StoryScreen v-if="currentView === 'story'" />
      <DungeonDoors v-if="currentView === 'doors'" />
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
      currentView: "combat",
    };
  },
};
</script>
<style scoped></style>
