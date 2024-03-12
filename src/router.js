import { createRouter, createWebHistory } from "vue-router";

import Landing from "./views/Landing.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('./views/RegisterView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('./views/Homeview.vue')
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
