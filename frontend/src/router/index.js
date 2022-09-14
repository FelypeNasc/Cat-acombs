import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../pages/TitleScreen.vue"),
    },
    {
      path: "/door1",
      name: "door1",
      component: () => import("../pages/DungeonDoors1.vue"),
    },
    {
      path: "/door2",
      name: "door2",
      component: () => import("../pages/DungeonDoors2.vue"),
    },
    {
      path: "/door3",
      name: "door3",
      component: () => import("../pages/DungeonDoors3.vue"),
    },
    {
      path: "/combat",
      name: "combat",
      component: () => import("../pages/EncounterCombat.vue"),
    },
    {
      path: "/lobby",
      name: "lobby",
      component: () => import("../pages/GameLobby.vue"),
    },
    {
      path: "/story",
      name: "story",
      component: () => import("../pages/StoryScreen.vue"),
    },
    {
      path: "/characters",
      name: "characters",
      component: () => import("../pages/CharacterSelector.vue"),
    },
  ],
});

export default router;
