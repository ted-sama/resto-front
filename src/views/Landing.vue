<script setup>
import Navbar from "../components/Navbar.vue";
import Hero from "../components/Hero.vue";
import CardCarousel from "../components/CardCarousel.vue";
import LandingProcess from "../components/LandingProcess.vue";
</script>

<template>
  <Navbar />
  <div>
    <Hero />
    <CardCarousel />
    <LandingProcess class="mt-8 md:mt-24" />
  </div>
</template>
