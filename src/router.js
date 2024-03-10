import { createRouter, createWebHistory } from "vue-router";

import Landing from "./views/LandingView.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("./views/LoginView.vue"),
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("./views/TestView.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
