<template>
  <div class="noselect flex justify-between items-center overflow-hidden">
    <div class="h-full w-full">
      <ClassSelection v-if="currentView === 'class'" />
      <StoryScreen v-if="currentView === 'story'" :text="storyText" />
      <DungeonDoors v-if="currentView === 'doors'" />
      <EncounterCombat
        v-if="currentView === 'combat'"
        :battle-data="battleData"
      />
      <TestPage v-if="currentView === 'test'" />
    </div>
    <div v-if="currentView !== 'story'" class="chat-container w-max">
      <ChatComponent />
    </div>
  </div>
</template>
<script>
import ClassSelection from "./ClassSelection.vue";
import EncounterCombat from "./EncounterCombat.vue";
import DungeonDoors from "./DungeonDoors.vue";
import StoryScreen from "./StoryScreen.vue";
import TestPage from "./TestPage.vue";
import ChatComponent from "../components/ChatComponent.vue";
import { wsConnection } from "../connection/connections";
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
      currentView: "class",
      storyText: null,
      battleData: {},
    };
  },
  created() {
    wsConnection.addEventListener("message", (msg) => {
      msg = JSON.parse(msg.data);

      switch (msg.type) {
        case "roomUpdated":
          this.storyText = msg?.data?.storyText ?? null;
          this.currentView = msg?.data?.currentView;
          break;
        case "battleUpdated":
          this.battleData = msg?.data;
          break;
      }
    });
  },
};
</script>
<style scoped></style>
