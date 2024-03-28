<template>
  <Container>
    <div class="py-20">
      <h1 class="text-2xl font-semibold mb-8">Plats</h1>
      <div class="sm:flex items-center sm:justify-between">
        <p class="text-neutral-500 mb-4 sm:mb-0">
          Nombre de plats : {{ foodsNb }}
        </p>
        <Dialog>
          <DialogTrigger as-child>
            <Button
              ><Plus :size="20" :stroke-width="1.5" class="mr-2" /> Ajouter un
              plat</Button
            >
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajouter un plat</DialogTitle>
              <DialogDescription>
                Créez un nouveau plat en remplissant les informations
              </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div>
                <label class="block text-sm font-semibold mb-1"
                  >Catégorie</label
                >
                <Select id="category" v-model="categoryId">
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Catégories</SelectLabel>
                      <SelectItem
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id.toString()"
                      >
                        {{ category.name }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
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
                <label
                  for="description"
                  class="block text-sm font-semibold mb-1"
                  >Description</label
                >
                <textarea
                  id="description"
                  v-model="description"
                  class="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label for="price" class="block text-sm font-semibold mb-1"
                  >Prix (en €)</label
                >
                <input
                  type="number"
                  min="1"
                  step="any"
                  id="price"
                  v-model="price"
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
              <Button type="submit" @click="createFood"> Créer un plat </Button>
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
          placeholder="Rechercher un plat"
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
            <TableHead class="text-left">Prix</TableHead>
            <TableHead class="text-left">Actif</TableHead>
            <TableHead class="text-left">A l'affiche</TableHead>
            <TableHead class="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="food in foods" :key="food.id">
            <TableCell>{{ food.id }}</TableCell>
            <TableCell>
              <img
                :src="food.image"
                :alt="food.name"
                class="w-20 h-20 rounded-lg"
              />
            </TableCell>
            <TableCell class="font-medium">
              {{ food.name }}
            </TableCell>
            <TableCell>{{ food.price.toFixed(2) }} €</TableCell>
            <TableCell> {{ food.active ? "Oui" : "Non" }} </TableCell>
            <TableCell> {{ food.featured ? "Oui" : "Non" }} </TableCell>
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
                      Modifiez la catégorie {{ food.name }}
                    </DialogDescription>
                  </DialogHeader>
                  <div class="grid gap-4 py-4">
                    <div>
                      <label class="block text-sm font-semibold mb-1"
                        >Image actuelle</label
                      >
                      <img
                        :src="food.image"
                        :alt="food.name"
                        class="w-20 h-20 rounded-lg"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-semibold mb-1"
                        >Catégorie</label
                      >
                      <Select
                        id="category"
                        :defaultValue="food.category.id.toString()"
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Selectionnez une catégorie"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Catégories</SelectLabel>
                            <SelectItem
                              v-for="category in categories"
                              :key="category.id"
                              :value="category.id.toString()"
                            >
                              {{ category.name }}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
                        :value="food.name"
                        class="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label
                        for="description"
                        class="block text-sm font-semibold mb-1"
                        >Description</label
                      >
                      <textarea
                        id="description"
                        :value="food.description"
                        class="w-full p-2 border rounded-lg"
                      ></textarea>
                    </div>
                    <div>
                      <label
                        for="price"
                        class="block text-sm font-semibold mb-1"
                        >Prix (en €)</label
                      >
                      <input
                        type="number"
                        min="1"
                        step="any"
                        id="price"
                        :value="food.price"
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
                        v-model:checked="food.active"
                      />
                      <label class="block text-sm font-semibold mb-1"
                        >Actif</label
                      >
                    </div>
                    <div class="flex items-center space-x-2">
                      <Switch
                        id="update-featured"
                        v-model:checked="food.featured"
                      />
                      <label class="block text-sm font-semibold mb-1"
                        >A l'affiche</label
                      >
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" @click="updateFood(food.id)">
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
                    <DialogTitle>Supprimer le plat</DialogTitle>
                    <DialogDescription>
                      Êtes-vous sûr de vouloir supprimer {{ food.name }} ?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="destructive" @click="deleteFood(food.id)">
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
import Loading from "@/components/Loading.vue";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/toast/use-toast";
import { Pencil, Trash2, Plus, Search } from "lucide-vue-next";
import { ref, onMounted, watch } from "vue";

const loading = ref(false);

const categories = ref([]);
const foods = ref([]);
const foodsNb = ref(0);
const search = ref("");

const categoryId = ref();
const title = ref("");
const description = ref("");
const price = ref(1);
const activeState = ref(true);
const featuredState = ref(false);

const { toast } = useToast();

const getCategories = () => {
  fetch(`${import.meta.env.VITE_API}/categories`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      categories.value = data;
      console.log(data);
    });
};

const getFoods = () => {
  loading.value = true;

  fetch(`${import.meta.env.VITE_API}/foods`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      foods.value = data;
      foodsNb.value = data.length;
      loading.value = false;
      console.log(data);
    });
};

const createFood = () => {
  const fileInput = document.getElementById("image");
  const formData = new FormData();

  formData.append("category_id", categoryId.value);
  formData.append("name", title.value);
  formData.append("image", fileInput.files[0]);
  formData.append("description", description.value);
  formData.append("price", price.value);
  formData.append("active", activeState.value);
  formData.append("featured", featuredState.value);

  fetch(`${import.meta.env.VITE_API}/foods`, {
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
          description: "Erreur lors de la création du plat",
          variant: "destructive",
        });
        throw new Error("Erreur lors de la création du plat");
      }
      return res.json();
    })
    .then((data) => {
      toast({
        title: "Succès",
        description: "Plat créé avec succès",
      });
      getFoods();
    });
};

const updateFood = (id) => {
  const fileInput = document.getElementById("image");
  const formData = new FormData();

  formData.append(
    "category_id",
    document.getElementById("category").getAttribute("default-value")
  );
  formData.append("name", document.getElementById("title").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("price", document.getElementById("price").value);
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

  fetch(`${import.meta.env.VITE_API}/foods/${id}_method=PUT`, {
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
          description: "Erreur lors de la modification du plat",
          variant: "destructive",
        });
        throw new Error("Erreur lors de la modification du plat");
      }
      return res.json();
    })
    .then((data) => {
      toast({
        title: "Succès",
        description: "Plat modifié avec succès",
      });
      getFoods();
    });
};

const deleteFood = (id) => {
  fetch(`${import.meta.env.VITE_API}/foods/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la suppression du plat",
          variant: "destructive",
        });
        throw new Error("Erreur lors de la suppression du plat");
      }
      return res.json();
    })
    .then((data) => {
      toast({
        title: "Succès",
        description: "Plat supprimé avec succès",
      });
      getFoods();
    });
};

onMounted(() => {
  getFoods();
  getCategories();
});

watch(search, (value) => {
  if (value === "") {
    getFoods();
  } else {
    loading.value = true;
    fetch(`${import.meta.env.VITE_API}/foods?name=${value}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        foods.value = data;
        foodsNb.value = data.length;
        loading.value = false;
      });
  }
});
</script>
