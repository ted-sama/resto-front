<template>
  <Container>
    <div class="py-20">
      <h1 class="text-2xl font-semibold mb-8">Mes commandes</h1>
    </div>
    <div>
      <Loading v-if="loading" />
      <Table v-else>
        <TableHeader>
          <TableRow>
            <TableHead class="text-left">Date</TableHead>
            <TableHead class="text-left">Statut</TableHead>
            <TableHead class="text-left">Nombre d'articles</TableHead>
            <TableHead class="text-left">Prix total</TableHead>
            <TableHead class="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="order in orders" :key="order.id">
            <TableCell>
              {{ new Date(order.created_at.date).toLocaleDateString() }}
              {{ new Date(order.created_at.date).toLocaleTimeString() }}
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
                <router-link :to="'/account/orders/' + order.id">
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
import { Eye } from "lucide-vue-next";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { onMounted, ref } from "vue";

const loading = ref(false);

const orders = ref([]);

const getOrders = async () => {
  loading.value = true;

  await fetch(`${import.meta.env.VITE_API}/orders/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      loading.value = false;
      orders.value = data;
      console.log(data);
    });
};

onMounted(async () => {
  await getOrders();
});
</script>
