<template>
  <Container>
    <div class="py-20">
      <h1 class="text-2xl font-semibold mb-8">Commandes</h1>
      <div class="sm:flex items-center sm:justify-between">
        <p class="text-neutral-500 mb-4 sm:mb-0">
          Nombre de commandes : {{ ordersNb }}
        </p>
      </div>
    </div>
    <div>
      <!-- input with search icon -->
      <div class="relative text-neutral-500 w-full sm:w-96 mb-4">
        <Search class="absolute top-2.5 left-2.5" :size="22" />
        <input
          type="text"
          class="w-full sm:w-96 p-2 pl-10 border rounded-lg"
          placeholder="Rechercher une commande"
          v-model="search"
        />
      </div>
      <Loading v-if="loading" />
      <Table v-else>
        <TableHeader>
          <TableRow>
            <TableHead class="text-left">ID</TableHead>
            <TableHead class="text-left">Date</TableHead>
            <TableHead class="text-left">Client</TableHead>
            <TableHead class="text-left">Statut</TableHead>
            <TableHead class="text-left">Nombre d'articles</TableHead>
            <TableHead class="text-left">Prix total</TableHead>
            <TableHead class="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="order in orders" :key="order.id">
            <TableCell>{{ order.id }}</TableCell>
            <TableCell>
              {{ new Date(order.created_at.date).toLocaleDateString() }}
              {{ new Date(order.created_at.date).toLocaleTimeString() }}
            </TableCell>
            <TableCell class="font-medium">
              {{ order.user.email }}
            </TableCell>
            <TableCell>
              <span
                :class="{
                  'bg-green-500 text-white px-2 py-1 rounded-full':
                    order.status === 'delivered',
                  'bg-orange-500 text-white px-2 py-1 rounded-full':
                    order.status === 'pending',
                  'bg-red-500 text-white px-2 py-1 rounded-full':
                    order.status === 'cancelled',
                }"
              >
                <span>
                  {{
                    order.status === "delivered"
                      ? "Livré"
                      : order.status === "pending"
                      ? "En attente"
                      : "Annulé"
                  }}
                </span>
              </span>
            </TableCell>
            <TableCell> {{ order.total_items }} </TableCell>
            <TableCell> {{ order.total_price.toFixed(2) }} € </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" as-child>
                <router-link :to="'/admin/orders/' + order.id">
                  <Eye :size="20" :stroke-width="1.5" />
                </router-link>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </Container>
</template>

<script setup>
import Container from "@/components/Container.vue";
import Loading from "@/components/Loading.vue";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Search, Eye } from "lucide-vue-next";
import { ref, onMounted, watch } from "vue";

const loading = ref(false);
const search = ref("");
const ordersNb = ref(0);
const orders = ref([]);

const fetchOrders = async () => {
  loading.value = true;

  await fetch(`${import.meta.env.VITE_API}/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      loading.value = false;
      // order by date
      orders.value = data.sort(
        (a, b) => new Date(b.created_at.date) - new Date(a.created_at.date)
      );
      ordersNb.value = data.length;
      console.log(data);
    });
};

onMounted(async () => {
  await fetchOrders();
});
</script>
