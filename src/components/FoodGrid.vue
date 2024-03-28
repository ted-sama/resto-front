<template>
  <div class="mb-12">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-x-4 md:gap-y-10">
      <Dialog v-for="item in items" :key="item.id">
        <DialogTrigger as-child>
          <div class="cursor-pointer">
            <div class="h-48 sm:h-64 md:h-48 rounded-xl">
              <img
                :src="item.image"
                :alt="item.name"
                class="h-full w-full object-cover rounded-xl"
              />
            </div>
            <div>
              <h3 class="text-lg font-medium mt-2">{{ item.name }}</h3>
              <p class="text-sm">{{ item.price.toFixed(2) }} €</p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[625px]">
          <DialogHeader>
            <div class="w-full h-96 rounded-xl py-4">
              <img
                :src="item.image"
                :alt="item.name"
                class="h-full w-full object-cover rounded-xl"
              />
            </div>
            <DialogTitle class="text-2xl">
              <div>
                <h1>{{ item.name }}</h1>
                <span class="text-gray-500 text-xl">
                  {{ item.price.toFixed(2) }} €
                </span>
              </div>
            </DialogTitle>
            <DialogDescription>
              {{ item.description }}
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <select
              name="quantity"
              id="quantity"
              class="w-20 h-10 bg-[#f5f5f4] rounded-lg p-2"
              v-model="quantity"
            >
              <option :value="1" selected>1</option>
              <option v-for="i in 98" :key="i + 1" :value="i + 1">
                {{ i + 1 }}
              </option>
            </select>
          </div>
          <DialogFooter>
            <DialogClose as-child>
              <Button type="submit" class="w-full" @click="addToCart(item.id)">
                Ajouter {{ quantity }} au panier -
                {{ (item.price * quantity).toFixed(2) }} €
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";
import { defineProps, ref } from "vue";

defineProps({
  title: String,
  items: Array,
});

const { toast } = useToast();

const quantity = ref(1);

const addToCart = (itemId) => {
  fetch(`${import.meta.env.VITE_API}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      item_id: itemId,
      quantity: quantity.value,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        toast({
          title: "Erreur",
          description: "Erreur lors de l'ajout au panier",
          variant: "destructive",
        });
        throw new Error("Erreur lors de l'ajout au panier");
      }
      return res.json();
    })
    .then((data) => {
      toast({
        title: "Nouvel ajout au panier",
        description: "Vous avez ajouté un nouvel élément à votre panier",
      });
      console.log(data);
    });
};
</script>
