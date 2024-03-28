<template>
  <Container>
    <div class="py-20">
      <Loading v-if="loading" />
      <div v-else>
        <h1 class="text-2xl font-semibold mb-8">Commande n° {{ order.id }}</h1>
        <div>
          <div class="lg:grid lg:grid-cols-4 lg:gap-8">
            <div class="col-span-1 lg:order-last mb-8 lg:mb-0">
              <div>
                <h2 class="text-xl font-medium mb-4">
                  Sous-total ({{ order.total_items }} produits) :
                  <span class="font-bold">{{ order.total_price }} €</span>
                </h2>
                <div>
                  <h3 class="text-lg font-semibold mt-4">
                    Adresse de livraison
                  </h3>
                  <p>Adresse : {{ order.shipping_info?.address }}</p>
                  <p>Ville : {{ order.shipping_info?.city }}</p>
                  <p>Code postal : {{ order.shipping_info?.zip }}</p>
                  <p>Pays : {{ order.shipping_info?.country }}</p>
                </div>
                <div>
                  <h3 class="text-lg font-semibold mt-4 mb-2">
                    Statut de la commande
                  </h3>
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
                  <div class="flex flex-col space-y-4 mt-4">
                    <Button
                      variant="secondary"
                      @click="updateOrderStatus('delivered')"
                    >
                      Livrée
                    </Button>
                    <Button
                      variant="secondary"
                      @click="updateOrderStatus('pending')"
                    >
                      En attente
                    </Button>
                    <Button
                      variant="secondary"
                      @click="updateOrderStatus('cancelled')"
                    >
                      Annulée
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-3 lg:order-first">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead class="text-left">Produit</TableHead>
                    <TableHead class="text-left">Nom</TableHead>
                    <TableHead class="text-left">Quantité</TableHead>
                    <TableHead class="text-left">Prix</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow
                    v-for="(item, index) in order.order_details"
                    :key="item.index"
                  >
                    <TableCell
                      ><img
                        :src="item.image"
                        :alt="item.food"
                        class="w-20 h-20 rounded-lg object-cover"
                    /></TableCell>
                    <TableCell class="text-lg">{{ item.food }}</TableCell>
                    <TableCell>
                      {{ item.quantity }}
                    </TableCell>
                    <TableCell class="text-lg font-semibold"
                      >{{
                        (item.unit_price * item.quantity).toFixed(2)
                      }}
                      €</TableCell
                    >
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
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
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const loading = ref(false);

const order = ref({});

const fetchOrder = async () => {
  loading.value = true;

  await fetch(`${import.meta.env.VITE_API}/orders/${route.params.id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      loading.value = false;
      order.value = data;
      console.log(data);
    });
};

const updateOrderStatus = async (status) => {
  loading.value = true;

  await fetch(`${import.meta.env.VITE_API}/orders/${route.params.id}/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      status,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      fetchOrder();
    });
};

onMounted(async () => {
  await fetchOrder();
});
</script>
