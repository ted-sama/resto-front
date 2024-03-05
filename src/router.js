import { createRouter, createWebHistory } from "vue-router";

import Landing from "./views/Landing.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
