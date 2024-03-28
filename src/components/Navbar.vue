<template>
  <header class="top-0 z-50 sticky bg-white" :class="{ 'shadow-md': !pageTop }">
    <div
      class="mx-auto px-4 sm:px-6 lg:px-8 max-w-[90rem] flex h-20 items-center justify-between"
    >
      <div class="flex">
        <router-link to="/">
          <img :src="logo" alt="Miamiam" class="h-16" />
        </router-link>
      </div>
      <div class="hidden sm:flex gap-x-5">
        <Button as-child>
          <router-link to="/login"
            ><UserRound class="mr-2" />Connexion</router-link
          >
        </Button>
        <Button variant="secondary" as-child>
          <router-link to="/register">Inscription</router-link>
        </Button>
      </div>
    </div>
  </header>
</template>

<script setup>
import logo from "../assets/miamiam_logo.png";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-vue-next";
import { onMounted, ref } from "vue";

const pageTop = ref(true);

const handleScroll = () => {
  // when the user scrolls, check the pageYOffset
  if (window.scrollY > 0) {
    // user is scrolled
    if (pageTop.value) pageTop.value = false;
  } else {
    // user is at top of page
    if (!pageTop.value) pageTop.value = true;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>
