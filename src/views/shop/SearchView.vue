<template>
  <Container>
    <div class="py-20">
      <h1 class="text-2xl font-semibold mb-8">
        Résultats de la recherche : « {{ route.query.search_query }} »
      </h1>
      <div class="pt-16" v-if="loading">
        <Loading />
      </div>
      <div v-else>
        <FoodGrid :items="currentFoods" v-if="currentFoods.length !== 0" />
        <p v-else>Aucun résultat</p>
      </div>
    </div>
  </Container>
</template>

<script setup>
import FoodGrid from "@/components/FoodGrid.vue";
import Container from "@/components/Container.vue";
import Loading from "@/components/Loading.vue";
import { Button } from "@/components/ui/button";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const loading = ref(false);
const currentFoods = ref([]);

const fetchFoods = async (query) => {
  loading.value = true;

  await fetch(`${import.meta.env.VITE_API}/foods?name=${query}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      loading.value = false;
      // all foods that are active
      currentFoods.value = data.filter((food) => food.active);
    });
};

onMounted(async () => {
  await fetchFoods(route.query.search_query);
});

watch(route, async () => {
  await fetchFoods(route.query.search_query);
});
</script>
