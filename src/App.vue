<script setup>
import Navbar from "@/components/Navbar.vue";
import AdminNavbar from "@/components/AdminNavbar.vue";
import ShopNavbar from "@/components/ShopNavbar.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";

const showNavbar = ["landing"];
const showAdminNavbar = [
  "admin",
  "admin-users",
  "admin-categories",
  "admin-foods",
  "admin-orders",
  "admin-orders-details",
  "admin-reviews",
];
const showShopNavbar = [
  "shop",
  "shop-foods",
  "shop-search-results",
  "cart",
  "checkout",
  "orders",
  "orders-details",
];
</script>

<template>
  <Toaster />
  <Navbar v-if="showNavbar.includes($route.name)" />
  <AdminNavbar v-if="showAdminNavbar.includes($route.name)" />
  <ShopNavbar v-if="showShopNavbar.includes($route.name)" />
  <main>
    <router-view></router-view>
  </main>
</template>
