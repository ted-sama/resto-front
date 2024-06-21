import { createRouter, createWebHistory } from "vue-router";

import Landing from "@/views/LandingView.vue";

const routes = [
  {
    path: "/",
    name: "landing",
    component: Landing,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/shop/LoginView.vue"),
    meta: {
      skipIfLoggedIn: true,
      title: "Se connecter",
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/shop/RegisterView.vue"),
    meta: {
      skipIfLoggedIn: true,
      title: "S'incrire",
    },
  },
  {
    path: "/shop",
    name: "shop",
    component: () => import("@/views/shop/ShopHomeView.vue"),
    meta: {
      requiresAuth: true,
      title: "Boutique",
    },
  },
  {
    path: "/shop/foods",
    name: "shop-foods",
    component: () => import("@/views/shop/ShopFoodsView.vue"),
    meta: {
      requiresAuth: true,
      title: "Boutique - Tout les plats",
    },
  },
  {
    path: "/shop/results",
    name: "shop-search-results",
    component: () => import("@/views/shop/SearchView.vue"),
    meta: {
      requiresAuth: true,
      title: "Boutique - Resultats de recherche",
    },
  },
  {
    path: "/shop/cart",
    name: "cart",
    component: () => import("@/views/shop/CartView.vue"),
    meta: {
      requiresAuth: true,
      title: "Panier",
    },
  },
  {
    path: "/shop/checkout",
    name: "checkout",
    component: () => import("@/views/shop/CheckoutView.vue"),
    meta: {
      requiresAuth: true,
      title: "Passer la commande",
    },
  },
  {
    path: "/account/orders",
    name: "orders",
    component: () => import("@/views/shop/OrdersView.vue"),
    meta: {
      requiresAuth: true,
      title: "Mes commandes",
    },
  },
  {
    path: "/account/orders/:id",
    name: "orders-details",
    component: () => import("@/views/shop/OrderDetailsView.vue"),
    meta: {
      requiresAuth: true,
      title: "Détails de commande",
    },
  },
  {
    path: "/admin/login",
    name: "admin-login",
    component: () => import("@/views/admin/LoginView.vue"),
    meta: {
      skipIfAdminLoggedIn: true,
      title: "Se connecter",
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin/DashboardView.vue"),
    meta: {
      requiresAdminAuth: true,
      title: "Tableau de bord",
    },
  },
  {
    path: "/admin/users",
    name: "admin-users",
    component: () => import("@/views/admin/ManageUserView.vue"),
    meta: {
      requiresAdminAuth: true,
      title: "Gestion des utilisateurs",
    },
  },
  {
    path: "/admin/categories",
    name: "admin-categories",
    component: () => import("@/views/admin/ManageCategoriesView.vue"),
    meta: {
      requiresAdminAuth: true,
      title: "Gestion des catégories",
    },
  },
  {
    path: "/admin/foods",
    name: "admin-foods",
    component: () => import("@/views/admin/ManageFoodsView.vue"),
    meta: {
      requiresAdminAuth: true,
      title: "Gestion des plats",
    },
  },
  {
    path: "/admin/orders",
    name: "admin-orders",
    component: () => import("@/views/admin/ManageOrdersView.vue"),
    meta: {
      requiresAdminAuth: true,
      title: "Gestion des commandes",
    },
  },
  {
    path: "/admin/orders/:id",
    name: "admin-orders-details",
    component: () => import("@/views/admin/AdminOrderDetailsView.vue"),
    meta: {
      requiresAdminAuth: true,
      title: "Détails de commande",
    },
  },
  {
    path: "/admin/reviews",
    name: "admin-reviews",
    component: () => import("@/views/admin/ManageReviewsView.vue"),
    meta: {
      requiresAdminAuth: true,
      title: "Gestion des avis",
    },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthentificated = localStorage.getItem("token");

  // if meta title is defined, set document title else set default title
  if (to.meta.title) {
    document.title = to.meta.title + " | Miamiam";
  } else {
    document.title = "Miamiam";
  }

  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    const expires_at = localStorage.getItem("expires_at");

    if (token && expires_at) {
      if (expires_at < Date.now()) {
        localStorage.clear();
        if (to.name === "landing") {
          next({ name: "landing" });
        } else {
          next({ name: "login" });
        }
      }
    }
  }

  if (to.name === "landing" && isAuthentificated) {
    next({ name: "shop" });
  } else if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthentificated
  ) {
    next({ name: "login" });
  } else if (
    to.matched.some((record) => record.meta.skipIfLoggedIn) &&
    isAuthentificated
  ) {
    next({ name: "shop" });
  } else if (
    to.matched.some((record) => record.meta.requiresAdminAuth) &&
    !isAuthentificated
  ) {
    next({ name: "admin-login" });
  } else if (
    to.matched.some((record) => record.meta.requiresAdminAuth) &&
    isAuthentificated &&
    localStorage.getItem("isAdmin") !== "true"
  ) {
    next({ name: "shop" });
  } else if (
    to.matched.some((record) => record.meta.skipIfAdminLoggedIn) &&
    isAuthentificated
  ) {
    next({ name: "admin" });
  } else {
    next();
  }
});

export default router;
