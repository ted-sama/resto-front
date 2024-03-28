<template>
  <div
    style="
      background-image: linear-gradient(
          rgba(0, 0, 0, 0.527),
          rgba(0, 0, 0, 0.5)
        ),
        url('src/assets/landing_background.jpg');
    "
    class="py-20 h-[32rem] bg-cover bg-center"
  >
    <Container class="text-white flex flex-col">
      <div>
        <h1 class="text-left md:text-center text-4xl font-bold md:px-12 pb-24">
          Mangez comme au restaurant, avec le confort de chez vous
        </h1>
      </div>
      <div class="flex flex-col justify-center">
        <p class="text-left md:text-center">
          Connectez vous pour profiter des nombreux plats de Miamiam !
        </p>
        <div class="flex md:justify-center mt-4">
          <Button class="p-3" as-child>
            <router-link to="/login"
              ><UserRound class="mr-2" />Connexion</router-link
            >
          </Button>
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup>
import Container from "@/components/Container.vue";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-vue-next";
</script>
