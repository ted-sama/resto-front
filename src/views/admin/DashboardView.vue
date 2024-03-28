<template>
  <Container>
    <div class="py-20">
      <h1 class="text-4xl font-semibold mb-8">Dashboard</h1>
      <Loading v-if="loading" />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" v-else>
        <DashboardItem
          title="Utilisateurs"
          color="bg-red-500"
          :quantity="userNb"
        />
        <DashboardItem
          title="Catégories"
          color="bg-blue-500"
          :quantity="categoryNb"
        />
        <DashboardItem title="Plats" color="bg-yellow-500" :quantity="dishNb" />
        <DashboardItem
          title="Commandes"
          color="bg-green-500"
          :quantity="orderNb"
        />
      </div>
    </div>
  </Container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Loading from "@/components/Loading.vue";
import Container from "../../components/Container.vue";
import DashboardItem from "@/components/DashboardItem.vue";

const loading = ref(false);

const userNb = ref(0);
const categoryNb = ref(0);
const dishNb = ref(0);
const orderNb = ref(0);

onMounted(async () => {
  loading.value = true;

  await fetch(`${import.meta.env.VITE_API}/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      userNb.value = data.length;
    });

  await fetch(`${import.meta.env.VITE_API}/categories`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      categoryNb.value = data.length;
    });

  await fetch(`${import.meta.env.VITE_API}/foods`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      dishNb.value = data.length;
    });

  await fetch(`${import.meta.env.VITE_API}/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      orderNb.value = data.length;
    });

  loading.value = false;
});
</script>
