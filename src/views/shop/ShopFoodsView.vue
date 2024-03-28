<template>
  <Container>
    <div class="py-20">
      <h1 class="text-2xl font-semibold mb-8">Les plats</h1>
      <div class="flex flex-1 overflow-x-auto md:overflow-x-hidden mb-12">
        <div class="flex space-x-4" v-if="catLoading">
          <Skeleton class="h-[40px] w-[125.58px] rounded-md" />
          <Skeleton class="h-[40px] w-[125.58px] rounded-md" />
          <Skeleton class="h-[40px] w-[125.58px] rounded-md" />
          <Skeleton class="h-[40px] w-[125.58px] rounded-md" />
          <Skeleton class="h-[40px] w-[125.58px] rounded-md" />
        </div>
        <div class="flex space-x-4" v-else>
          <Button variant="secondary" @click="fetchAllFoods">
            Tout les plats
          </Button>
          <Button
            variant="secondary"
            v-for="category in categories"
            :key="category.id"
            @click="fetchFoodByCategory(category.id)"
          >
            {{ category.name }}
          </Button>
        </div>
      </div>
      <div class="pt-16" v-if="loading">
        <Loading />
      </div>
      <div v-else>
        <h1 class="text-2xl font-semibold mb-8">{{ currentCategory }}</h1>
        <FoodGrid :items="currentFoods" />
      </div>
    </div>
  </Container>
</template>

<script setup>
import FoodGrid from "@/components/FoodGrid.vue";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "@/components/Loading.vue";
import Container from "@/components/Container.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const loading = ref(false);
const catLoading = ref(false);

const categories = ref([]);
const currentCategory = ref("");
const currentFoods = ref([]);

const fetchAllFoods = async () => {
  loading.value = true;

  await fetch(`${import.meta.env.VITE_API}/foods`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      loading.value = false;
      currentCategory.value = "Tout les plats";
      // all foods that are active
      currentFoods.value = data.filter((food) => food.active);
      console.log(data);
    });
};

const fetchFoodByCategory = async (categoryId) => {
  loading.value = true;

  await fetch(`${import.meta.env.VITE_API}/categories/${categoryId}/foods`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      loading.value = false;
      // find category name in categories
      const category = categories.value.find(
        (category) => category.id === categoryId
      );
      currentCategory.value = category.name;
      // all foods that are active
      currentFoods.value = data.filter((food) => food.active);
      console.log(data);
    });
};

onMounted(async () => {
  catLoading.value = true;
  fetch(`${import.meta.env.VITE_API}/categories`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      catLoading.value = false;
      // all active categories
      categories.value = data.filter((category) => category.active);
      console.log(data);
    });

  if (route.query.category) {
    loading.value = true;
    const categoryId = parseInt(route.query.category);
    await fetchFoodByCategory(categoryId);
  } else {
    await fetchAllFoods();
  }
});
</script>
