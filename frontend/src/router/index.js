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
      path: "/lobby",
      name: "lobby",
      component: () => import("../pages/GameLobby.vue"),
    },
    {
      path: "/play/:id",
      name: "play",
      component: () => import("../pages/SessionController.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../pages/TestPage.vue"),
    },
  ],
});

export default router;
