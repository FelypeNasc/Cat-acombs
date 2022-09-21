<template>
  <div class="noselect flex justify-center items-center overflow-hidden">
    <div class="h-full">
      <ClassSelection v-if="currentView === 'classSelection'" />
      <StoryScreen v-if="currentView === 'storyScreen'" />
      <DungeonDoors v-if="currentView === 'dungeonDoors'" />
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
      currentView: "classSelection",
    };
  },
};
</script>
<style></style>
