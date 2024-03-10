<template>
  <header class="top-0 z-50 sticky bg-white">
    <div
      class="mx-auto px-4 sm:px-6 lg:px-8 max-w-[90rem] flex h-20 items-center justify-between"
    >
      <div class="flex">
        <router-link to="/">
          <img :src="logo" alt="Miamiam" class="h-16" />
        </router-link>
      </div>
      <div class="hidden sm:flex gap-x-5">
        <router-link
          to="/login"
          class="text-sm p-3 rounded-2xl bg-primary flex items-center hover:bg-primary-dark transition duration-200 ease-in-out"
          ><UserRound class="mr-2" />Connexion</router-link
        >
        <router-link
          to="/register"
          class="text-sm p-3 rounded-2xl bg-black text-white flex hover:bg-neutral-800 transition duration-200 ease-in-out"
          >Inscription</router-link
        >
      </div>
    </div>
  </header>
</template>

<script setup>
import logo from "../assets/miamiam_logo.png";
import { UserRound } from "lucide-vue-next";
</script>
