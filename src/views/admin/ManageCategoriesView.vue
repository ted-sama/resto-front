<template>
  <Container>
    <div class="py-20">
      <h1 class="text-2xl font-semibold mb-8">Catégories</h1>
      <div class="sm:flex items-center sm:justify-between">
        <p class="text-neutral-500 mb-4 sm:mb-0">
          Nombre de catégories : {{ categoriesNb }}
        </p>
        <Dialog>
          <DialogTrigger as-child>
            <Button
              ><Plus :size="20" :stroke-width="1.5" class="mr-2" /> Ajouter une
              catégorie</Button
            >
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajouter une catégorie</DialogTitle>
              <DialogDescription>
                Créez une nouvelle catégorie en remplissant les informations
              </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div>
                <label for="title" class="block text-sm font-semibold mb-1"
                  >Nom</label
                >
                <input
                  type="text"
                  id="title"
                  v-model="title"
                  class="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label for="image" class="block text-sm font-semibold mb-1"
                  >Image</label
                >
                <Input type="file" id="image" />
              </div>
              <div class="flex items-center space-x-2">
                <Switch defaultChecked v-model:checked="activeState" />
                <label class="block text-sm font-semibold mb-1">Actif</label>
              </div>
              <div class="flex items-center space-x-2">
                <Switch v-model:checked="featuredState" />
                <label class="block text-sm font-semibold mb-1"
                  >A l'affiche</label
                >
              </div>
            </div>
            <DialogFooter class="gap-y-2">
              <Button type="submit" @click="createCategory">
                Créer une catégorie
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
    <div>
      <!-- input with search icon -->
      <div class="relative text-neutral-500 w-full sm:w-96 mb-4">
        <Search class="absolute top-2.5 left-2.5" :size="22" />
        <input
          type="text"
          class="w-full sm:w-96 p-2 pl-10 border rounded-lg"
          placeholder="Rechercher une catégorie"
          v-model="search"
        />
      </div>
      <Loading v-if="loading" />
      <Table v-else>
        <TableHeader>
          <TableRow>
            <TableHead class="text-left">ID</TableHead>
            <TableHead class="text-left">Image</TableHead>
            <TableHead class="text-left">Nom</TableHead>
            <TableHead class="text-left">Actif</TableHead>
            <TableHead class="text-left">A l'affiche</TableHead>
            <TableHead class="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="category in categories" :key="category.id">
            <TableCell>{{ category.id }}</TableCell>
            <TableCell>
              <img
                :src="category.image"
                :alt="category.name"
                class="w-20 h-20 rounded-lg"
              />
            </TableCell>
            <TableCell class="font-medium">
              {{ category.name }}
            </TableCell>
            <TableCell> {{ category.active ? "Oui" : "Non" }} </TableCell>
            <TableCell> {{ category.featured ? "Oui" : "Non" }} </TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger as-child>
                  <Button variant="ghost" size="icon"
                    ><Pencil :size="20" :stroke-width="1.5"
                  /></Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Modifier la catégorie</DialogTitle>
                    <DialogDescription>
                      Modifiez la catégorie {{ category.name }}
                    </DialogDescription>
                  </DialogHeader>
                  <div class="grid gap-4 py-4">
                    <div>
                      <label class="block text-sm font-semibold mb-1"
                        >Image actuelle</label
                      >
                      <img
                        :src="category.image"
                        :alt="category.name"
                        class="w-20 h-20 rounded-lg"
                      />
                    </div>
                    <div>
                      <label
                        for="title"
                        class="block text-sm font-semibold mb-1"
                        >Nom</label
                      >
                      <input
                        type="text"
                        id="title"
                        :value="category.name"
                        class="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label
                        for="image"
                        class="block text-sm font-semibold mb-1"
                        >Image</label
                      >
                      <Input type="file" id="image" />
                    </div>
                    <div class="flex items-center space-x-2">
                      <Switch
                        id="update-active"
                        v-model:checked="category.active"
                      />
                      <label class="block text-sm font-semibold mb-1"
                        >Actif</label
                      >
                    </div>
                    <div class="flex items-center space-x-2">
                      <Switch
                        id="update-featured"
                        v-model:checked="category.featured"
                      />
                      <label class="block text-sm font-semibold mb-1"
                        >A l'affiche</label
                      >
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" @click="updateCategory(category.id)">
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
                    <DialogTitle>Supprimer la catégorie</DialogTitle>
                    <DialogDescription>
                      Êtes-vous sûr de vouloir supprimer {{ category.name }} ?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="destructive"
                      @click="deleteCategory(category.id)"
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
  TableCaption,
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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/toast/use-toast";
import { Pencil, Trash2, Plus, Search } from "lucide-vue-next";
import { ref, onMounted, watch } from "vue";
import Loading from "@/components/Loading.vue";

const loading = ref(false);

const categories = ref([]);
const categoriesNb = ref(0);
const search = ref("");

const title = ref("");
const activeState = ref(true);
const featuredState = ref(false);

const { toast } = useToast();

const getCategories = () => {
  loading.value = true;

  fetch(`${import.meta.env.VITE_API}/categories`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      categories.value = data;
      categoriesNb.value = data.length;
      loading.value = false;
      console.log(data);
    });
};

const createCategory = () => {
  const fileInput = document.getElementById("image");
  const formData = new FormData();

  formData.append("name", title.value);
  formData.append("image", fileInput.files[0]);
  formData.append("active", activeState.value);
  formData.append("featured", featuredState.value);

  fetch(`${import.meta.env.VITE_API}/categories`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  })
    .then((res) => {
      if (!res.ok) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la création de la catégorie",
          variant: "destructive",
        });
        throw new Error("Erreur lors de la création de la catégorie");
      }
      return res.json();
    })
    .then((data) => {
      toast({
        title: "Succès",
        description: "Catégorie créée avec succès",
      });
      getCategories();
    });
};

const updateCategory = (id) => {
  const fileInput = document.getElementById("image");
  const formData = new FormData();

  formData.append("name", document.getElementById("title").value);
  formData.append("image", fileInput.files[0]);
  formData.append(
    "active",
    document.getElementById("update-active").ariaChecked === "true"
      ? "true"
      : "false"
  );
  formData.append(
    "featured",
    document.getElementById("update-featured").ariaChecked === "true"
      ? "true"
      : "false"
  );

  fetch(`${import.meta.env.VITE_API}/categories/${id}_method=PUT`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  })
    .then((res) => {
      if (!res.ok) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la modification de la catégorie",
          variant: "destructive",
        });
        throw new Error("Erreur lors de la modification de la catégorie");
      }
      return res.json();
    })
    .then((data) => {
      toast({
        title: "Succès",
        description: "Catégorie modifiée avec succès",
      });
      getCategories();
    });
};

const deleteCategory = (id) => {
  fetch(`${import.meta.env.VITE_API}/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la suppression de la catégorie",
          variant: "destructive",
        });
        throw new Error("Erreur lors de la suppression de la catégorie");
      }
      return res.json();
    })
    .then((data) => {
      toast({
        title: "Succès",
        description: "Catégorie supprimée avec succès",
      });
      getCategories();
    });
};

onMounted(() => {
  getCategories();
});

watch(search, (value) => {
  if (value === "") {
    getCategories();
  } else {
    loading.value = true;
    fetch(`${import.meta.env.VITE_API}/categories?name=${value}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        categories.value = data;
        categoriesNb.value = data.length;
        loading.value = false;
      });
  }
});
</script>
