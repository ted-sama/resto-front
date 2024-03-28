<template>
  <Container>
    <div class="py-20">
      <div class="lg:grid lg:grid-cols-7">
        <div class="col-span-2 lg:order-last">
          <div class="lg:ml-8 mb-12 lg:mb-0">
            <Loading v-if="loading" />
            <div v-else>
              <h2 class="text-2xl font-semibold mb-8">Votre panier</h2>
              <div class="flex justify-between">
                <h3>Nombre d'articles :</h3>
                <div>{{ cartTotalProducts }}</div>
              </div>
              <div class="flex justify-between">
                <h3>Total :</h3>
                <div>{{ cartTotalPrice.toFixed(2) }} €</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-5 lg:order-first">
          <h1 class="text-2xl font-semibold mb-8">Informations de paiement</h1>
          <form @submit.prevent="placeOrder" class="space-y-4">
            <div class="space-y-4 mb-16">
              <div>
                <label for="country" class="block">Pays</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  v-model="country"
                  class="w-[500px] p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label for="address" class="block">Adresse</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  v-model="address"
                  class="w-[500px] p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label for="city" class="block">Ville</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  v-model="city"
                  class="w-[500px] p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label for="zip" class="block">Code postal</label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  v-model="zip"
                  class="w-[500px] p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label for="note" class="block">Note (facultatif)</label>
                <textarea
                  id="note"
                  name="note"
                  v-model="note"
                  class="w-[500px] h-32 p-2 border border-gray-300 rounded-lg"
                ></textarea>
              </div>
            </div>
            <Button class="w-[500px]" type="submit">Payer</Button>
          </form>
        </div>
      </div>
    </div>
  </Container>
</template>

<script setup>
import Loading from "@/components/Loading.vue";
import Container from "@/components/Container.vue";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const router = useRouter();
const { toast } = useToast();

const loading = ref(false);

const cart = ref([]);
const cartTotalProducts = ref(0);
const cartTotalPrice = ref(0);

const country = ref("");
const address = ref("");
const city = ref("");
const zip = ref("");
const note = ref("");

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

const placeOrder = () => {
  loading.value = true;

  if (note.value === "") {
    fetch(`${import.meta.env.VITE_API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        address: address.value,
        city: city.value,
        country: country.value,
        zip: zip.value,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          toast({
            title: "Erreur",
            description: "Erreur lors de la commande",
            variant: "destructive",
          });
          throw new Error("Erreur lors de la commande");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        toast({
          title: "Commande passée",
          description: "Votre commande a bien été passée",
          variant: "success",
        });
        router.push("/shop");
      });
  } else {
    fetch(`${import.meta.env.VITE_API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        address: address.value,
        city: city.value,
        country: country.value,
        zip: zip.value,
        note: note.value,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          toast({
            title: "Erreur",
            description: "Erreur lors de la commande",
            variant: "destructive",
          });
          throw new Error("Erreur lors de la commande");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        toast({
          title: "Commande passée",
          description: "Votre commande a bien été passée",
          variant: "success",
        });
        router.push("/shop");
      });
  }
};

onMounted(() => {
  getCart();
});
</script>
