<template>
  <div class="noselect flex justify-between items-center overflow-hidden">
    <div class="h-full">
      <ClassSelection v-if="currentView === 'class'" />
      <StoryScreen v-if="currentView === 'story'" />
      <DungeonDoors v-if="currentView === 'doors'" />
      <EncounterCombat v-if="currentView === 'combat'" />
    </div>
    <div class="chat-container w-max"><ChatComponent /></div>
  </div>
</template>
<script>
import ClassSelection from "./ClassSelection.vue";
import EncounterCombat from "./EncounterCombat.vue";
import DungeonDoors from "./DungeonDoors.vue";
import StoryScreen from "./StoryScreen.vue";
import ChatComponent from "../components/ChatComponent.vue";
export default {
  components: {
    ClassSelection,
    EncounterCombat,
    DungeonDoors,
    StoryScreen,
    ChatComponent,
  },
  data() {
    return {
      currentView: "class",
    };
  },
};
</script>
<style></style>
