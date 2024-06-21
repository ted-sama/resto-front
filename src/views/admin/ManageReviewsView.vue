<template>
  <Container>
    <div class="py-20">
      <h1 class="text-2xl font-semibold mb-8">Avis</h1>
      <div class="sm:flex items-center sm:justify-between">
        <p class="text-neutral-500 mb-4 sm:mb-0">
          Nombre de commentaires : {{ reviewsNb }}
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
          placeholder="Rechercher un avis"
          v-model="search"
        />
      </div>
      <Loading v-if="loading" />
      <Table v-else>
        <TableHeader>
          <TableRow>
            <TableHead class="text-left">ID Commande</TableHead>
            <TableHead class="text-left">Date</TableHead>
            <TableHead class="text-left">Utilisateur</TableHead>
            <TableHead class="text-left">Note</TableHead>
            <TableHead class="text-left">Commentaire</TableHead>
            <TableHead class="text-left">A l'affiche</TableHead>
            <TableHead class="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="review in filteredReviews" :key="review.id">
            <TableCell>{{ review.order }}</TableCell>
            <TableCell>
              {{ new Date(review.created_at).toLocaleDateString() }}
              {{ new Date(review.created_at).toLocaleTimeString() }}
            </TableCell>
            <TableCell>{{ review.user }}</TableCell>
            <TableCell>{{ review.rating }}</TableCell>
            <TableCell>{{ review.comment }}</TableCell>
            <TableCell>{{ review.featured ? "Oui" : "Non" }}</TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger as-child>
                  <Button variant="ghost" size="icon">
                    <Pencil :size="20" :stroke-width="1.5" />
                  </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Modifier l'avis</DialogTitle>
                    <DialogDescription>
                      Modifiez l'état de l'avis de {{ review.user }}
                    </DialogDescription>
                  </DialogHeader>
                  <div class="grid gap-4 py-4">
                    <div class="flex items-center space-x-2">
                      <Switch v-model:checked="review.featured" />
                      <label class="block text-sm font-semibold mb-1"
                        >A l'affiche</label
                      >
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" @click="saveReview(review)">
                      Sauvegarder
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger as-child>
                  <Button variant="ghost" size="icon">
                    <Trash2 :size="20" :stroke-width="1.5" />
                  </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Supprimer l'avis</DialogTitle>
                    <DialogDescription>
                      Êtes-vous sûr de vouloir supprimer cet avis ?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="destructive"
                      @click="deleteReview(review.id)"
                    >
                      Supprimer
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </Container>
</template>

<script setup>
import Container from "@/components/Container.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2, Search } from "lucide-vue-next";
import { ref, onMounted, computed } from "vue";
import { useToast } from "@/components/ui/toast/use-toast";
import Loading from "@/components/Loading.vue";

const { toast } = useToast();

const loading = ref(false);
const reviews = ref([]);
const reviewsNb = ref(0);
const search = ref("");


const fetchReviews = async () => {
  loading.value = true;

  try {
    const response = await fetch(`${import.meta.env.VITE_API}/reviews`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();
    reviews.value = data;
    reviewsNb.value = data.length;
  } catch (error) {
    console.error("Erreur lors de la récupération des avis :", error);
  } finally {
    loading.value = false;
  }
};

const saveReview = async (review) => {
  try {
    // Convert boolean to integer (0 or 1)
    const featuredValue = review.featured ? 1 : 0;

    const response = await fetch(
      `${import.meta.env.VITE_API}/reviews/${review.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...review,
          featured: featuredValue, // Send the correct integer value
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour de l'avis");
    }

    toast({
      title: "Succès",
      description: "Avis mis à jour avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'avis :", error);

    toast({
      title: "Erreur",
      description: "Erreur lors de la mise à jour de l'avis",
      variant: "error",
    });
  } finally {
    await fetchReviews();
  }
};

const deleteReview = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API}/reviews/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l'avis");
    }

    toast({
      title: "Succès",
      description: "Avis supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'avis :", error);

    toast({
      title: "Erreur",
      description: "Erreur lors de la suppression de l'avis",
      variant: "error",
    });
  } finally {
    await fetchReviews();
  }
};

onMounted(() => {
  fetchReviews();
});

const filteredReviews = computed(() => {
  return reviews.value.filter((review) =>
    review.comment.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>
