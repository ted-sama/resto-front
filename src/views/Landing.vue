<script setup>
import Hero from "../components/Hero.vue";
import CardCarousel from "../components/CardCarousel.vue";
import LandingProcess from "../components/LandingProcess.vue";
import Navbar from "../components/Navbar.vue";

</script>

<template>
  <div>
    <Navbar />
    <Hero />
    <CardCarousel />
    <LandingProcess class="mt-8 md:mt-24" />
  </div>
</template>
