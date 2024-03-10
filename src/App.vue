<script setup>
import Navbar from "./components/Navbar.vue";

const hideNavbar = ["Login", "Register"];
</script>

<template>
  <Navbar v-show="!hideNavbar.includes($route.name)" />
  <router-view></router-view>
</template>
