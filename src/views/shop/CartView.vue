<template>
  <Container>
    <div class="py-20">
      <h1 class="text-2xl font-semibold mb-8">Votre panier</h1>
      <div>
        <Loading v-if="loading" />
        <div class="lg:grid lg:grid-cols-4 lg:gap-8" v-else>
          <div class="col-span-1 lg:order-last mb-8 lg:mb-0">
            <div class="p-8">
              <h2 class="text-xl font-medium mb-4">
                Sous-total ({{ cartTotalProducts }} produits) :
                <span class="font-bold">{{ cartTotalPrice.toFixed(2) }} €</span>
              </h2>
              <Button class="w-full" asChild v-show="cart.length !== 0">
                <router-link to="/shop/checkout"> Commander </router-link>
              </Button>
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
                <TableRow v-for="item in cart" :key="item.id">
                  <TableCell
                    ><img
                      :src="item.food.image"
                      :alt="item.food.name"
                      class="w-20 h-20 md:w-40 md:h-40 rounded-lg object-cover"
                  /></TableCell>
                  <TableCell class="text-lg">{{ item.food.name }}</TableCell>
                  <TableCell>
                    <div class="flex items-center space-x-4">
                      <select
                        name="quantity"
                        id="quantity"
                        class="w-20 h-10 bg-[#f5f5f4] rounded-lg p-2"
                        v-model="item.quantity"
                        @change="updateCart(item.food.id, item.quantity)"
                      >
                        <option :value="1">1</option>
                        <option v-for="i in 98" :key="i + 1" :value="i + 1">
                          {{ i + 1 }}
                        </option>
                      </select>
                      <Button
                        variant="secondary"
                        @click="updateCart(item.food.id, 0)"
                      >
                        <Trash2 class="w-5 h-5" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell class="text-lg font-semibold"
                    >{{
                      (item.food.price * item.quantity).toFixed(2)
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
  </Container>
</template>

<script setup>
import Loading from "@/components/Loading.vue";
import Container from "@/components/Container.vue";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-vue-next";
import { ref, onMounted } from "vue";

const loading = ref(false);

const cart = ref([]);
const cartTotalProducts = ref(0);
const cartTotalPrice = ref(0);

const getCart = () => {
  loading.value = true;

  fetch(`${import.meta.env.VITE_API}/cart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      cart.value = data;
      for (let i = 0; i < data.length; i++) {
        cartTotalProducts.value += data[i].quantity;
        cartTotalPrice.value += data[i].food.price * data[i].quantity;
      }
      loading.value = false;
      console.log(data);
    });
};

const updateCart = (itemId, quantity) => {
  fetch(`${import.meta.env.VITE_API}/cart/quantity`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      item_id: itemId,
      quantity: quantity,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      getCart();
    });
};

onMounted(() => {
  getCart();
});
</script>
