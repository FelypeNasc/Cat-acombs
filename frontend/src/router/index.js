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
      path: "/doors",
      name: "doors",
      component: () => import("../pages/DungeonDoors.vue"),
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
    {
      path: "/test",
      name: "test",
      component: () => import("../pages/TestPage.vue"),
    },
  ],
});

export default router;
