<template>
  <Container>
    <div class="flex flex-col gap-y-24 pb-32">
      <div class="flex flex-col lg:flex-row gap-x-8 justify-between">
        <div class="lg:w-2/5 lg:h-72 rounded-2xl">
          <img
            :src="step1"
            alt="step1"
            class="object-cover w-full h-full rounded-2xl"
          />
        </div>
        <div class="lg:max-w-[40rem]">
          <h2 class="text-3xl font-bold mt-8">Commandez en ligne</h2>
          <p class="mt-4">
            Profitez du grand catalaogue de plats de Miamiam et commandez en
            ligne.
          </p>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row gap-x-8 justify-between">
        <div class="lg:w-2/5 lg:h-72 lg:order-last rounded-2xl">
          <img
            :src="step2"
            alt="step2"
            class="object-cover w-full h-full rounded-2xl"
          />
        </div>
        <div class="lg:max-w-[40rem]">
          <h2 class="text-3xl font-bold mt-8">On prépare</h2>
          <p class="mt-4">
            Nous préparons votre commande avec soin et rapidité pour que vous la
            receviez dans les meilleurs délais et que ce soit le meilleur repas
            possible pour vous.
          </p>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row gap-x-8 justify-between">
        <div class="lg:w-2/5 lg:h-72 rounded-2xl">
          <img
            :src="step3"
            alt="step3"
            class="object-cover w-full h-full rounded-2xl"
          />
        </div>
        <div class="lg:max-w-[40rem]">
          <h2 class="text-3xl font-bold mt-8">Livraison express</h2>
          <p class="mt-4">
            Recevez votre commande dans les meilleurs délais et dégustez votre
            repas comme si vous étiez au restaurant.
          </p>
        </div>
      </div>
    </div>
  </Container>
</template>

<script setup>
import Container from "./Container.vue";
import step1 from "../assets/step_1.jpg";
import step2 from "../assets/step_2.jpg";
import step3 from "../assets/step_3.jpg";
</script>

<style></style>
