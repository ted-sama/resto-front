<template>
  <header class="top-0 z-50 sticky bg-white" :class="{ 'shadow-md': !pageTop }">
    <div
      class="mx-auto px-4 sm:px-6 lg:px-8 max-w-[90rem] flex h-20 items-center justify-between"
    >
      <div class="flex items-center">
        <router-link to="/admin">
          <img :src="logo" alt="Miamiam" class="h-16" />
        </router-link>
        <div>
          <h3
            class="text-sm flex flex-shrink items-center px-4 py-1 rounded-full bg-neutral-900/10"
          >
            <Shield class="mr-2" :size="16" />
            Espace administrateur
          </h3>
        </div>
      </div>
      <div class="hidden sm:flex gap-x-5">
        <Button variant="ghost" as-child>
          <router-link to="/">Retour accueil</router-link>
        </Button>
        <Button variant="ghost" as-child>
          <router-link to="/admin/users">Utilisateurs</router-link>
        </Button>
        <Button variant="ghost" as-child>
          <router-link to="/admin/categories">Catégories</router-link>
        </Button>
        <Button variant="ghost" as-child>
          <router-link to="/admin/foods">Plats</router-link>
        </Button>
        <Button variant="ghost" as-child>
          <router-link to="/admin/orders">Commandes</router-link>
        </Button>
      </div>
    </div>
  </header>
</template>

<script setup>
import logo from "../assets/miamiam_logo.png";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-vue-next";
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
