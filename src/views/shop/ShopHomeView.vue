<template>
  <Container>
    <div class="py-20" v-if="loading">
      <Loading />
    </div>
    <div class="py-20" v-else>
      <div class="mb-12">
        <h1 class="text-3xl md:text-4xl font-bold pb-2">
          Bienvenue, {{ userData.first_name }} !
        </h1>
        <p class="text-gray-500">Qu'allez-vous manger aujourd'hui ?</p>
      </div>

      <div class="flex space-x-4 mb-8">
        <Button variant="secondary" as-child>
          <router-link to="/shop/foods">Afficher tout les plats</router-link>
        </Button>
      </div>
      <CategoryCarousel
        title="Catégories à l'affiche"
        :items="featuredCategories"
      />
      <FoodCarousel title="Plats populaires" :items="popularFoods" />
      <FoodGrid :items="allFoods" />
      <Button variant="secondary" as-child>
        <router-link to="/shop/foods">Voir tout les plats</router-link>
      </Button>
    </div>
  </Container>
</template>

<script setup>
import Loading from "@/components/Loading.vue";
import Container from "@/components/Container.vue";
import CategoryCarousel from "@/components/CategoryCarousel.vue";
import FoodCarousel from "@/components/FoodCarousel.vue";
import FoodGrid from "@/components/FoodGrid.vue";
import { Button } from "@/components/ui/button";
import { ref, onMounted } from "vue";

const loading = ref(false);

const userData = ref({});
const featuredCategories = ref([]);
const popularFoods = ref([]);
const allFoods = ref([]);

onMounted(async () => {
  loading.value = true;
  await fetch(`${import.meta.env.VITE_API}/user/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      userData.value = data;
      console.log(data);
    });

  await fetch(`${import.meta.env.VITE_API}/categories`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // categories where the featured property is true and active is true and randomize the order
      featuredCategories.value = data
        .filter((category) => category.featured && category.active)
        .sort(() => 0.5 - Math.random());
      console.log(data);
    });

  await fetch(`${import.meta.env.VITE_API}/foods`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // foods where the featured property is true and active is true and randomize the order
      popularFoods.value = data
        .filter((food) => food.featured && food.active)
        .sort(() => 0.5 - Math.random());

      // foods where the active property is true and randomize the order, max 12
      allFoods.value = data
        .filter((food) => food.active)
        .sort(() => 0.5 - Math.random())
        .slice(0, 12);
      loading.value = false;
      console.log(data);
    });
});
</script>
