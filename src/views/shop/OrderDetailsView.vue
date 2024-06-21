<template>
  <Container>
    <div class="py-20">
      <Loading v-if="loading" />
      <div v-else>
        <h1 class="text-2xl font-semibold mb-8">
          Ma commande n° {{ order.id }}
        </h1>
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
                  <div>
                    <Button v-on:click="toggleModal" class="mt-8" :disabled="order.status !== 'delivered' || reviewSubmitted">Laisser un avis</Button>
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
                    <TableCell>
                      <img
                        :src="item.image"
                        :alt="item.food"
                        class="w-20 h-20 rounded-lg object-cover"
                      />
                    </TableCell>
                    <TableCell class="text-lg">{{ item.food }}</TableCell>
                    <TableCell>
                      {{ item.quantity }}
                    </TableCell>
                    <TableCell class="text-lg font-semibold">
                      {{
                        (item.unit_price * item.quantity).toFixed(2)
                      }} €
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="modal">
      <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center" v-if="showModal">
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-semibold">Salut {{ userData.first_name }} 👋 !!!</h2>
            <button @click="toggleModal" class="text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p class="mb-4">Partagez votre expérience concernant votre commande :</p>
          <div class="flex justify-between mb-4">
            <span v-for="rating in ratings" :key="rating.value" @click="selectedRating = rating.value" class="cursor-pointer">
              <svg v-if="selectedRating >= rating.value" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27l5.18 3.73-1.64-7.03 5.46-4.73-7.19-.62L12 2 10.19 8.62l-7.19.62 5.46 4.73-1.64 7.03z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27l5.18 3.73-1.64-7.03 5.46-4.73-7.19-.62L12 2 10.19 8.62l-7.19.62 5.46 4.73-1.64 7.03z"/>
              </svg>
            </span>
          </div>
          <textarea v-model="review" class="w-full h-24 border p-2 " placeholder="Écrivez des commentaires supplémentaires ici..."></textarea>
          <div class="flex justify-end">
            <Button @click="submitReview" class="mt-8 px-4 py-2 rounded">Laisser un avis</Button>
          </div>
        </div>
      </div>
    </transition>
    <transition name="modal">
      <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center" v-if="showConfirmation">
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-semibold">Merci pour votre avis 🎉</h2>
            <button @click="showConfirmation = false" class="text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p>Votre avis a été soumis avec succès.</p>
        </div>
      </div>
    </transition>
  </Container>
</template>

<script setup>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
const userData = ref({});
const loading = ref(false);
const order = ref({});
const showModal = ref(false);
const showConfirmation = ref(false);
const review = ref("");
const selectedRating = ref(0);
const ratings = ref([
  { value: 1, label: 'Mauvais' },
  { value: 2, label: 'Médiocre' },
  { value: 3, label: 'Moyen' },
  { value: 4, label: 'Bon' },
  { value: 5, label: 'Excellent' }
]);

let reviewSubmitted = localStorage.getItem(`reviewSubmitted_${order.value.id}`) === 'true';

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

  await fetchOrder();
});

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
      
      reviewSubmitted = localStorage.getItem(`reviewSubmitted_${order.value.id}`) === 'true';

      console.log(data);
    });
};

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const submitReview = async () => {
  if (reviewSubmitted) {
    alert("Vous avez déjà soumis un avis pour cette commande.");
    return;
  }

  await fetch(`${import.meta.env.VITE_API}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      order: order.value.id,
      comment: review.value,
      rating: selectedRating.value,
    }),
  }).then((res) => {
    if (res.ok) {
      toggleModal();
      showConfirmation.value = true;
      review.value = "";
      selectedRating.value = 0;
      
      localStorage.setItem(`reviewSubmitted_${order.value.id}`, 'true');
      
      reviewSubmitted = true;
    } else {
      alert("Erreur lors de l'envoi de l'avis.");
    }
  });
};
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.5s;
}
.modal-enter, .modal-leave-to  {
  opacity: 0;
}
</style>
