import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import daybootRouter from "@/modules/daybook/router";
import authRouter from "@/modules/auth/router";
import isAuthenticatedGuard from "@/modules/auth/router/auth-guard";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/auth",
    ...authRouter,
  },
  {
    path: "/dayboot",
    beforeEnter: [isAuthenticatedGuard],
    ...daybootRouter,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
