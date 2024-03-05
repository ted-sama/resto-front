<template>
  <div class="py-10">
    <vue-marquee-slider
      id="marquee-slider-width"
      :speed="40000"
      :width="420"
      :space="50"
    >
      <LandingCard :image="meal1" />
      <LandingCard :image="meal2" />
      <LandingCard :image="meal3" />
      <LandingCard :image="meal4" />
      <LandingCard :image="meal5" />
      <LandingCard :image="meal6" />
      <LandingCard :image="meal7" />
    </vue-marquee-slider>
  </div>
</template>

<script setup>
import LandingCard from "./LandingCard.vue";
import { VueMarqueeSlider } from "vue3-marquee-slider";
import "../../node_modules/vue3-marquee-slider/dist/style.css";
import meal1 from "../assets/meal_1.jpg";
import meal2 from "../assets/meal_2.jpg";
import meal3 from "../assets/meal_3.jpg";
import meal4 from "../assets/meal_4.webp";
import meal5 from "../assets/meal_5.jpg";
import meal6 from "../assets/meal_6.jpg";
import meal7 from "../assets/meal_7.jpg";
</script>
